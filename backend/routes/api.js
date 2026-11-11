const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Athlete, Coach, Admin } = require('../models/schemas');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_national_sports_portal_key_2026';

// ==========================================
// FILE UPLOAD SYSTEM (MULTER)
// ==========================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = process.env.UPLOAD_DIR || 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'video') {
        if (file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Only MP4 videos are allowed'), false);
        }
    } else {
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF or Image proof allowed'), false);
        }
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // Max 50MB
});

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Register Athlete
router.post('/auth/register', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, email, password, nationalId, age, state, district, sport, bloodGroup, height, weight, achievements } = req.body;
        
        const existing = await Athlete.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Athlete email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));

        const photoPath = req.files && req.files.photo ? `/uploads/${req.files.photo[0].filename}` : undefined;
        const idPath = req.files && req.files.idProof ? `/uploads/${req.files.idProof[0].filename}` : undefined;
        const certPath = req.files && req.files.certificate ? `/uploads/${req.files.certificate[0].filename}` : undefined;

        // Perform AI Authenticity scoring simulation
        const trustScore = Math.floor(Math.random() * 10) + 90; // 90-99%
        const performanceScore = Math.floor(Math.random() * 20) + 70;

        const newAthlete = new Athlete({
            name,
            email,
            password: hashedPassword,
            nationalId,
            age: parseInt(age),
            state,
            district,
            sport,
            bloodGroup,
            height: parseFloat(height),
            weight: parseFloat(weight),
            bmi,
            profileImage: photoPath,
            skills: { speed: 80, stamina: 82, agility: 78, strength: 84, skill: 77, flexibility: 75 },
            achievements: achievements ? [{ year: new Date().getFullYear().toString(), title: 'Registration achievements', detail: achievements }] : [],
            certificates: certPath ? [{ name: 'Sports Achievement Proof', path: certPath, trustScore }] : [],
            connections: [],
            pendingRequests: [],
            isVerified: trustScore >= 95, // auto verified if trust score is very high
            verificationStatus: trustScore >= 95 ? 'approved' : 'pending',
            performanceScore
        });

        await newAthlete.save();

        const token = jwt.sign({ id: newAthlete._id, role: 'athlete' }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            token,
            user: {
                id: newAthlete._id,
                name: newAthlete.name,
                email: newAthlete.email,
                role: 'athlete'
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Portal (Coach / Admin / Athlete)
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        let userRecord = null;
        if (role === 'admin') {
            userRecord = await Admin.findOne({ email });
        } else if (role === 'coach') {
            userRecord = await Coach.findOne({ email });
        } else {
            userRecord = await Athlete.findOne({ email });
        }

        if (!userRecord) {
            return res.status(401).json({ error: 'Invalid credentials or role mapping' });
        }

        const isMatch = await bcrypt.compare(password, userRecord.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userRecord._id, role }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            token,
            user: {
                id: userRecord._id,
                name: userRecord.name,
                email: userRecord.email,
                role
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// ATHLETES DIRECTORY & PROFILES API
// ==========================================

// Get and Filter Athletes (Coach & Admin Panel only)
router.get('/athletes', authenticateToken, authorizeRoles('coach', 'admin'), async (req, res) => {
    try {
        const { sport, state, ageGroup, status, query } = req.query;

        let filter = {};

        if (sport) filter.sport = sport;
        if (state) filter.state = state;
        if (status) filter.verificationStatus = status;
        
        if (ageGroup) {
            if (ageGroup === 'under-16') filter.age = { $lt: 16 };
            else if (ageGroup === 'under-18') filter.age = { $gte: 16, $lt: 18 };
            else if (ageGroup === 'senior') filter.age = { $gte: 18 };
        }

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { district: { $regex: query, $options: 'i' } }
            ];
        }

        const athletes = await Athlete.find(filter)
            .select('-password -nationalId')
            .sort({ performanceScore: -1 });

        res.status(200).json(athletes);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve Single Athlete Dossier
router.get('/athletes/:id', authenticateToken, async (req, res) => {
    try {
        // Secure Selector confidentiality: Athletes cannot retrieve coach profile details
        if (req.user.role === 'athlete' && req.user.id !== req.params.id) {
            // An athlete trying to fetch another athlete: strip nationalId & connections
            const athlete = await Athlete.findById(req.params.id).select('-password -nationalId -connections -pendingRequests');
            if (!athlete) return res.status(404).json({ error: 'Athlete not found' });
            return res.status(200).json(athlete);
        }

        const athlete = await Athlete.findById(req.params.id).populate('connections', 'name department sportFocus');
        if (!athlete) {
            return res.status(404).json({ error: 'Athlete profile not found' });
        }

        let result = athlete.toObject();
        delete result.password;

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload Video (and run AI scan simulation)
router.post('/athletes/upload-video', authenticateToken, authorizeRoles('athlete'), upload.single('video'), async (req, res) => {
    try {
        const { title, category } = req.body;
        
        let videoPath = '';
        if (req.file) {
            videoPath = `/uploads/${req.file.filename}`;
        } else if (req.body.webcamBlobUrl) {
            // Simulated webcam blob path
            videoPath = req.body.webcamBlobUrl;
        } else {
            return res.status(400).json({ error: 'Please select or record a video' });
        }

        const athlete = await Athlete.findById(req.user.id);
        if (!athlete) {
            return res.status(404).json({ error: 'Athlete not found' });
        }

        const poseScore = Math.floor(Math.random() * 15) + 80;
        const trustScore = Math.floor(Math.random() * 10) + 90; // AI Authenticity score

        const newVideo = {
            title,
            category,
            views: 0,
            path: videoPath,
            poseScore,
            trustScore
        };

        athlete.videos.unshift(newVideo);
        athlete.performanceScore = Math.min(100, athlete.performanceScore + 4);

        await athlete.save();

        res.status(200).json({ message: 'Video uploaded and biomechanics overlay scanned', video: newVideo });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// SELECTION HANDSHAKE APIs (CONNECT)
// ==========================================

// Coach requests Connection
router.post('/coaches/connect', authenticateToken, authorizeRoles('coach'), async (req, res) => {
    try {
        const { athleteId } = req.body;
        const coach = await Coach.findById(req.user.id);
        const athlete = await Athlete.findById(athleteId);

        if (!coach || !athlete) {
            return res.status(404).json({ error: 'Coach or Athlete profile not found' });
        }

        // Add to athlete's pendingRequests
        if (!athlete.pendingRequests.includes(coach._id) && !athlete.connections.includes(coach._id)) {
            athlete.pendingRequests.push(coach._id);
            await athlete.save();
        }

        res.status(200).json({ message: 'Connection request sent to athlete successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Athlete accepts Connection
router.post('/athletes/accept-connection', authenticateToken, authorizeRoles('athlete'), async (req, res) => {
    try {
        const { coachId } = req.body;
        const athlete = await Athlete.findById(req.user.id);
        const coach = await Coach.findById(coachId);

        if (!athlete || !coach) {
            return res.status(404).json({ error: 'Athlete or Coach profile not found' });
        }

        // Remove from pending, add to connections
        const idx = athlete.pendingRequests.indexOf(coachId);
        if (idx !== -1) {
            athlete.pendingRequests.splice(idx, 1);
        }

        if (!athlete.connections.includes(coachId)) {
            athlete.connections.push(coachId);
        }

        if (!coach.connections.includes(athlete._id)) {
            coach.connections.push(athlete._id);
        }

        await athlete.save();
        await coach.save();

        res.status(200).json({ message: 'Connection request accepted successfully', connections: athlete.connections });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// COMMUNITY SPORTS FEED API
// ==========================================
router.get('/community/feed', async (req, res) => {
    try {
        // Fetch all verified videos and logs from athletes to build a community sports board
        const athletes = await Athlete.find({ verificationStatus: 'approved' })
            .select('name profileImage sport videos achievements')
            .limit(10);

        let feed = [];

        athletes.forEach(ath => {
            ath.videos.forEach(v => {
                feed.push({
                    id: v._id,
                    athleteName: ath.name,
                    athleteAvatar: ath.profileImage,
                    sport: ath.sport,
                    title: `${v.category}: ${v.title}`,
                    detail: `Scanned video upload. AI Biomechanics verified.`,
                    cheers: Math.floor(Math.random() * 40) + 10,
                    date: v.date
                });
            });
        });

        // Sort by newest date
        feed.sort((a,b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(feed);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Shortlist Athlete Toggle
router.post('/coaches/shortlist', authenticateToken, authorizeRoles('coach'), async (req, res) => {
    try {
        const { athleteId } = req.body;
        const coach = await Coach.findById(req.user.id);

        if (!coach) {
            return res.status(404).json({ error: 'Coach profile not found' });
        }

        const idx = coach.shortlist.indexOf(athleteId);
        let action = '';
        if (idx !== -1) {
            coach.shortlist.splice(idx, 1);
            action = 'removed';
        } else {
            coach.shortlist.push(athleteId);
            action = 'added';
        }

        await coach.save();
        res.status(200).json({ message: `Athlete successfully ${action} coach shortlist`, shortlist: coach.shortlist });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// GOVERNMENT ADMIN AUDITS
// ==========================================
router.post('/admin/verify', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { athleteId, status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid verification audit status' });
        }

        const athlete = await Athlete.findById(athleteId);
        if (!athlete) {
            return res.status(404).json({ error: 'Athlete profile not found' });
        }

        athlete.verificationStatus = status;
        athlete.isVerified = (status === 'approved');

        if (status === 'approved') {
            athlete.performanceScore = Math.min(100, athlete.performanceScore + 5);
        }

        await athlete.save();
        res.status(200).json({ message: `Audit completed. Status: ${status}`, athlete });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/dashboard', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const totalAthletes = await Athlete.countDocuments();
        const verifiedAthletes = await Athlete.countDocuments({ verificationStatus: 'approved' });
        const pendingAudits = await Athlete.countDocuments({ verificationStatus: 'pending' });

        const stateAnalytics = await Athlete.aggregate([
            { $group: { _id: '$state', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            stats: {
                totalAthletes,
                verifiedAthletes,
                pendingAudits
            },
            stateAnalytics
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
