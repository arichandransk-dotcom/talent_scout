const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talent_identifier';

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================================
// CORE GLOBAL MIDDLEWARES
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder static files
app.use('/uploads', express.static(uploadDir));

// Serve SPA Frontend statically out-of-the-box from server
app.use(express.static(path.join(__dirname, '../frontend')));

// ==========================================
// MOUNT API ROUTES
// ==========================================
app.use('/api', apiRouter);

// Catch-all route serving frontend index.html for navigation support
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// ==========================================
// DATABASE & SERVER BINDING
// ==========================================
// ==========================================
// DATABASE & SERVER BINDING & SEEDING
// ==========================================
console.log('Connecting to database...');

const { Athlete, Coach, Admin } = require('./models/schemas');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
    try {
        const athleteCount = await Athlete.countDocuments();
        const coachCount = await Coach.countDocuments();
        const adminCount = await Admin.countDocuments();

        if (athleteCount === 0 && coachCount === 0 && adminCount === 0) {
            console.log('Seeding initial government database records...');
            
            const salt = await bcrypt.genSalt(10);
            const hashedAthletePassword = await bcrypt.hash('athlete123', salt);
            const hashedCoachPassword = await bcrypt.hash('coach123', salt);
            const hashedAdminPassword = await bcrypt.hash('admin123', salt);

            // 1. Seed Admin
            await Admin.create({
                name: 'Director S. K. Nayar',
                email: 'admin@sports.gov',
                password: hashedAdminPassword
            });

            // 2. Seed Coaches
            const coach1 = await Coach.create({
                name: 'Dr. Ramesh Prasad',
                email: 'ramesh.prasad@sportsauthority.gov',
                department: 'Sports Authority of India (SAI)',
                sportFocus: 'Athletics',
                shortlist: [],
                connections: []
            });

            const coach2 = await Coach.create({
                name: 'Coach Sarah Thomas',
                email: 'sarah.thomas@sportsauthority.gov',
                department: 'Sports Authority of India (SAI, South Center)',
                sportFocus: 'Football',
                shortlist: [],
                connections: []
            });

            const coach3 = await Coach.create({
                name: 'Coach Baldev Singh',
                email: 'baldev.singh@sportsauthority.gov',
                department: 'Punjab State Sports Council',
                sportFocus: 'Cricket',
                shortlist: [],
                connections: []
            });

            // 3. Seed Athletes
            const athlete1 = await Athlete.create({
                name: 'Amit Phogat',
                email: 'amit.phogat@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-9920-HARY',
                age: 17,
                state: 'Haryana',
                district: 'Rohtak',
                sport: 'Athletics',
                bloodGroup: 'O+',
                height: 182,
                weight: 74,
                bmi: 22.3,
                profileImage: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=300&h=300&fit=crop',
                skills: { speed: 92, stamina: 88, agility: 85, strength: 80, skill: 78, flexibility: 75 },
                achievements: [
                    { year: '2025', title: 'Gold Medal - National Junior 100m Sprint', detail: 'Clocked 10.58s at the National Athletic Meet. Authenticity Verified.' },
                    { year: '2024', title: 'Silver Medal - State Inter-District Athletics', detail: 'Represented Rohtak district in the 200m track event.' }
                ],
                certificates: [
                    { name: 'National 100m Sprint Gold.pdf', path: 'uploads/mock-cert-1.pdf', trustScore: 99 },
                    { name: 'Age Verification Certificate.pdf', path: 'uploads/mock-cert-2.pdf', trustScore: 97 }
                ],
                videos: [
                    { title: '100m Sprint Technique (Pose Scanned)', category: 'Match Highlight', views: 142, date: '2026-05-10', path: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-track-40332-large.mp4', trustScore: 98 }
                ],
                connections: [coach1._id],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved',
                aiRank: 2,
                performanceScore: 94
            });

            coach1.shortlist.push(athlete1._id);
            coach1.connections.push(athlete1._id);
            await coach1.save();

            const athlete2 = await Athlete.create({
                name: 'Gurpreet Singh',
                email: 'gurpreet.s@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-4318-PUNJ',
                age: 19,
                state: 'Punjab',
                district: 'Jalandhar',
                sport: 'Football',
                bloodGroup: 'B+',
                height: 188,
                weight: 80,
                bmi: 22.6,
                profileImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop',
                skills: { speed: 85, stamina: 92, agility: 80, strength: 88, skill: 84, flexibility: 70 },
                achievements: [
                    { year: '2025', title: 'Best Goalkeeper - SGFI National School Games', detail: 'Conceded only 2 goals in 6 matches.' }
                ],
                certificates: [
                    { name: 'SGFI Games Certificate.pdf', path: 'uploads/mock-cert-3.pdf', trustScore: 95 }
                ],
                videos: [
                    { title: 'Goal Keeping Reflexes Drills', category: 'Training Drills', views: 88, date: '2026-06-01', path: 'https://assets.mixkit.co/videos/preview/mixkit-goalkeeper-catching-a-soccer-ball-34241-large.mp4', trustScore: 96 }
                ],
                connections: [],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved',
                aiRank: 8,
                performanceScore: 89
            });

            coach2.shortlist.push(athlete2._id);
            await coach2.save();

            await Athlete.create({
                name: 'Mary Kom Kipgen',
                email: 'mary.kipgen@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-1082-MANI',
                age: 15,
                state: 'Manipur',
                district: 'Imphal West',
                sport: 'Basketball',
                bloodGroup: 'A+',
                height: 165,
                weight: 52,
                bmi: 19.1,
                profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
                skills: { speed: 90, stamina: 82, agility: 94, strength: 60, skill: 90, flexibility: 88 },
                achievements: [
                    { year: '2025', title: 'State Team - Khelo India Youth Games', detail: 'Finished top scorer with average 22 points.' }
                ],
                certificates: [
                    { name: 'Khelo India Basketball Cert.pdf', path: 'uploads/mock-cert-4.pdf', trustScore: 92 }
                ],
                videos: [
                    { title: 'Free Throw & Shooting Mechanics', category: 'Fitness Test', views: 24, date: '2026-06-20', path: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-shooting-a-basketball-40156-large.mp4', trustScore: 94 }
                ],
                connections: [],
                pendingRequests: [],
                isVerified: false,
                verificationStatus: 'pending',
                aiRank: 14,
                performanceScore: 85
            });

            await Athlete.create({
                name: 'Priya Nair',
                email: 'priya.nair@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-7294-KERA',
                age: 18,
                state: 'Kerala',
                district: 'Ernakulam',
                sport: 'Swimming',
                bloodGroup: 'A-',
                height: 172,
                weight: 61,
                bmi: 20.6,
                profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
                skills: { speed: 88, stamina: 95, agility: 78, strength: 82, skill: 86, flexibility: 90 },
                achievements: [
                    { year: '2025', title: 'Gold Medal - 100m Butterfly Stroke', detail: 'Won Gold at the All India Inter-University Swimming Championship.' }
                ],
                certificates: [
                    { name: 'Swimming Association Certificate.pdf', path: 'uploads/mock-cert-5.pdf', trustScore: 98 }
                ],
                videos: [
                    { title: '100m Butterfly Stroke Training', category: 'Training Drills', views: 76, date: '2026-05-18', path: 'https://assets.mixkit.co/videos/preview/mixkit-swimmer-training-in-a-pool-24695-large.mp4', trustScore: 97 }
                ],
                connections: [],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved',
                aiRank: 5,
                performanceScore: 92
            });

            await Athlete.create({
                name: 'Rohan Shinde',
                email: 'rohan.shinde@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-1850-MAHA',
                age: 16,
                state: 'Maharashtra',
                district: 'Pune',
                sport: 'Tennis',
                bloodGroup: 'O-',
                height: 180,
                weight: 71,
                bmi: 21.9,
                profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
                skills: { speed: 82, stamina: 80, agility: 90, strength: 76, skill: 92, flexibility: 84 },
                achievements: [
                    { year: '2025', title: 'Singles Runner Up - ITF Juniors', detail: 'Reached the finals of the ITF Junior Grade 4 Tournament in Delhi.' }
                ],
                certificates: [
                    { name: 'ITF Juniors Rank Card.pdf', path: 'uploads/mock-cert-6.pdf', trustScore: 94 }
                ],
                videos: [
                    { title: 'First Serve & Forehand Drills', category: 'Training Drills', views: 49, date: '2026-06-12', path: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-serving-in-slow-motion-23740-large.mp4', trustScore: 95 }
                ],
                connections: [],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved',
                aiRank: 11,
                performanceScore: 87
            });

            const athlete6 = await Athlete.create({
                name: 'Arjun Singh',
                email: 'arjun.singh@gmail.com',
                password: hashedAthletePassword,
                nationalId: 'AID-3691-UP',
                age: 19,
                state: 'Uttar Pradesh',
                district: 'Meerut',
                sport: 'Cricket',
                bloodGroup: 'B-',
                height: 178,
                weight: 72,
                bmi: 22.7,
                profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
                skills: { speed: 80, stamina: 85, agility: 82, strength: 80, skill: 88, flexibility: 74 },
                achievements: [
                    { year: '2025', title: 'Best Bowler - UP Under-19 Trophy', detail: 'Took 24 wickets in 7 matches in the state tournament.' }
                ],
                certificates: [
                    { name: 'UPCA Achievement Certificate.pdf', path: 'uploads/mock-cert-7.pdf', trustScore: 96 }
                ],
                videos: [
                    { title: 'Fast Bowling Action & Run-up', category: 'Match Highlight', views: 112, date: '2026-06-22', path: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-batsman-hitting-a-ball-41517-large.mp4', trustScore: 96 }
                ],
                connections: [],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved',
                aiRank: 6,
                performanceScore: 90
            });

            coach3.shortlist.push(athlete6._id);
            await coach3.save();

            console.log('Successfully seeded database with athletic selector data.');
        }
    } catch (err) {
        console.error('Seeding database failure:', err.message);
    }
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Successfully connected to MongoDB Database.');
    await seedDatabase();
    startServer();
}).catch((err) => {
    console.error('MongoDB database connection failure:', err.message);
    console.log('Running backend server with Mock DB fallback mode (Mongoose not connected).');
    startServer();
});

function startServer() {
    app.listen(PORT, () => {
        console.log(`=======================================================`);
        console.log(`TALENT IDENTIFIER - DIGITAL RECRUITMENT PORTAL RUNNING`);
        console.log(`Server Address: http://localhost:${PORT}`);
        console.log(`Environment   : ${process.env.NODE_ENV || 'development'}`);
        console.log(`Uploads Path  : ${uploadDir}`);
        console.log(`=======================================================`);
    });
}
