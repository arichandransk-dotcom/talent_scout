const mongoose = require('mongoose');

// ==========================================
// ATHLETE SCHEMA
// ==========================================
const AthleteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Official name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Secure password is required']
    },
    nationalId: {
        type: String,
        required: [true, 'National Identification number is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: 10,
        max: 45
    },
    state: {
        type: String,
        required: [true, 'State registration is required']
    },
    district: {
        type: String,
        required: [true, 'District registration is required']
    },
    sport: {
        type: String,
        required: [true, 'Primary sport classification is required'],
        enum: ['Football', 'Basketball', 'Athletics', 'Swimming', 'Tennis', 'Cricket']
    },
    bloodGroup: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    profileImage: {
        type: String,
        default: '/uploads/default-avatar.jpg'
    },
    skills: {
        speed: { type: Number, default: 50 },
        stamina: { type: Number, default: 50 },
        agility: { type: Number, default: 50 },
        strength: { type: Number, default: 50 },
        skill: { type: Number, default: 50 },
        flexibility: { type: Number, default: 50 }
    },
    achievements: [{
        year: String,
        title: String,
        detail: String
    }],
    certificates: [{
        name: String,
        path: String,
        trustScore: { type: Number, default: 100 }, // AI trust percentage rating
        uploadedAt: { type: Date, default: Date.now }
    }],
    videos: [{
        title: String,
        category: { type: String, enum: ['Match Highlight', 'Training Drills', 'Fitness Test'] },
        views: { type: Number, default: 0 },
        date: { type: String, default: () => new Date().toISOString().split('T')[0] },
        path: String,
        poseScore: Number,
        trustScore: { type: Number, default: 100 } // AI trust percentage rating
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach'
    }],
    pendingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    aiRank: {
        type: Number,
        default: 999
    },
    performanceScore: {
        type: Number,
        default: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ==========================================
// COACH SCHEMA
// ==========================================
const CoachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        default: 'Sports Authority of India'
    },
    sportFocus: {
        type: String,
        required: true
    },
    shortlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete'
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ==========================================
// ADMIN SCHEMA
// ==========================================
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    Athlete: mongoose.model('Athlete', AthleteSchema),
    Coach: mongoose.model('Coach', CoachSchema),
    Admin: mongoose.model('Admin', AdminSchema)
};
