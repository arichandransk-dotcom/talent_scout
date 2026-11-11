// ==========================================
// TALENT IDENTIFIER - ADVANCED LOGIC UPGRADES
// ==========================================

// Global state variables
let currentUser = null;
let currentView = 'landing';
let currentAthleteProfileId = null;
let poseAnimationId = null;
let showOnlyShortlisted = false;

// Media capture state
let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordedBlobUrl = null;
let activeVideoSourceMode = 'file'; // 'file' or 'camera'

// Mock database keys in localStorage
const DB_ATHLETES_KEY = 'talent_id_athletes';
const DB_COACHES_KEY = 'talent_id_coaches';
const DB_NOTIFICATIONS_KEY = 'talent_id_notifications';
const DB_LOGS_KEY = 'talent_id_logs';
const DB_COMMUNITY_KEY = 'talent_id_community_feed';

// Pre-seeded database values
const DEFAULT_ATHLETES = [
    {
        id: 'ath_1',
        name: 'Amit Phogat',
        email: 'amit.phogat@gmail.com',
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
            { id: 'cert_1', name: 'National 100m Sprint Gold.pdf', trustScore: 99 },
            { id: 'cert_2', name: 'Age Verification Certificate.pdf', trustScore: 97 }
        ],
        videos: [
            { id: 'vid_1', title: '100m Sprint Technique (Pose Scanned)', category: 'Match Highlight', views: 142, date: '2026-05-10', path: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-track-40332-large.mp4', trustScore: 98 }
        ],
        connections: ['coach_1'],
        pendingRequests: [],
        isVerified: true,
        verificationStatus: 'approved',
        aiRank: 2,
        performanceScore: 94,
        createdAt: '2026-01-15'
    },
    {
        id: 'ath_2',
        name: 'Gurpreet Singh',
        email: 'gurpreet.s@gmail.com',
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
            { id: 'cert_3', name: 'SGFI Games Certificate.pdf', trustScore: 95 }
        ],
        videos: [
            { id: 'vid_2', title: 'Goal Keeping Reflexes Drills', category: 'Training Drills', views: 88, date: '2026-06-01', path: 'https://assets.mixkit.co/videos/preview/mixkit-goalkeeper-catching-a-soccer-ball-34241-large.mp4', trustScore: 96 }
        ],
        connections: [],
        pendingRequests: [],
        isVerified: true,
        verificationStatus: 'approved',
        aiRank: 8,
        performanceScore: 89,
        createdAt: '2026-03-02'
    },
    {
        id: 'ath_3',
        name: 'Mary Kom Kipgen',
        email: 'mary.kipgen@gmail.com',
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
            { id: 'cert_4', name: 'Khelo India Basketball Cert.pdf', trustScore: 92 }
        ],
        videos: [
            { id: 'vid_3', title: 'Free Throw & Shooting Mechanics', category: 'Fitness Test', views: 24, date: '2026-06-20', path: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-shooting-a-basketball-40156-large.mp4', trustScore: 94 }
        ],
        connections: [],
        pendingRequests: [],
        isVerified: false,
        verificationStatus: 'pending',
        aiRank: 14,
        performanceScore: 85,
        createdAt: '2026-06-18'
    },
    {
        id: 'ath_4',
        name: 'Priya Nair',
        email: 'priya.nair@gmail.com',
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
            { id: 'cert_5', name: 'Swimming Association Certificate.pdf', trustScore: 98 }
        ],
        videos: [
            { id: 'vid_4', title: '100m Butterfly Stroke Training', category: 'Training Drills', views: 76, date: '2026-05-18', path: 'https://assets.mixkit.co/videos/preview/mixkit-swimmer-training-in-a-pool-24695-large.mp4', trustScore: 97 }
        ],
        connections: [],
        pendingRequests: [],
        isVerified: true,
        verificationStatus: 'approved',
        aiRank: 5,
        performanceScore: 92,
        createdAt: '2026-04-10'
    },
    {
        id: 'ath_5',
        name: 'Rohan Shinde',
        email: 'rohan.shinde@gmail.com',
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
            { id: 'cert_6', name: 'ITF Juniors Rank Card.pdf', trustScore: 94 }
        ],
        videos: [
            { id: 'vid_5', title: 'First Serve & Forehand Drills', category: 'Training Drills', views: 49, date: '2026-06-12', path: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-serving-in-slow-motion-23740-large.mp4', trustScore: 95 }
        ],
        connections: [],
        pendingRequests: [],
        isVerified: true,
        verificationStatus: 'approved',
        aiRank: 11,
        performanceScore: 87,
        createdAt: '2026-05-02'
    },
    {
        id: 'ath_6',
        name: 'Arjun Singh',
        email: 'arjun.singh@gmail.com',
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
            { id: 'cert_7', name: 'UPCA Achievement Certificate.pdf', trustScore: 96 }
        ],
        videos: [
            { id: 'vid_6', title: 'Fast Bowling Action & Run-up', category: 'Match Highlight', views: 112, date: '2026-06-22', path: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-batsman-hitting-a-ball-41517-large.mp4', trustScore: 96 }
        ],
        connections: [],
        pendingRequests: [],
        isVerified: true,
        verificationStatus: 'approved',
        aiRank: 6,
        performanceScore: 90,
        createdAt: '2026-06-22'
    }
];

const DEFAULT_COACHES = [
    {
        id: 'coach_1',
        name: 'Dr. Ramesh Prasad',
        email: 'ramesh.prasad@sportsauthority.gov',
        department: 'Sports Authority of India (SAI)',
        sportFocus: 'Athletics',
        shortlist: ['ath_1'],
        connections: ['ath_1']
    },
    {
        id: 'coach_2',
        name: 'Coach Sarah Thomas',
        email: 'sarah.thomas@sportsauthority.gov',
        department: 'Sports Authority of India (SAI, South Center)',
        sportFocus: 'Football',
        shortlist: ['ath_2'],
        connections: []
    },
    {
        id: 'coach_3',
        name: 'Coach Baldev Singh',
        email: 'baldev.singh@sportsauthority.gov',
        department: 'Punjab State Sports Council',
        sportFocus: 'Cricket',
        shortlist: ['ath_6'],
        connections: []
    }
];

const DEFAULT_COMMUNITY_FEED = [
    {
        id: 'feed_1',
        athleteName: 'Amit Phogat',
        athleteAvatar: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=100&h=100&fit=crop',
        sport: 'Athletics',
        title: 'New Personal Record: 10.58s Sprint',
        detail: 'Clocked a new speed milestone at the National Athletic Meet. Scan verified with 99% AI trust rating.',
        cheers: 28,
        date: '2026-06-25T14:30:00Z',
        hasCheered: false
    },
    {
        id: 'feed_2',
        athleteName: 'Gurpreet Singh',
        athleteAvatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop',
        sport: 'Football',
        title: 'Training session uploaded',
        detail: 'Practicing defensive goalkeeper positioning and leap extension timing.',
        cheers: 14,
        date: '2026-06-26T02:15:00Z',
        hasCheered: false
    }
];

const DEFAULT_NOTIFICATIONS = [
    {
        id: 'not_1',
        recipientId: 'ath_1',
        senderId: 'coach_1',
        senderName: 'Dr. Ramesh Prasad (SAI Selector)',
        type: 'invitation',
        title: 'Trial Invitation: National Sprint Camp Prep',
        message: 'Dear Amit, based on your scanned 100m sprint videos showing optimal leg extension angles, we invite you for physical verification at SAI stadium in Delhi on 12th July 2026. Travel allowances will be provided under scheme SAI-SELECTION-2026.',
        date: '2026-06-25T14:30:00Z',
        read: false
    }
];

const DEFAULT_LOGS = [
    { time: '2026-06-26T08:12:00Z', event: 'Database initialized with government credentials.' },
    { time: '2026-06-26T08:44:00Z', event: 'AI Pose analysis scanning queued for pending clips.' }
];

// Initialize Storage Databases
function initDatabase() {
    try {
        // Clear local storage if the seeded data length changes to force reload the dummy data
        let forceReset = false;
        try {
            const currentStoredAthletes = JSON.parse(localStorage.getItem(DB_ATHLETES_KEY));
            if (currentStoredAthletes && currentStoredAthletes.length < DEFAULT_ATHLETES.length) {
                forceReset = true;
            }
        } catch (err) {
            forceReset = true;
        }

        if (forceReset) {
            localStorage.removeItem(DB_ATHLETES_KEY);
            localStorage.removeItem(DB_COACHES_KEY);
            localStorage.removeItem(DB_COMMUNITY_KEY);
            localStorage.removeItem(DB_NOTIFICATIONS_KEY);
            localStorage.removeItem(DB_LOGS_KEY);
        }

        if (!localStorage.getItem(DB_ATHLETES_KEY) || localStorage.getItem(DB_ATHLETES_KEY) === "undefined") {
            localStorage.setItem(DB_ATHLETES_KEY, JSON.stringify(DEFAULT_ATHLETES));
        }
        if (!localStorage.getItem(DB_COACHES_KEY) || localStorage.getItem(DB_COACHES_KEY) === "undefined") {
            localStorage.setItem(DB_COACHES_KEY, JSON.stringify(DEFAULT_COACHES));
        }
        if (!localStorage.getItem(DB_NOTIFICATIONS_KEY) || localStorage.getItem(DB_NOTIFICATIONS_KEY) === "undefined") {
            localStorage.setItem(DB_NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
        }
        if (!localStorage.getItem(DB_LOGS_KEY) || localStorage.getItem(DB_LOGS_KEY) === "undefined") {
            localStorage.setItem(DB_LOGS_KEY, JSON.stringify(DEFAULT_LOGS));
        }
        if (!localStorage.getItem(DB_COMMUNITY_KEY) || localStorage.getItem(DB_COMMUNITY_KEY) === "undefined") {
            localStorage.setItem(DB_COMMUNITY_KEY, JSON.stringify(DEFAULT_COMMUNITY_FEED));
        }
    } catch (e) {
        console.error("Storage write failed:", e);
    }
}

// Get entities helper
const db = {
    getAthletes: () => {
        try {
            const data = localStorage.getItem(DB_ATHLETES_KEY);
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : DEFAULT_ATHLETES;
        } catch (e) {
            return DEFAULT_ATHLETES;
        }
    },
    saveAthletes: (data) => {
        try { localStorage.setItem(DB_ATHLETES_KEY, JSON.stringify(data)); } catch (e) {}
    },
    getCoaches: () => {
        try {
            const data = localStorage.getItem(DB_COACHES_KEY);
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : DEFAULT_COACHES;
        } catch (e) {
            return DEFAULT_COACHES;
        }
    },
    saveCoaches: (data) => {
        try { localStorage.setItem(DB_COACHES_KEY, JSON.stringify(data)); } catch (e) {}
    },
    getNotifications: () => {
        try {
            const data = localStorage.getItem(DB_NOTIFICATIONS_KEY);
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : DEFAULT_NOTIFICATIONS;
        } catch (e) {
            return DEFAULT_NOTIFICATIONS;
        }
    },
    saveNotifications: (data) => {
        try { localStorage.setItem(DB_NOTIFICATIONS_KEY, JSON.stringify(data)); } catch (e) {}
    },
    getLogs: () => {
        try {
            const data = localStorage.getItem(DB_LOGS_KEY);
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : DEFAULT_LOGS;
        } catch (e) {
            return DEFAULT_LOGS;
        }
    },
    saveLogs: (data) => {
        try { localStorage.setItem(DB_LOGS_KEY, JSON.stringify(data)); } catch (e) {}
    },
    getCommunity: () => {
        try {
            const data = localStorage.getItem(DB_COMMUNITY_KEY);
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : DEFAULT_COMMUNITY_FEED;
        } catch (e) {
            return DEFAULT_COMMUNITY_FEED;
        }
    },
    saveCommunity: (data) => {
        try { localStorage.setItem(DB_COMMUNITY_KEY, JSON.stringify(data)); } catch (e) {}
    },
    addLog: (msg) => {
        const logs = db.getLogs();
        logs.unshift({ time: new Date().toISOString(), event: msg });
        db.saveLogs(logs);
    }
};

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function triggerToast(message, type = 'info') {
    const bin = document.getElementById('toast-bin');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'danger') iconClass = 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;
    bin.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================
// ROUTING & VIEW CONTROLLER
// ==========================================
function switchView(viewName) {
    if (poseAnimationId) {
        cancelAnimationFrame(poseAnimationId);
        poseAnimationId = null;
    }
    
    // Stop webcam if moving away from upload view
    if (viewName !== 'upload') {
        stopWebcamRecording(true);
    }
    
    currentView = viewName;
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => view.classList.remove('active'));
    
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) targetView.classList.add('active');
    
    // Set active link in sidebar
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => link.classList.remove('active'));
    
    // Header adjustments
    const headerTitle = document.getElementById('header-page-title');
    const searchBar = document.getElementById('header-search-bar');
    
    switch (viewName) {
        case 'landing':
            headerTitle.textContent = "Talent Identifier";
            searchBar.style.display = 'none';
            loadCommunityFeed();
            break;
        case 'dashboard':
            headerTitle.textContent = "Athlete Workspace";
            searchBar.style.display = 'none';
            loadDashboardData();
            break;
        case 'register':
            headerTitle.textContent = "Official Sports Enrolment";
            searchBar.style.display = 'none';
            resetRegistrationForm();
            break;
        case 'login':
            headerTitle.textContent = "Official Portal Gateway";
            searchBar.style.display = 'none';
            break;
        case 'profile':
            headerTitle.textContent = "Athlete Sports Dossier";
            searchBar.style.display = 'none';
            loadAthleteProfile();
            break;
        case 'upload':
            headerTitle.textContent = "AI Video Upload Console";
            searchBar.style.display = 'none';
            resetUploadForm();
            break;
        case 'coach':
            headerTitle.textContent = "Athlete Selector Directory";
            searchBar.style.display = 'block';
            loadCoachDirectory();
            break;
        case 'admin':
            headerTitle.textContent = "National Sports Audit Console";
            searchBar.style.display = 'none';
            loadAdminPanel();
            break;
        case 'coach-profile':
            headerTitle.textContent = "Selector Profile Dossier";
            searchBar.style.display = 'none';
            break;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle layout based on login
function updateAppLayout() {
    const sidebar = document.getElementById('app-sidebar');
    const mainWrapper = document.getElementById('main-content-layout');
    const authButtons = document.getElementById('header-auth-buttons');
    const userSnippet = document.getElementById('sidebar-user-info');
    const navCoach = document.getElementById('nav-coach-panel');
    const navUpload = document.getElementById('nav-upload-video');
    const navAdmin = document.getElementById('nav-admin-panel');
    
    if (currentUser) {
        sidebar.style.display = 'flex';
        mainWrapper.style.marginLeft = '260px';
        authButtons.style.display = 'none';
        userSnippet.style.display = 'flex';
        
        document.getElementById('sidebar-user-name').textContent = currentUser.name;
        document.getElementById('sidebar-user-role').textContent = currentUser.role.toUpperCase();
        if (currentUser.profileImage) {
            document.getElementById('sidebar-user-avatar').src = currentUser.profileImage;
        } else if (currentUser.role === 'coach') {
            document.getElementById('sidebar-user-avatar').src = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop';
        } else {
            document.getElementById('sidebar-user-avatar').src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
        }
        
        // Roles visibility mapping
        if (currentUser.role === 'athlete') {
            if (navCoach) navCoach.style.display = 'block';
            navUpload.style.display = 'block';
            navAdmin.style.display = 'none';
            document.getElementById('nav-my-profile-link').style.display = 'flex';
        } else if (currentUser.role === 'coach') {
            if (navCoach) navCoach.style.display = 'block';
            navUpload.style.display = 'none';
            navAdmin.style.display = 'none';
            document.getElementById('nav-my-profile-link').style.display = 'none';
        } else if (currentUser.role === 'admin') {
            if (navCoach) navCoach.style.display = 'block';
            navUpload.style.display = 'none';
            navAdmin.style.display = 'block';
            document.getElementById('nav-my-profile-link').style.display = 'none';
        }
    } else {
        sidebar.style.display = 'none';
        mainWrapper.style.marginLeft = '0px';
        authButtons.style.display = 'flex';
        userSnippet.style.display = 'none';
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const role = document.getElementById('login-role').value;
    
    if (role === 'admin' && email === 'admin@sports.gov') {
        currentUser = {
            id: 'adm_1',
            name: 'Director S. K. Nayar',
            email: 'admin@sports.gov',
            role: 'admin'
        };
        db.addLog('Admin authenticated successfully via credentials.');
        triggerToast("Admin portal access granted", "success");
        updateAppLayout();
        switchView('admin');
        return;
    }
    
    if (role === 'coach') {
        const coaches = db.getCoaches();
        const matched = coaches.find(c => c.email === email);
        if (matched || email === 'coach@sports.gov') {
            currentUser = matched || coaches[0];
            currentUser.role = 'coach';
            db.addLog(`Coach Selection console active: ${currentUser.name}`);
            triggerToast("Coach authorization verified", "success");
            updateAppLayout();
            switchView('coach');
            return;
        }
    }
    
    if (role === 'athlete') {
        const athletes = db.getAthletes();
        const matched = athletes.find(a => a.email === email);
        if (matched) {
            matched.role = 'athlete';
            localStorage.setItem('talent_id_current_user', JSON.stringify(matched));
            db.addLog(`Athlete login dashboard: ${matched.name}`);
            triggerToast(`Welcome back, ${matched.name}`, "success");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
            return;
        }
    }
    
    if (email === 'athlete@gmail.com') {
        const athletes = db.getAthletes();
        currentUser = athletes[0];
        currentUser.role = 'athlete';
        localStorage.setItem('talent_id_current_user', JSON.stringify(currentUser));
        db.addLog(`Athlete login dashboard: ${currentUser.name}`);
        triggerToast(`Demo login success: ${currentUser.name}`, "success");
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
        return;
    }
    
    triggerToast("Authentication failed. Use matching credentials.", "danger");
}

function logoutUser() {
    db.addLog(`Session terminated for ${currentUser ? currentUser.name : 'Unknown User'}`);
    currentUser = null;
    updateAppLayout();
    switchView('landing');
    triggerToast("Logged out successfully", "warning");
}

function viewMyProfile() {
    if (currentUser && currentUser.role === 'athlete') {
        currentAthleteProfileId = currentUser.id;
        document.getElementById('profile-back-btn').style.display = 'none';
        switchView('profile');
    }
}

// ==========================================
// AI DEEP SCANNER SIMULATION (Documents/Videos)
// ==========================================
function simulateAIAuthenticityScan(barId, statusTextId, percentageId, callback) {
    const bar = document.getElementById(barId);
    const textStatus = document.getElementById(statusTextId);
    const pct = document.getElementById(percentageId);
    
    let progress = 0;
    
    const messages = [
        { pt: 0, msg: "Parsing digital file metadata structure..." },
        { pt: 20, msg: "Analyzing image compression noise levels..." },
        { pt: 40, msg: "Verifying issuer cryptographic hashes & seals..." },
        { pt: 60, msg: "Running pixel interpolation anomaly check..." },
        { pt: 80, msg: "Evaluating deepfake & editing codec artifacts..." },
        { pt: 100, msg: "Scanning complete! File Authenticity verified." }
    ];
    
    const interval = setInterval(() => {
        progress += 4;
        if (progress > 100) progress = 100;
        
        bar.style.width = `${progress}%`;
        pct.textContent = `${progress}%`;
        
        const matched = messages.find(m => progress >= m.pt && progress < m.pt + 5);
        if (matched) {
            textStatus.textContent = matched.msg;
        }
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                const trustScore = Math.floor(Math.random() * 10) + 90; // 90%-99%
                callback(trustScore);
            }, 500);
        }
    }, 100);
}

// ==========================================
// ATHLETE REGISTRATION FORM
// ==========================================
let currentRegStep = 1;

function resetRegistrationForm() {
    currentRegStep = 1;
    document.getElementById('athlete-registration-form').reset();
    document.getElementById('reg-scan-container').style.display = 'none';
    document.getElementById('reg-submit-btn').disabled = false;
    showStepPanel(1);
}

function nextRegStep(stepNumber) {
    if (stepNumber > currentRegStep) {
        if (currentRegStep === 1) {
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;
            const nationalId = document.getElementById('reg-national-id').value;
            const age = document.getElementById('reg-age').value;
            const state = document.getElementById('reg-state').value;
            const district = document.getElementById('reg-district').value;
            if (!name || !email || !pass || !nationalId || !age || !state || !district) {
                triggerToast("Please fill all identity fields", "warning");
                return;
            }
        }
        if (currentRegStep === 2) {
            const sport = document.getElementById('reg-sport').value;
            const height = document.getElementById('reg-height').value;
            const weight = document.getElementById('reg-weight').value;
            if (!sport || !height || !weight) {
                triggerToast("Please enter sports profile data", "warning");
                return;
            }
        }
    }
    currentRegStep = stepNumber;
    showStepPanel(stepNumber);
}

function showStepPanel(step) {
    const panels = document.querySelectorAll('.form-step-panel');
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-step-${step}`).classList.add('active');
    
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById(`dot-step-${i}`);
        if (i < step) {
            dot.className = 'step-dot completed';
            dot.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if (i === step) {
            dot.className = 'step-dot active';
            dot.innerHTML = i;
        } else {
            dot.className = 'step-dot';
            dot.innerHTML = i;
        }
    }
    
    const pct = (step - 1) * 50;
    document.getElementById('reg-progress-bar').style.width = `${pct}%`;
}

function handleRegistration(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const nationalId = document.getElementById('reg-national-id').value;
    const age = parseInt(document.getElementById('reg-age').value);
    const state = document.getElementById('reg-state').value;
    const district = document.getElementById('reg-district').value;
    const sport = document.getElementById('reg-sport').value;
    const bloodGroup = document.getElementById('reg-blood').value;
    const height = parseFloat(document.getElementById('reg-height').value);
    const weight = parseFloat(document.getElementById('reg-weight').value);
    const desc = document.getElementById('reg-achievement-desc').value;
    
    const bmi = parseFloat((weight / ((height/100) ** 2)).toFixed(1));
    const score = Math.floor(Math.random() * 20) + 70;
    
    const photoFile = document.getElementById('reg-photo').files[0];
    const idProofFile = document.getElementById('reg-id-proof').files[0];
    const achievementsFile = document.getElementById('reg-achievements').files[0];
    
    // Disable submit, show AI Scanner
    document.getElementById('reg-submit-btn').disabled = true;
    document.getElementById('reg-scan-container').style.display = 'block';
    
    const proceedWithRegistration = (profileImageBase64) => {
        simulateAIAuthenticityScan('reg-scan-bar', 'reg-scan-status', 'reg-scan-percentage', (trustScore) => {
            const certs = [];
            if (idProofFile) {
                certs.push({
                    id: `cert_id_${Date.now()}`,
                    name: idProofFile.name,
                    trustScore: trustScore
                });
            } else {
                certs.push({
                    id: `cert_id_${Date.now()}`,
                    name: 'Verification ID Proof.pdf',
                    trustScore: trustScore
                });
            }
            
            if (achievementsFile) {
                certs.push({
                    id: `cert_ach_${Date.now()}`,
                    name: achievementsFile.name,
                    trustScore: trustScore
                });
            }
            
            const newAthlete = {
                id: `ath_${Date.now()}`,
                name,
                email,
                nationalId,
                age,
                state,
                district,
                sport,
                bloodGroup,
                height,
                weight,
                bmi,
                profileImage: profileImageBase64 || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
                skills: { speed: 80, stamina: 82, agility: 79, strength: 84, skill: 76, flexibility: 75 },
                achievements: desc ? [{ year: '2026', title: desc, detail: `Document verified. Trust: ${trustScore}%` }] : [],
                certificates: certs,
                videos: [],
                connections: [],
                pendingRequests: [],
                isVerified: true,
                verificationStatus: 'approved', // auto approved if trust score is high in government trial
                aiRank: db.getAthletes().length + 1,
                performanceScore: score,
                createdAt: new Date().toISOString().split('T')[0]
            };
            
            const athletes = db.getAthletes();
            athletes.push(newAthlete);
            db.saveAthletes(athletes);
            
            db.addLog(`New Athlete registered & verified: ${name} from ${state} in ${sport}. Trust Score: ${trustScore}%`);
            triggerToast(`Identity scans complete. Profile Verified!`, "success");
            
            // Auto login
            newAthlete.role = 'athlete';
            localStorage.setItem('talent_id_current_user', JSON.stringify(newAthlete));
            db.addLog(`New Athlete registered & verified: ${name} from ${state} in ${sport}. Trust Score: ${trustScore}%`);
            triggerToast(`Identity scans complete. Redirecting...`, "success");
            
            setTimeout(() => {
                window.location.href = `profile.html?id=${newAthlete.id}`;
            }, 800);
        });
    };
    
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            proceedWithRegistration(e.target.result);
        };
        reader.onerror = function() {
            proceedWithRegistration(null);
        };
        reader.readAsDataURL(photoFile);
    } else {
        proceedWithRegistration(null);
    }
}

// ==========================================
// ATHLETE DASHBOARD VIEW
// ==========================================
function loadDashboardData() {
    if (!currentUser || currentUser.role !== 'athlete') return;
    
    const athletes = db.getAthletes();
    const self = athletes.find(a => a.id === currentUser.id) || currentUser;
    
    document.getElementById('dashboard-stat-score').textContent = self.performanceScore + "%";
    document.getElementById('dashboard-stat-rank').textContent = "#" + self.aiRank;
    
    const badge = document.getElementById('dashboard-stat-status');
    badge.textContent = self.verificationStatus.toUpperCase();
    badge.className = `stat-card-badge verified-badge ${self.verificationStatus}`;
    if (self.verificationStatus === 'approved') {
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Verified`;
    } else if (self.verificationStatus === 'pending') {
        badge.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> Pending Audit`;
    } else {
        badge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Rejected`;
    }
    
    document.getElementById('dash-biometric-height').textContent = self.height + " cm";
    document.getElementById('dash-biometric-weight').textContent = self.weight + " kg";
    document.getElementById('dash-biometric-bmi').textContent = self.bmi + " (Optimal)";
    document.getElementById('dash-biometric-blood').textContent = self.bloodGroup;
    
    const vidsList = document.getElementById('dashboard-videos-list');
    vidsList.innerHTML = '';
    
    if (self.videos.length === 0) {
        vidsList.innerHTML = '<p class="text-muted">No training videos uploaded.</p>';
    } else {
        self.videos.forEach(v => {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.innerHTML = `
                <div class="upload-info">
                    <div class="upload-thumbnail"><i class="fa-solid fa-play"></i></div>
                    <div class="upload-details">
                        <h5>${v.title}</h5>
                        <p>${v.category} • ${v.views} views • Trust: ${v.trustScore}%</p>
                    </div>
                </div>
                <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewAthleteVideo('${self.id}', '${v.id}')">Watch</button>
            `;
            vidsList.appendChild(item);
        });
    }
    
    const invitesList = document.getElementById('dashboard-invitations-list');
    invitesList.innerHTML = '';
    
    const notifications = db.getNotifications().filter(n => n.recipientId === self.id);
    if (notifications.length === 0) {
        invitesList.innerHTML = '<p class="text-muted">No recruitment letters or invitations received yet.</p>';
    } else {
        notifications.forEach(n => {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.style.borderColor = 'rgba(179, 0, 255, 0.3)';
            
            // Connection requests have separate triggers
            let buttonText = 'Open Letter';
            let clickEvent = 'showNotificationPanel()';
            if (n.type === 'connection_request') {
                buttonText = 'Accept Connection';
                clickEvent = `acceptCoachConnection('${n.id}', '${n.senderId}')`;
            }
            
            item.innerHTML = `
                <div class="upload-info">
                    <div class="upload-thumbnail" style="color: var(--neon-purple); border-color: rgba(179,0,255,0.2);"><i class="fa-solid fa-envelope-open-text"></i></div>
                    <div class="user-info">
                        <h4 style="color: var(--neon-purple); font-size: 0.95rem;">${n.title}</h4>
                        <p style="font-size: 0.8rem;">From: ${n.senderName}</p>
                    </div>
                </div>
                <button class="btn-glow" style="padding: 6px 12px; font-size: 0.75rem;" onclick="${clickEvent}">${buttonText}</button>
            `;
            invitesList.appendChild(item);
        });
        
        document.getElementById('alert-indicator').style.display = 'block';
    }
}

// ==========================================
// WEBCAM VIDEO RECORDING MODULE
// ==========================================
function switchVideoInput(mode) {
    activeVideoSourceMode = mode;
    
    const btnFile = document.getElementById('btn-toggle-upload');
    const btnCam = document.getElementById('btn-toggle-camera');
    const groupFile = document.getElementById('input-group-file');
    const groupCam = document.getElementById('input-group-camera');
    
    const webcamStream = document.getElementById('webcam-record-stream');
    const standardPreview = document.getElementById('upload-video-preview');
    const placeholder = document.getElementById('video-preview-placeholder');
    const webcamControls = document.getElementById('webcam-controls');
    
    // Stop any existing stream
    stopWebcamRecording(true);
    
    if (mode === 'file') {
        btnFile.className = "btn-glow";
        btnCam.className = "btn-secondary";
        groupFile.style.display = "block";
        groupCam.style.display = "none";
        
        webcamStream.style.display = "none";
        webcamControls.style.display = "none";
        
        if (recordedBlobUrl) {
            standardPreview.src = recordedBlobUrl;
            standardPreview.style.display = "block";
            placeholder.style.display = "none";
        } else {
            standardPreview.style.display = "none";
            placeholder.style.display = "flex";
        }
    } else {
        btnFile.className = "btn-secondary";
        btnCam.className = "btn-glow";
        groupFile.style.display = "none";
        groupCam.style.display = "block";
        
        standardPreview.style.display = "none";
        webcamStream.style.display = "block";
        placeholder.style.display = "none";
        webcamControls.style.display = "flex";
        
        // Start streaming instantly
        initWebcamStream();
    }
}

async function initWebcamStream() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mediaStream = stream;
        document.getElementById('webcam-record-stream').srcObject = stream;
        document.getElementById('camera-text-indicator').textContent = "Camera Active (Ready)";
        document.getElementById('webcam-status-label').style.background = "rgba(0, 240, 255, 0.05)";
    } catch (err) {
        console.error("Camera access failed:", err);
        triggerToast("Please grant webcam permission to record", "danger");
        document.getElementById('camera-text-indicator').textContent = "Webcam blocked / missing";
    }
}

function startWebcamRecording() {
    if (!mediaStream) {
        triggerToast("No active camera stream found", "warning");
        return;
    }
    
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(mediaStream);
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        recordedBlobUrl = URL.createObjectURL(blob);
        triggerToast("Recording completed", "success");
        
        // Enable preview/play buttons
        document.getElementById('btn-play-record').disabled = false;
    };
    
    mediaRecorder.start();
    
    document.getElementById('recording-red-light').style.display = "inline-block";
    document.getElementById('camera-text-indicator').textContent = "RECORDING NOW...";
    document.getElementById('webcam-status-label').style.background = "rgba(255,23,68,0.15)";
    
    document.getElementById('btn-start-record').disabled = true;
    document.getElementById('btn-stop-record').disabled = false;
    document.getElementById('btn-play-record').disabled = true;
}

function stopWebcamRecording(silent = false) {
    // Stop recording processes
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    
    // Stop webcam hardware streams
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    
    const dot = document.getElementById('recording-red-light');
    if (dot) dot.style.display = "none";
    
    const ind = document.getElementById('camera-text-indicator');
    if (ind) ind.textContent = "Camera Stream Closed";
    
    const label = document.getElementById('webcam-status-label');
    if (label) label.style.background = "rgba(255,255,255,0.04)";
    
    const startBtn = document.getElementById('btn-start-record');
    if (startBtn) startBtn.disabled = false;
    
    const stopBtn = document.getElementById('btn-stop-record');
    if (stopBtn) stopBtn.disabled = true;
}

function playbackWebcamRecord() {
    if (!recordedBlobUrl) return;
    
    const webcamStream = document.getElementById('webcam-record-stream');
    const standardPreview = document.getElementById('upload-video-preview');
    
    // Swap videos display context to play blob preview
    webcamStream.style.display = "none";
    standardPreview.style.display = "block";
    
    standardPreview.src = recordedBlobUrl;
    standardPreview.play();
    
    if (document.getElementById('upload-pose-toggle').checked) {
        startPoseTrackingOverlay();
    }
}

// ==========================================
// VIDEO PREVIEW & POSE OVERLAY
// ==========================================
let activeUploadedFileUrl = null;

function resetUploadForm() {
    document.getElementById('video-upload-form').reset();
    document.getElementById('upload-video-preview').style.display = 'none';
    document.getElementById('video-preview-placeholder').style.display = 'flex';
    document.getElementById('pose-panel').style.display = 'none';
    document.getElementById('video-scan-container').style.display = 'none';
    
    const canvas = document.getElementById('upload-pose-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    recordedBlobUrl = null;
    activeVideoSourceMode = 'file';
    switchVideoInput('file');
}

function previewUploadVideo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'video/mp4') {
        triggerToast("Only MP4 videos are valid", "warning");
        event.target.value = '';
        return;
    }
    
    const preview = document.getElementById('upload-video-preview');
    const placeholder = document.getElementById('video-preview-placeholder');
    
    activeUploadedFileUrl = URL.createObjectURL(file);
    preview.src = activeUploadedFileUrl;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
    
    if (document.getElementById('upload-pose-toggle').checked) {
        startPoseTrackingOverlay();
    }
}

function togglePoseSimulator(event) {
    const targetUrl = activeVideoSourceMode === 'file' ? activeUploadedFileUrl : recordedBlobUrl;
    if (event.target.checked && targetUrl) {
        startPoseTrackingOverlay();
    } else {
        if (poseAnimationId) {
            cancelAnimationFrame(poseAnimationId);
            poseAnimationId = null;
        }
        document.getElementById('pose-panel').style.display = 'none';
        const canvas = document.getElementById('upload-pose-canvas');
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
}

function startPoseTrackingOverlay() {
    if (poseAnimationId) cancelAnimationFrame(poseAnimationId);
    
    const video = document.getElementById('upload-video-preview');
    const canvas = document.getElementById('upload-pose-canvas');
    const ctx = canvas.getContext('2d');
    const panel = document.getElementById('pose-panel');
    
    panel.style.display = 'block';
    
    function drawSkeleton() {
        if (video.paused || video.ended) {
            poseAnimationId = requestAnimationFrame(drawSkeleton);
            return;
        }
        
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const w = canvas.width;
        const h = canvas.height;
        const time = Date.now() / 1000;
        
        const head = { x: w * 0.5, y: h * 0.25 + Math.sin(time * 3) * 10 };
        const neck = { x: w * 0.5, y: h * 0.35 + Math.sin(time * 3) * 8 };
        const lShoulder = { x: w * 0.42, y: h * 0.38 + Math.sin(time * 3) * 6 };
        const rShoulder = { x: w * 0.58, y: h * 0.38 + Math.sin(time * 3) * 6 };
        const lElbow = { x: w * 0.38 + Math.cos(time * 4) * 15, y: h * 0.5 + Math.sin(time * 4) * 15 };
        const rElbow = { x: w * 0.62 + Math.sin(time * 3) * 15, y: h * 0.5 + Math.cos(time * 3) * 15 };
        const spine = { x: w * 0.5, y: h * 0.55 + Math.sin(time * 3) * 4 };
        const lHip = { x: w * 0.45, y: h * 0.6 };
        const rHip = { x: w * 0.55, y: h * 0.6 };
        const lKnee = { x: w * 0.43 + Math.sin(time * 5) * 20, y: h * 0.75 + Math.cos(time * 5) * 10 };
        const rKnee = { x: w * 0.57 + Math.cos(time * 5) * 20, y: h * 0.75 + Math.sin(time * 5) * 10 };
        const lAnkle = { x: w * 0.41 + Math.sin(time * 5) * 22, y: h * 0.9 };
        const rAnkle = { x: w * 0.59 + Math.cos(time * 5) * 22, y: h * 0.9 };
        
        const skeleton = [
            [head, neck], [neck, lShoulder], [neck, rShoulder],
            [lShoulder, lElbow], [rShoulder, rElbow],
            [neck, spine], [spine, lHip], [spine, rHip],
            [lHip, lKnee], [rHip, rKnee], [lKnee, lAnkle], [rHip, rKnee], [rKnee, rAnkle]
        ];
        
        ctx.strokeStyle = '#b300ff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#b300ff';
        ctx.shadowBlur = 10;
        
        skeleton.forEach(([ptA, ptB]) => {
            ctx.beginPath();
            ctx.moveTo(ptA.x, ptA.y);
            ctx.lineTo(ptB.x, ptB.y);
            ctx.stroke();
        });
        
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        
        const nodes = [head, neck, lShoulder, rShoulder, lElbow, rElbow, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle];
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`Knee: ${Math.abs(Math.floor(100 + Math.sin(time * 5) * 45))}°`, lKnee.x + 12, lKnee.y);
        ctx.fillText(`Spine: ${Math.abs(Math.floor(160 + Math.cos(time * 3) * 12))}°`, spine.x + 12, spine.y);
        
        document.getElementById('pose-kpi-1').innerHTML = `Scanning: Form Efficiency`;
        document.getElementById('pose-kpi-2').innerHTML = `Spine Angle: ${Math.abs(Math.floor(160 + Math.cos(time * 3) * 12))}°`;
        document.getElementById('pose-kpi-3').innerHTML = `Gait: ${(94 + Math.sin(time) * 3).toFixed(1)}%`;
        
        poseAnimationId = requestAnimationFrame(drawSkeleton);
    }
    poseAnimationId = requestAnimationFrame(drawSkeleton);
}

function handleVideoUpload(event) {
    event.preventDefault();
    if (!currentUser || currentUser.role !== 'athlete') return;
    
    const title = document.getElementById('upload-title').value;
    const category = document.getElementById('upload-category').value;
    
    const fileSource = activeVideoSourceMode === 'file' ? activeUploadedFileUrl : recordedBlobUrl;
    if (!fileSource) {
        triggerToast("Please select a video file or record a clip first", "warning");
        return;
    }
    
    // Trigger AI Scanner
    document.getElementById('video-scan-container').style.display = 'block';
    
    simulateAIAuthenticityScan('video-scan-bar', 'video-scan-status', 'video-scan-percentage', (trustScore) => {
        const newVideo = {
            id: `vid_${Date.now()}`,
            title,
            category,
            views: 0,
            date: new Date().toISOString().split('T')[0],
            path: fileSource,
            trustScore
        };
        
        const athletes = db.getAthletes();
        const idx = athletes.findIndex(a => a.id === currentUser.id);
        if (idx !== -1) {
            athletes[idx].videos.unshift(newVideo);
            athletes[idx].performanceScore = Math.min(100, athletes[idx].performanceScore + 4);
            db.saveAthletes(athletes);
            
            // Push into public Community sports activities feed
            const community = db.getCommunity();
            community.unshift({
                id: `feed_${Date.now()}`,
                athleteName: currentUser.name,
                athleteAvatar: currentUser.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                sport: currentUser.sport,
                title: `${category}: ${title}`,
                detail: `Uploaded performance footage, verified with ${trustScore}% authenticity rating.`,
                cheers: 0,
                date: new Date().toISOString(),
                hasCheered: false
            });
            db.saveCommunity(community);
            
            db.addLog(`Video uploaded: ${title} by ${currentUser.name}. Trust Score: ${trustScore}%`);
            triggerToast(`AI Audit Success. Trust Score: ${trustScore}%`, "success");
            switchView('dashboard');
        }
    });
}

// ==========================================
// RADAR CHART DRAWING ENGINE
// ==========================================
function drawRadarChart(canvasId, skills) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 300;
    const h = canvas.height = 300;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 100;
    
    const keys = Object.keys(skills);
    const values = Object.values(skills);
    const totalAxes = keys.length;
    
    ctx.clearRect(0, 0, w, h);
    
    for (let r = radius; r > 0; r -= radius / 3) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < totalAxes; i++) {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    ctx.font = '10px Inter';
    ctx.fillStyle = '#a1a1aa';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < totalAxes; i++) {
        const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
        const xAxis = cx + radius * Math.cos(angle);
        const yAxis = cy + radius * Math.sin(angle);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(xAxis, yAxis);
        ctx.stroke();
        
        const xText = cx + (radius + 20) * Math.cos(angle);
        const yText = cy + (radius + 15) * Math.sin(angle);
        const labelName = keys[i].toUpperCase();
        ctx.fillText(`${labelName} (${values[i]}%)`, xText, yText);
    }
    
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(179, 0, 255, 0.35)';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
        const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
        const scorePercent = values[i] / 100;
        const x = cx + radius * scorePercent * Math.cos(angle);
        const y = cy + radius * scorePercent * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
}

// ==========================================
// COACH PANEL / DIRECTORY
// ==========================================
function loadCoachDirectory() {
    const athletes = db.getAthletes();
    const container = document.getElementById('athletes-grid-container');
    container.innerHTML = '';
    
    const filtered = filterAthleteList(athletes);
    document.getElementById('filtered-count').textContent = filtered.length;
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="glass-card" style="padding: 40px; text-align: center; width: 100%; grid-column: span 3; color: var(--text-muted);">No athletes match search parameters.</div>';
        return;
    }
    
    filtered.forEach(ath => {
        const card = document.createElement('div');
        card.className = 'athlete-card glass-card';
        
        let auditLabel = `<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</span>`;
        if (ath.verificationStatus === 'pending') {
            auditLabel = `<span class="verified-badge pending"><i class="fa-solid fa-hourglass-half"></i> Auditing</span>`;
        } else if (ath.verificationStatus === 'rejected') {
            auditLabel = `<span class="verified-badge rejected"><i class="fa-solid fa-circle-xmark"></i> Rejected</span>`;
        }
        
        card.innerHTML = `
            <div class="athlete-card-header">
                <img src="${ath.profileImage}" alt="${ath.name}">
                <div class="athlete-card-meta">
                    <h4>${ath.name}</h4>
                    <p>${ath.sport} • ${ath.state}</p>
                </div>
            </div>
            <div class="athlete-stats">
                <div class="athlete-stat">
                    <span>Performance Score</span>
                    <strong>${ath.performanceScore}%</strong>
                </div>
                <div class="athlete-stat">
                    <span>AI Talent Rank</span>
                    <strong>#${ath.aiRank}</strong>
                </div>
            </div>
            <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
                ${auditLabel}
                <span class="text-muted" style="font-size: 0.75rem;">Age: ${ath.age}y</span>
            </div>
            <div class="athlete-actions">
                <button class="btn-glow" style="padding: 8px 12px; font-size: 0.8rem;" onclick="viewAthleteDossier('${ath.id}')">
                    Inspect Dossier <i class="fa-solid fa-folder-open"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterAthleteList(athletes) {
    const query = document.getElementById('global-search-input').value.toLowerCase().trim();
    
    const sportChecks = document.querySelectorAll('input[name="filter-sport"]:checked');
    const activeSports = Array.from(sportChecks).map(c => c.value);
    
    const ageChecks = document.querySelectorAll('input[name="filter-age"]:checked');
    const activeAgeRanges = Array.from(ageChecks).map(c => c.value);
    
    const verifyChecks = document.querySelectorAll('input[name="filter-verify"]:checked');
    const activeVerifies = Array.from(verifyChecks).map(c => c.value);
    
    const activeState = document.getElementById('filter-state').value;
    
    let results = athletes.filter(ath => {
        if (query) {
            const matchName = ath.name.toLowerCase().includes(query);
            const matchState = ath.state.toLowerCase().includes(query);
            const matchDistrict = ath.district.toLowerCase().includes(query);
            const matchSport = ath.sport.toLowerCase().includes(query);
            if (!matchName && !matchState && !matchDistrict && !matchSport) return false;
        }
        
        if (activeSports.length > 0 && !activeSports.includes(ath.sport)) return false;
        
        if (activeAgeRanges.length > 0) {
            let passAge = false;
            activeAgeRanges.forEach(range => {
                if (range === 'under-16' && ath.age < 16) passAge = true;
                if (range === 'under-18' && ath.age >= 16 && ath.age < 18) passAge = true;
                if (range === 'senior' && ath.age >= 18) passAge = true;
            });
            if (!passAge) return false;
        }
        
        if (activeVerifies.length > 0 && !activeVerifies.includes(ath.verificationStatus)) return false;
        if (activeState && ath.state !== activeState) return false;
        
        if (showOnlyShortlisted) {
            const coaches = db.getCoaches();
            const currentCoach = (currentUser && currentUser.email) ? (coaches.find(c => c.email === currentUser.email) || coaches[0]) : coaches[0];
            if (currentCoach && currentCoach.shortlist && !currentCoach.shortlist.includes(ath.id)) return false;
        }
        return true;
    });
    
    const sortVal = document.getElementById('filter-sort').value;
    if (sortVal === 'score-desc') {
        results.sort((a, b) => b.performanceScore - a.performanceScore);
    } else if (sortVal === 'rank-asc') {
        results.sort((a, b) => a.aiRank - b.aiRank);
    } else if (sortVal === 'age-asc') {
        results.sort((a, b) => a.age - b.age);
    }
    
    return results;
}

function applyFilters() {
    loadCoachDirectory();
}

function handleGlobalSearch(event) {
    loadCoachDirectory();
}

function toggleShortlistFilter(btn) {
    showOnlyShortlisted = !showOnlyShortlisted;
    if (showOnlyShortlisted) {
        btn.innerHTML = `<i class="fa-solid fa-star" style="color: var(--neon-blue);"></i> Showing Shortlisted`;
        btn.style.borderColor = 'var(--neon-blue)';
    } else {
        btn.innerHTML = `<i class="fa-regular fa-star"></i> Shortlisted`;
        btn.style.borderColor = 'var(--card-border)';
    }
    loadCoachDirectory();
}

// ==========================================
// ATHLETE PROFILE & SELECTION HANDSHAKE
// ==========================================
function viewAthleteDossier(athleteId) {
    currentAthleteProfileId = athleteId;
    document.getElementById('profile-back-btn').style.display = 'block';
    switchView('profile');
}

function goBackToDirectory() {
    switchView('coach');
}

function loadAthleteProfile() {
    if (!currentAthleteProfileId) return;
    
    const athletes = db.getAthletes();
    const athlete = athletes.find(a => a.id === currentAthleteProfileId);
    if (!athlete) return;
    
    document.getElementById('profile-detail-avatar').src = athlete.profileImage;
    document.getElementById('profile-detail-name').textContent = athlete.name;
    document.getElementById('profile-detail-sport').textContent = athlete.sport;
    
    const badge = document.getElementById('profile-detail-badge');
    badge.textContent = athlete.verificationStatus.toUpperCase();
    badge.className = `verified-badge ${athlete.verificationStatus}`;
    
    document.getElementById('profile-detail-age').textContent = athlete.age + " Years";
    document.getElementById('profile-detail-national-id').textContent = athlete.nationalId;
    document.getElementById('profile-detail-state').textContent = athlete.state;
    document.getElementById('profile-detail-district').textContent = athlete.district;
    
    document.getElementById('profile-detail-height-weight').textContent = `${athlete.height} cm / ${athlete.weight} kg`;
    document.getElementById('profile-detail-bmi').textContent = athlete.bmi;
    document.getElementById('profile-detail-blood').textContent = athlete.bloodGroup;
    
    // Connection Badges Setup
    const connectionStatusPanel = document.getElementById('connection-status-panel');
    connectionStatusPanel.innerHTML = '';
    
    const connectBtn = document.getElementById('profile-connect-btn');
    
    // Only display connection controls to official coaches
    if (currentUser && currentUser.role === 'coach') {
        document.getElementById('coach-selection-actions').style.display = 'flex';
        
        const coaches = db.getCoaches();
        const activeCoach = coaches.find(c => c.email === currentUser.email) || coaches[0];
        
        // Handle Shortlist button state
        const shortlistBtn = document.getElementById('profile-shortlist-btn');
        if (activeCoach.shortlist.includes(athlete.id)) {
            shortlistBtn.innerHTML = `<i class="fa-solid fa-star" style="color: var(--neon-blue);"></i> Shortlisted`;
            shortlistBtn.style.borderColor = 'var(--neon-blue)';
        } else {
            shortlistBtn.innerHTML = `<i class="fa-regular fa-star"></i> Shortlist Athlete`;
            shortlistBtn.style.borderColor = 'var(--card-border)';
        }
        
        // Check Handshake status
        const isConnected = athlete.connections && athlete.connections.includes(activeCoach.id);
        const hasPending = athlete.pendingRequests && athlete.pendingRequests.includes(activeCoach.id);
        
        if (isConnected) {
            connectionStatusPanel.innerHTML = `<span class="connection-badge"><i class="fa-solid fa-handshake"></i> Connected</span>`;
            connectBtn.innerHTML = `<i class="fa-solid fa-check"></i> Connected`;
            connectBtn.disabled = true;
            connectBtn.style.borderColor = "var(--badge-verified)";
        } else if (hasPending) {
            connectionStatusPanel.innerHTML = `<span class="connection-badge pending"><i class="fa-solid fa-hourglass-half"></i> Request Pending</span>`;
            connectBtn.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> Request Sent`;
            connectBtn.disabled = true;
            connectBtn.style.borderColor = "var(--badge-pending)";
        } else {
            connectBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Request Connection`;
            connectBtn.disabled = false;
            connectBtn.style.borderColor = "var(--neon-purple)";
        }
    } else {
        document.getElementById('coach-selection-actions').style.display = 'none';
        
        // If athlete is viewing self profile, show connection badge counts
        if (athlete.connections && athlete.connections.length > 0) {
            connectionStatusPanel.innerHTML = `<span class="connection-badge"><i class="fa-solid fa-handshake"></i> Connected Selectors: ${athlete.connections.length}</span>`;
        }
    }
    
    // Timeline
    const timeline = document.getElementById('profile-detail-achievements');
    timeline.innerHTML = '';
    if (athlete.achievements.length === 0) {
        timeline.innerHTML = '<p class="text-muted">No achievements registered.</p>';
    } else {
        athlete.achievements.forEach(ach => {
            const item = document.createElement('div');
            item.className = 'achievement-timeline-item';
            item.innerHTML = `
                <div class="achievement-year">${ach.year}</div>
                <div class="achievement-desc">
                    <h5>${ach.title}</h5>
                    <p>${ach.detail}</p>
                </div>
            `;
            timeline.appendChild(item);
        });
    }
    
    // Certificates
    const certsList = document.getElementById('profile-detail-certificates');
    certsList.innerHTML = '';
    athlete.certificates.forEach(c => {
        const item = document.createElement('div');
        item.className = 'certificate-item';
        item.innerHTML = `
            <span>
                <i class="fa-solid fa-file-pdf" style="color: #ff1744; margin-right: 8px;"></i> ${c.name} 
                <span class="ai-trust-badge" style="margin-top: 0; padding: 2px 6px; font-size: 0.7rem;"><i class="fa-solid fa-shield"></i> Trust: ${c.trustScore}%</span>
            </span>
            <a href="#" class="table-doc-link" onclick="downloadMockCert(event, '${c.name}')"><i class="fa-solid fa-download"></i> View Proof</a>
        `;
        certsList.appendChild(item);
    });
    
    // Videos
    const videosList = document.getElementById('profile-detail-videos');
    videosList.innerHTML = '';
    if (athlete.videos.length === 0) {
        videosList.innerHTML = '<p class="text-muted">No performance videos uploaded yet.</p>';
    } else {
        athlete.videos.forEach(v => {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.innerHTML = `
                <div class="upload-info">
                    <div class="upload-thumbnail"><i class="fa-solid fa-play"></i></div>
                    <div class="upload-details">
                        <h5>${v.title}</h5>
                        <p>${v.category} • Trust: ${v.trustScore}% • ${v.views} views</p>
                    </div>
                </div>
                <button class="btn-glow" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewAthleteVideo('${athlete.id}', '${v.id}')">Watch Video <i class="fa-solid fa-circle-play"></i></button>
            `;
            videosList.appendChild(item);
        });
    }
    
    setTimeout(() => {
        drawRadarChart('profile-radar-chart', athlete.skills);
    }, 50);
}

function downloadMockCert(event, name) {
    event.preventDefault();
    db.addLog(`Downloaded verification certificate: ${name}`);
    triggerToast(`Opening ${name}... (Verification simulation)`, "success");
}

function viewAthleteVideo(athleteId, videoId) {
    const athletes = db.getAthletes();
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete) return;
    
    const video = athlete.videos.find(v => v.id === videoId);
    if (!video) return;
    
    video.views += 1;
    db.saveAthletes(athletes);
    
    switchView('upload');
    
    const preview = document.getElementById('upload-video-preview');
    const placeholder = document.getElementById('video-preview-placeholder');
    
    activeUploadedFileUrl = video.path;
    preview.src = video.path;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
    
    document.getElementById('upload-title').value = `Scouting: ${athlete.name} - ${video.title}`;
    document.getElementById('upload-pose-toggle').checked = true;
    startPoseTrackingOverlay();
    
    triggerToast(`Playing biomechanics scanning stream`, "info");
}

function toggleShortlist() {
    if (!currentUser || currentUser.role !== 'coach' || !currentAthleteProfileId) return;
    
    const coaches = db.getCoaches();
    const coachIdx = coaches.findIndex(c => c.email === currentUser.email);
    
    if (coachIdx !== -1) {
        const athletes = db.getAthletes();
        const ath = athletes.find(a => a.id === currentAthleteProfileId);
        
        const idx = coaches[coachIdx].shortlist.indexOf(currentAthleteProfileId);
        if (idx !== -1) {
            coaches[coachIdx].shortlist.splice(idx, 1);
            triggerToast(`${ath.name} removed from shortlist`, "warning");
        } else {
            coaches[coachIdx].shortlist.push(currentAthleteProfileId);
            triggerToast(`${ath.name} added to shortlist`, "success");
            db.addLog(`Athlete shortlisted by ${currentUser.name}: ${ath.name}`);
        }
        
        db.saveCoaches(coaches);
        loadAthleteProfile();
    }
}

// Send Connection Request Handshake
function toggleCoachConnectionRequest() {
    if (!currentUser || currentUser.role !== 'coach' || !currentAthleteProfileId) return;
    
    const coaches = db.getCoaches();
    const activeCoach = coaches.find(c => c.email === currentUser.email) || coaches[0];
    
    const athletes = db.getAthletes();
    const athIdx = athletes.findIndex(a => a.id === currentAthleteProfileId);
    
    if (athIdx !== -1) {
        const athlete = athletes[athIdx];
        
        if (!athlete.pendingRequests) athlete.pendingRequests = [];
        if (!athlete.connections) athlete.connections = [];
        
        if (!athlete.pendingRequests.includes(activeCoach.id) && !athlete.connections.includes(activeCoach.id)) {
            athlete.pendingRequests.push(activeCoach.id);
            db.saveAthletes(athletes);
            
            // Push notification to the athlete inbox
            const invites = db.getNotifications();
            invites.unshift({
                id: `not_req_${Date.now()}`,
                recipientId: athlete.id,
                senderId: activeCoach.id,
                senderName: `${activeCoach.name} (${activeCoach.department})`,
                type: 'connection_request',
                title: 'Official Connection Request',
                message: `Selector ${activeCoach.name} has requested an official verification connection. Please accept this request to establish the communication line.`,
                date: new Date().toISOString(),
                read: false
            });
            db.saveNotifications(invites);
            
            db.addLog(`Connection requested: Coach ${activeCoach.name} to Athlete ${athlete.name}`);
            triggerToast("Connection request sent to athlete", "success");
            
            loadAthleteProfile();
        }
    }
}

// Athlete accepts connection
function acceptCoachConnection(notificationId, coachId) {
    if (!currentUser || currentUser.role !== 'athlete') return;
    
    const athletes = db.getAthletes();
    const athIdx = athletes.findIndex(a => a.id === currentUser.id);
    
    const coaches = db.getCoaches();
    const coachIdx = coaches.findIndex(c => c.id === coachId);
    
    if (athIdx !== -1 && coachIdx !== -1) {
        const athlete = athletes[athIdx];
        const coach = coaches[coachIdx];
        
        // Remove from pending, add to connections
        const pendingIdx = athlete.pendingRequests.indexOf(coachId);
        if (pendingIdx !== -1) {
            athlete.pendingRequests.splice(pendingIdx, 1);
        }
        
        if (!athlete.connections) athlete.connections = [];
        if (!athlete.connections.includes(coachId)) {
            athlete.connections.push(coachId);
        }
        
        // Add to coach connections
        if (!coach.connections) coach.connections = [];
        if (!coach.connections.includes(athlete.id)) {
            coach.connections.push(athlete.id);
        }
        
        db.saveAthletes(athletes);
        db.saveCoaches(coaches);
        
        // Delete notification
        const notifications = db.getNotifications();
        const listIdx = notifications.findIndex(n => n.id === notificationId);
        if (listIdx !== -1) {
            notifications.splice(listIdx, 1);
            db.saveNotifications(notifications);
        }
        
        db.addLog(`Connection established: ${coach.name} <==> ${athlete.name}`);
        triggerToast(`You are now connected with ${coach.name}!`, "success");
        
        loadDashboardData();
        closeNotificationPanel();
    }
}

function sendTrialInvitation() {
    if (!currentUser || !currentAthleteProfileId) return;
    
    const athletes = db.getAthletes();
    const ath = athletes.find(a => a.id === currentAthleteProfileId);
    
    const invites = db.getNotifications();
    const newInvite = {
        id: `not_${Date.now()}`,
        recipientId: ath.id,
        senderName: `${currentUser.name} (${currentUser.department || 'Official Selector'})`,
        type: 'invitation',
        title: `Trial Selection Invitation: National camp`,
        message: `Dear ${ath.name}, based on your performance video profile, we formally invite you to the State trials selection camp starting in 15 days. Please ensure all ID proofs match the documents submitted online.`,
        date: new Date().toISOString(),
        read: false
    };
    
    invites.unshift(newInvite);
    db.saveNotifications(invites);
    
    db.addLog(`Sent selection invitation letter to ${ath.name}`);
    triggerToast(`Trial Invitation letter issued to ${ath.name}`, "success");
}

function exportProfilePDF() {
    if (!currentAthleteProfileId) return;
    const athletes = db.getAthletes();
    const ath = athletes.find(a => a.id === currentAthleteProfileId);
    
    db.addLog(`Sports Resume exported to PDF: ${ath.name}`);
    triggerToast("Generating print resume...", "info");
    window.print();
}

// ==========================================
// ADMIN PANEL / SELECTION QUEUE
// ==========================================
function loadAdminPanel() {
    const athletes = db.getAthletes();
    
    document.getElementById('admin-stat-total').textContent = athletes.length;
    document.getElementById('admin-stat-verified').textContent = athletes.filter(a => a.verificationStatus === 'approved').length;
    document.getElementById('admin-stat-pending').textContent = athletes.filter(a => a.verificationStatus === 'pending').length;
    
    const tbody = document.getElementById('admin-verification-queue-rows');
    tbody.innerHTML = '';
    
    const pendingList = athletes.filter(a => a.verificationStatus === 'pending');
    
    if (pendingList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">No pending certificate audits in queue.</td></tr>';
    } else {
        pendingList.forEach(ath => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="user-snippet" style="padding: 0;">
                        <img src="${ath.profileImage}" class="user-avatar" style="width: 32px; height: 32px;">
                        <strong>${ath.name}</strong>
                    </div>
                </td>
                <td>${ath.sport}</td>
                <td>${ath.district}, ${ath.state}</td>
                <td><a href="#" class="table-doc-link" onclick="downloadMockCert(event, 'ID Proof')"><i class="fa-solid fa-file-invoice"></i> NationalID</a></td>
                <td><a href="#" class="table-doc-link" onclick="downloadMockCert(event, 'Sports Cert')"><i class="fa-solid fa-award"></i> Certificate</a></td>
                <td>
                    <div class="action-badge-group">
                        <button class="badge-btn approve" onclick="auditProfileStatus('${ath.id}', 'approved')">Approve</button>
                        <button class="badge-btn reject" onclick="auditProfileStatus('${ath.id}', 'rejected')">Reject</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    const heatmap = document.getElementById('admin-state-heatmap');
    heatmap.innerHTML = '';
    
    const counts = {};
    athletes.forEach(a => {
        counts[a.state] = (counts[a.state] || 0) + 1;
    });
    
    const sortedStates = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    const maxVal = sortedStates.length > 0 ? sortedStates[0][1] : 1;
    
    sortedStates.forEach(([state, qty]) => {
        const pct = (qty / maxVal) * 100;
        const item = document.createElement('div');
        item.className = 'heatmap-item';
        item.innerHTML = `
            <div class="heatmap-meta">
                <span>${state}</span>
                <strong>${qty} Athletes</strong>
            </div>
            <div class="heatmap-progress-bar">
                <div class="heatmap-progress-fill" style="width: ${pct}%;"></div>
            </div>
        `;
        heatmap.appendChild(item);
    });
    
    const logsConsole = document.getElementById('admin-audit-logs');
    logsConsole.innerHTML = '';
    db.getLogs().forEach(l => {
        const line = document.createElement('div');
        line.style.marginBottom = '6px';
        line.innerHTML = `<span style="color: var(--neon-purple);">${l.time.substring(11, 19)}</span> - ${l.event}`;
        logsConsole.appendChild(line);
    });
}

function auditProfileStatus(athleteId, status) {
    const athletes = db.getAthletes();
    const idx = athletes.findIndex(a => a.id === athleteId);
    if (idx !== -1) {
        athletes[idx].verificationStatus = status;
        athletes[idx].isVerified = (status === 'approved');
        
        if (status === 'approved') {
            athletes[idx].performanceScore = Math.min(100, athletes[idx].performanceScore + 5);
        }
        
        db.saveAthletes(athletes);
        db.addLog(`Audit profile verification: ${athletes[idx].name} set to ${status.toUpperCase()}`);
        triggerToast(`Athlete profile status updated to ${status}`, status === 'approved' ? "success" : "danger");
        
        loadAdminPanel();
    }
}

// ==========================================
// ATHLETES COMMUNITY SPORTS FEED
// ==========================================
function loadCommunityFeed() {
    const feed = db.getCommunity();
    const container = document.getElementById('public-sports-feed-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    feed.forEach(item => {
        const card = document.createElement('div');
        card.className = 'feed-card glass-card';
        
        const activeClass = item.hasCheered ? 'active' : '';
        const heartIcon = item.hasCheered ? 'fa-solid' : 'fa-regular';
        
        card.innerHTML = `
            <div class="feed-card-header">
                <div class="feed-user">
                    <img src="${item.athleteAvatar}" alt="${item.athleteName}">
                    <div class="feed-user-meta">
                        <h5>${item.athleteName}</h5>
                        <span>${new Date(item.date).toLocaleDateString()}</span>
                    </div>
                </div>
                <span class="feed-badge">${item.sport}</span>
            </div>
            <div class="feed-card-body">
                <h4 style="font-size: 1rem; color: var(--neon-blue); margin-bottom: 6px;">${item.title}</h4>
                <p>${item.detail}</p>
            </div>
            <div class="feed-card-footer">
                <button class="cheer-btn ${activeClass}" onclick="cheerAthleteActivity(event, '${item.id}')">
                    <i class="${heartIcon} fa-heart"></i> Cheer Athlete (<span class="cheer-count">${item.cheers}</span>)
                </button>
                <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-fire"></i> Live Action</span>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Automatically render rosters of athletes and coaches on the main page
    loadMainPageRosters();
}

function loadMainPageRosters() {
    const athletes = db.getAthletes();
    const athleteContainer = document.getElementById('main-athletes-roster');
    if (athleteContainer) {
        athleteContainer.innerHTML = '';
        athletes.forEach(ath => {
            const card = document.createElement('div');
            card.className = 'athlete-card glass-card';
            
            let auditLabel = `<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</span>`;
            if (ath.verificationStatus === 'pending') {
                auditLabel = `<span class="verified-badge pending"><i class="fa-solid fa-hourglass-half"></i> Auditing</span>`;
            } else if (ath.verificationStatus === 'rejected') {
                auditLabel = `<span class="verified-badge rejected"><i class="fa-solid fa-circle-xmark"></i> Rejected</span>`;
            }
            
            let videoButtonHTML = '';
            if (ath.videos && ath.videos.length > 0) {
                videoButtonHTML = `
                    <button class="btn-glow" style="padding: 6px 12px; font-size: 0.75rem;" onclick="viewAthleteVideo('${ath.id}', '${ath.videos[0].id}')">
                        Watch Video <i class="fa-solid fa-circle-play"></i>
                    </button>
                `;
            } else {
                videoButtonHTML = `<button class="btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;" disabled>No Videos</button>`;
            }
            
            card.innerHTML = `
                <div class="athlete-card-header">
                    <img src="${ath.profileImage}" alt="${ath.name}">
                    <div class="athlete-card-meta">
                        <h4>${ath.name}</h4>
                        <p>${ath.sport} • ${ath.state}</p>
                    </div>
                </div>
                <div class="athlete-stats">
                    <div class="athlete-stat">
                        <span>Performance Score</span>
                        <strong>${ath.performanceScore}%</strong>
                    </div>
                    <div class="athlete-stat">
                        <span>AI Talent Rank</span>
                        <strong>#${ath.aiRank}</strong>
                    </div>
                </div>
                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                    ${auditLabel}
                    <span class="text-muted" style="font-size: 0.75rem;">Age: ${ath.age}y</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; flex-grow: 1;" onclick="viewAthleteDossier('${ath.id}')">
                        View Dossier
                    </button>
                    ${videoButtonHTML}
                </div>
            `;
            athleteContainer.appendChild(card);
        });
    }

    const coaches = db.getCoaches();
    const coachContainer = document.getElementById('main-coaches-roster');
    if (coachContainer) {
        coachContainer.innerHTML = '';
        coaches.forEach(coach => {
            const card = document.createElement('div');
            card.className = 'athlete-card glass-card';
            card.innerHTML = `
                <div class="athlete-card-header" style="margin-bottom: 12px;">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop" alt="${coach.name}">
                    <div class="athlete-card-meta">
                        <h4>${coach.name}</h4>
                        <p>${coach.sportFocus} Selector</p>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-gray); margin-bottom: 12px; font-family: monospace;">
                    <i class="fa-solid fa-building-shield"></i> ${coach.department}
                </div>
                <div style="border-top: 1px solid var(--card-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
                    <span>Shortlisted: <strong>${coach.shortlist ? coach.shortlist.length : 0}</strong></span>
                    <span class="connection-badge" style="padding: 2px 8px; font-size: 0.7rem;"><i class="fa-solid fa-handshake"></i> Connected: ${coach.connections ? coach.connections.length : 0}</span>
                </div>
                <div>
                    <button class="btn-glow" style="padding: 6px 12px; font-size: 0.75rem; width: 100%;" onclick="viewCoachProfile('${coach.id}')">
                        Inspect Profile <i class="fa-solid fa-folder-open"></i>
                    </button>
                </div>
            `;
            coachContainer.appendChild(card);
        });
    }

    // Load videos pool on main page
    loadMainPageVideos();
}

function cheerAthleteActivity(event, feedId) {
    event.stopPropagation();
    const feed = db.getCommunity();
    const idx = feed.findIndex(f => f.id === feedId);
    
    if (idx !== -1) {
        if (feed[idx].hasCheered) {
            feed[idx].cheers -= 1;
            feed[idx].hasCheered = false;
        } else {
            feed[idx].cheers += 1;
            feed[idx].hasCheered = true;
            triggerToast(`Cheered ${feed[idx].athleteName}! 👏`, "success");
        }
        db.saveCommunity(feed);
        loadCommunityFeed();
    }
}

// ==========================================
// NOTIFICATIONS DRAWER
// ==========================================
function showNotificationPanel() {
    const overlay = document.getElementById('notifications-overlay');
    overlay.style.display = 'block';
    
    const list = document.getElementById('notifications-panel-list');
    list.innerHTML = '';
    
    const selfId = currentUser ? currentUser.id : 'ath_1';
    const notifications = db.getNotifications().filter(n => n.recipientId === selfId);
    
    if (notifications.length === 0) {
        list.innerHTML = '<p class="text-muted" style="text-align: center; margin-top: 30px;">No new alerts.</p>';
        return;
    }
    
    notifications.forEach(n => {
        const item = document.createElement('div');
        item.className = 'glass-card';
        item.style.padding = '16px';
        item.style.borderColor = 'var(--neon-purple)';
        
        let buttonHTML = '';
        if (n.type === 'connection_request') {
            buttonHTML = `
                <button class="btn-glow" style="margin-top: 10px; width: 100%; font-size: 0.8rem;" onclick="acceptCoachConnection('${n.id}', '${n.senderId}')">
                    <i class="fa-solid fa-check"></i> Accept Connection
                </button>
            `;
        }
        
        item.innerHTML = `
            <div style="font-weight: 700; color: var(--neon-blue); margin-bottom: 8px;">${n.title}</div>
            <p style="font-size: 0.85rem; line-height: 1.5; margin-bottom: 8px;">${n.message}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: right;">${new Date(n.date).toLocaleString()}</div>
            ${buttonHTML}
        `;
        list.appendChild(item);
    });
    
    document.getElementById('alert-indicator').style.display = 'none';
}

function closeNotificationPanel() {
    document.getElementById('notifications-overlay').style.display = 'none';
}

function openSportExplore(sport) {
    if (currentUser && currentUser.role === 'athlete') {
        triggerToast("Selector directory search restricted to official Coaches.", "warning");
        return;
    }
    
    switchView('coach');
    const checkboxes = document.querySelectorAll('input[name="filter-sport"]');
    checkboxes.forEach(c => {
        c.checked = (c.value === sport);
    });
    applyFilters();
}

// ==========================================
// LANDING PAGE FLOATING VIDEO MODAL PLAYER
// ==========================================
let modalPoseAnimationId = null;

function openLandingVideoModal(videoPath, title, sport, trustScore, athleteName, athleteId) {
    const modal = document.getElementById('landing-video-modal');
    const player = document.getElementById('modal-video-player');
    const modalTitle = document.getElementById('modal-video-title');
    const modalSport = document.getElementById('modal-video-sport');
    const modalBadge = document.getElementById('modal-video-badge');
    const modalDetail = document.getElementById('modal-video-detail');
    const modalCanvas = document.getElementById('modal-pose-canvas');
    const modalPanel = document.getElementById('modal-pose-panel');

    modal.style.display = 'flex';
    player.src = videoPath;
    player.play();

    modalTitle.textContent = `${athleteName} - ${title}`;
    modalSport.textContent = sport;
    modalBadge.innerHTML = `<i class="fa-solid fa-shield"></i> Trust: ${trustScore}%`;
    modalDetail.textContent = `Kinematics form analysis running overlay in real-time. Trust Index: ${trustScore}%. Click cross button to exit player.`;

    startModalPoseTracking(player, modalCanvas, modalPanel);
}

function closeLandingVideoModal() {
    const modal = document.getElementById('landing-video-modal');
    const player = document.getElementById('modal-video-player');
    modal.style.display = 'none';
    player.pause();
    player.src = '';
    
    if (modalPoseAnimationId) {
        cancelAnimationFrame(modalPoseAnimationId);
        modalPoseAnimationId = null;
    }
}

function startModalPoseTracking(video, canvas, panel) {
    if (modalPoseAnimationId) cancelAnimationFrame(modalPoseAnimationId);
    
    const ctx = canvas.getContext('2d');
    panel.style.display = 'block';
    
    function drawSkeleton() {
        if (video.paused || video.ended) {
            modalPoseAnimationId = requestAnimationFrame(drawSkeleton);
            return;
        }
        
        canvas.width = video.clientWidth || 640;
        canvas.height = video.clientHeight || 360;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const w = canvas.width;
        const h = canvas.height;
        const time = Date.now() / 1000;
        
        const head = { x: w * 0.5 + Math.sin(time * 2) * 8, y: h * 0.22 + Math.cos(time * 2) * 5 };
        const neck = { x: w * 0.5 + Math.sin(time * 2) * 7, y: h * 0.32 + Math.cos(time * 2) * 4 };
        const lShoulder = { x: w * 0.43, y: h * 0.35 };
        const rShoulder = { x: w * 0.57, y: h * 0.35 };
        const lElbow = { x: w * 0.39 + Math.sin(time * 3) * 12, y: h * 0.48 };
        const rElbow = { x: w * 0.61 + Math.cos(time * 3) * 12, y: h * 0.48 };
        const spine = { x: w * 0.5 + Math.sin(time * 2) * 5, y: h * 0.52 };
        const lHip = { x: w * 0.46, y: h * 0.58 };
        const rHip = { x: w * 0.54, y: h * 0.58 };
        const lKnee = { x: w * 0.44 + Math.sin(time * 4) * 15, y: h * 0.73 };
        const rKnee = { x: w * 0.56 + Math.cos(time * 4) * 15, y: h * 0.73 };
        const lAnkle = { x: w * 0.42 + Math.sin(time * 4) * 18, y: h * 0.88 };
        const rAnkle = { x: w * 0.58 + Math.cos(time * 4) * 18, y: h * 0.88 };
        
        const skeleton = [
            [head, neck], [neck, lShoulder], [neck, rShoulder],
            [lShoulder, lElbow], [rShoulder, rElbow],
            [neck, spine], [spine, lHip], [spine, rHip],
            [lHip, lKnee], [rHip, rKnee], [lKnee, lAnkle], [rKnee, rAnkle]
        ];
        
        ctx.strokeStyle = '#ff5500'; 
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff5500';
        ctx.shadowBlur = 8;
        
        skeleton.forEach(([ptA, ptB]) => {
            ctx.beginPath();
            ctx.moveTo(ptA.x, ptA.y);
            ctx.lineTo(ptB.x, ptB.y);
            ctx.stroke();
        });
        
        ctx.fillStyle = '#ccff00'; 
        ctx.shadowColor = '#ccff00';
        ctx.shadowBlur = 10;
        
        const nodes = [head, neck, lShoulder, rShoulder, lElbow, rElbow, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle];
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`Knee: ${Math.abs(Math.floor(110 + Math.sin(time * 4) * 35))}°`, lKnee.x + 12, lKnee.y);
        ctx.fillText(`Torso: ${Math.abs(Math.floor(165 + Math.cos(time * 2) * 8))}°`, spine.x + 12, spine.y);
        
        document.getElementById('modal-pose-kpi-1').innerHTML = `Gait Power: ${(90 + Math.sin(time) * 4).toFixed(0)}%`;
        document.getElementById('modal-pose-kpi-2').innerHTML = `Torso Angle: ${Math.abs(Math.floor(165 + Math.cos(time * 2) * 8))}°`;
        document.getElementById('modal-pose-kpi-3').innerHTML = `Flexibility Index: ${(85 + Math.cos(time * 3) * 6).toFixed(0)}%`;
        
        modalPoseAnimationId = requestAnimationFrame(drawSkeleton);
    }
    modalPoseAnimationId = requestAnimationFrame(drawSkeleton);
}

// ==========================================
// ATHLETE VIDEOS POOL SHOWCASE
// ==========================================
function loadMainPageVideos() {
    const athletes = db.getAthletes();
    const container = document.getElementById('main-videos-pool');
    if (!container) return;
    
    container.innerHTML = '';
    
    let allVideos = [];
    athletes.forEach(ath => {
        if (ath.videos && ath.videos.length > 0) {
            ath.videos.forEach(vid => {
                allVideos.push({
                    athleteId: ath.id,
                    athleteName: ath.name,
                    athleteAvatar: ath.profileImage,
                    sport: ath.sport,
                    video: vid
                });
            });
        }
    });
    
    if (allVideos.length === 0) {
        container.innerHTML = '<div class="glass-card" style="padding: 40px; text-align: center; width: 100%; grid-column: span 3; color: var(--text-muted);">No athlete performance videos found.</div>';
        return;
    }
    
    allVideos.forEach(item => {
        const card = document.createElement('div');
        card.className = 'athlete-card glass-card';
        card.innerHTML = `
            <div style="position: relative; height: 160px; background: rgba(0,0,0,0.4); border-radius: 8px; overflow: hidden; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--card-border);">
                <!-- Video Play Overlay Icon -->
                <i class="fa-solid fa-circle-play" style="font-size: 3rem; color: var(--neon-blue); cursor: pointer; transition: var(--transition-smooth); z-index: 5;" onclick="openLandingVideoModal('${item.video.path}', '${item.video.title}', '${item.sport}', ${item.video.trustScore}, '${item.athleteName}', '${item.athleteId}')"></i>
                <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; color: var(--text-white); font-family: monospace;">
                    <i class="fa-solid fa-shield"></i> AI Trust: ${item.video.trustScore}%
                </div>
                <div style="position: absolute; top: 8px; right: 8px; background: var(--accent-glow); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; color: var(--text-white); font-weight: 700;">
                    ${item.sport}
                </div>
            </div>
            <div style="padding: 0 4px;">
                <h4 style="font-size: 0.95rem; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-white);" title="${item.video.title}">
                    ${item.video.title}
                </h4>
                <div class="user-snippet" style="padding: 0; margin-bottom: 12px; cursor: pointer;" onclick="viewAthleteDossier('${item.athleteId}')">
                    <img src="${item.athleteAvatar}" class="user-avatar" style="width: 28px; height: 28px;">
                    <div class="user-info">
                        <h5 style="font-size: 0.8rem; color: var(--text-gray); font-weight: 600;">${item.athleteName}</h5>
                        <p style="font-size: 0.7rem; color: var(--text-muted);">${item.video.category}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-glow" style="padding: 6px 12px; font-size: 0.75rem; flex-grow: 1;" onclick="openLandingVideoModal('${item.video.path}', '${item.video.title}', '${item.sport}', ${item.video.trustScore}, '${item.athleteName}', '${item.athleteId}')">
                        Play Video <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;" onclick="viewAthleteDossier('${item.athleteId}')">
                        Dossier <i class="fa-solid fa-user"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// OFFICIAL SELECTOR PROFILE VIEW
// ==========================================
function viewCoachProfile(coachId) {
    const coaches = db.getCoaches();
    const coach = coaches.find(c => c.id === coachId);
    if (!coach) return;
    
    switchView('coach-profile');
    
    document.getElementById('coach-profile-name').textContent = coach.name;
    document.getElementById('coach-profile-sport').textContent = `${coach.sportFocus} Focus`;
    document.getElementById('coach-profile-dept').textContent = coach.department;
    document.getElementById('coach-profile-focus').textContent = coach.sportFocus;
    document.getElementById('coach-profile-connections-qty').textContent = `${coach.connections ? coach.connections.length : 0} Connected`;
    
    // Load shortlisted prospects for this coach
    const shortlistContainer = document.getElementById('coach-profile-shortlist-list');
    shortlistContainer.innerHTML = '';
    
    const athletes = db.getAthletes();
    const shortlistedAthletes = athletes.filter(a => coach.shortlist && coach.shortlist.includes(a.id));
    
    if (shortlistedAthletes.length === 0) {
        shortlistContainer.innerHTML = '<p class="text-muted">No athlete prospects shortlisted currently.</p>';
    } else {
        shortlistedAthletes.forEach(ath => {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.innerHTML = `
                <div class="upload-info">
                    <img src="${ath.profileImage}" class="user-avatar" style="width: 40px; height: 40px; margin-right: 12px; border-radius: 50%;">
                    <div class="upload-details">
                        <h5>${ath.name}</h5>
                        <p>${ath.sport} • ${ath.state} • Score: ${ath.performanceScore}%</p>
                    </div>
                </div>
                <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewAthleteDossier('${ath.id}')">Inspect</button>
            `;
            shortlistContainer.appendChild(item);
        });
    }
}

// ==========================================
// INIT APP RUNTIME
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    updateAppLayout();
    loadCommunityFeed();
});
