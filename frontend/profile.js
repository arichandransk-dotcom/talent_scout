// Athlete Dossier Profile Details Page Logic
const DB_ATHLETES_KEY = 'talent_id_athletes';
const DB_LOGS_KEY = 'talent_id_logs';

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

const db = {
    getLogs: () => {
        try {
            const data = localStorage.getItem(DB_LOGS_KEY);
            return JSON.parse(data) || [];
        } catch (e) {
            return [];
        }
    },
    saveLogs: (data) => {
        try { localStorage.setItem(DB_LOGS_KEY, JSON.stringify(data)); } catch (e) {}
    },
    addLog: (msg) => {
        const logs = db.getLogs();
        logs.unshift({ time: new Date().toISOString(), event: msg });
        db.saveLogs(logs);
    }
};

function triggerToast(message, type = 'info') {
    const bin = document.getElementById('toast-bin');
    if (!bin) return;
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

function downloadMockCert(event, name) {
    event.preventDefault();
    db.addLog(`Downloaded verification certificate: ${name}`);
    triggerToast(`Opening ${name}... (Verification simulation)`, "success");
}

function getCurrentUser() {
    try {
        const user = localStorage.getItem('talent_id_current_user');
        if (user) return JSON.parse(user);
    } catch(e) {}
    return { id: 'ath_1', name: 'Amit Phogat', role: 'athlete' };
}

function getAthletes() {
    try {
        const data = localStorage.getItem(DB_ATHLETES_KEY);
        if (!data || data === "undefined" || JSON.parse(data).length === 0) {
            localStorage.setItem(DB_ATHLETES_KEY, JSON.stringify(DEFAULT_ATHLETES));
            return DEFAULT_ATHLETES;
        }
        return JSON.parse(data);
    } catch(e) {
        return DEFAULT_ATHLETES;
    }
}

function loadSidebarInfo() {
    const user = getCurrentUser();
    const athletes = getAthletes();
    const self = athletes.find(a => a.id === user.id) || athletes[0] || user;
    
    document.getElementById('sidebar-user-name').textContent = self.name;
    document.getElementById('sidebar-user-role').textContent = (user.role || 'athlete').toUpperCase();
    if (self.profileImage) {
        document.getElementById('sidebar-user-avatar').src = self.profileImage;
    }
    
    // Set Dynamic Profile URL
    const myProfileLink = document.getElementById('nav-my-profile');
    if (myProfileLink) {
        myProfileLink.href = `profile.html?id=${self.id}`;
        
        const urlParams = new URLSearchParams(window.location.search);
        const athleteId = urlParams.get('id') || 'ath_1';
        if (athleteId === self.id) {
            myProfileLink.classList.add('active');
            const allAthletesLink = document.querySelector('.sidebar-menu li:nth-child(2) a');
            if (allAthletesLink) {
                allAthletesLink.classList.remove('active');
            }
        }
    }
}

function loadAthleteProfileDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id') || 'ath_1';
    
    const athletes = getAthletes();
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete) return;
    
    document.getElementById('profile-detail-avatar').src = athlete.profileImage;
    document.getElementById('profile-detail-name').textContent = athlete.name;
    document.getElementById('profile-detail-sport').textContent = athlete.sport + " Focus";
    
    const badge = document.getElementById('profile-detail-badge');
    badge.textContent = (athlete.verificationStatus || 'approved').toUpperCase();
    badge.className = `verified-badge ${athlete.verificationStatus || 'approved'}`;
    
    document.getElementById('profile-detail-age').textContent = athlete.age + " Years";
    document.getElementById('profile-detail-national-id').textContent = athlete.nationalId;
    document.getElementById('profile-detail-state').textContent = athlete.state;
    document.getElementById('profile-detail-district').textContent = athlete.district;
    
    document.getElementById('profile-detail-height-weight').textContent = `${athlete.height} cm / ${athlete.weight} kg`;
    document.getElementById('profile-detail-bmi').textContent = athlete.bmi;
    document.getElementById('profile-detail-blood').textContent = athlete.bloodGroup;
    
    // Achievements Timeline
    const timeline = document.getElementById('profile-detail-achievements');
    timeline.innerHTML = '';
    
    if (!athlete.achievements || athlete.achievements.length === 0) {
        timeline.innerHTML = '<p class="text-muted">No achievements registered.</p>';
    } else {
        athlete.achievements.forEach(ach => {
            const item = document.createElement('div');
            item.className = 'achievement-timeline-item';
            item.style.padding = '12px';
            item.style.borderLeft = '2px solid var(--neon-purple)';
            item.style.marginBottom = '10px';
            item.style.paddingLeft = '15px';
            item.style.background = 'rgba(255,255,255,0.02)';
            item.innerHTML = `
                <div style="font-size: 0.75rem; color: var(--neon-purple); font-weight: 700; font-family: monospace;">${ach.year}</div>
                <h5 style="margin: 4px 0; color: var(--text-white); font-size: 0.9rem;">${ach.title}</h5>
                <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">${ach.detail}</p>
            `;
            timeline.appendChild(item);
        });
    }

    // Certificates
    const certsList = document.getElementById('profile-detail-certificates');
    if (certsList) {
        certsList.innerHTML = '';
        if (!athlete.certificates || athlete.certificates.length === 0) {
            certsList.innerHTML = '<p class="text-muted">No certificate uploads found.</p>';
        } else {
            athlete.certificates.forEach(c => {
                const item = document.createElement('div');
                item.className = 'certificate-item';
                item.style.marginBottom = '10px';
                item.innerHTML = `
                    <span>
                        <i class="fa-solid fa-file-pdf" style="color: #ff1744; margin-right: 8px;"></i> ${c.name} 
                        <span class="ai-trust-badge" style="margin-top: 0; padding: 2px 6px; font-size: 0.7rem; background: rgba(0, 240, 255, 0.1); color: var(--neon-blue); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 4px; margin-left: 8px;"><i class="fa-solid fa-shield"></i> Trust: ${c.trustScore}%</span>
                    </span>
                    <a href="#" class="table-doc-link" style="color: var(--neon-blue); text-decoration: none;" onclick="downloadMockCert(event, '${c.name}')"><i class="fa-solid fa-download"></i> View Proof</a>
                `;
                certsList.appendChild(item);
            });
        }
    }

    // Videos
    const videosList = document.getElementById('profile-detail-videos');
    videosList.innerHTML = '';
    
    if (!athlete.videos || athlete.videos.length === 0) {
        videosList.innerHTML = '<p class="text-muted">No performance videos uploaded yet.</p>';
    } else {
        athlete.videos.forEach(v => {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.style.padding = '12px';
            item.style.border = '1px solid var(--card-border)';
            item.style.borderRadius = '8px';
            item.style.marginBottom = '10px';
            item.style.background = 'rgba(255,255,255,0.02)';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.innerHTML = `
                <div>
                    <h5 style="margin: 0 0 4px 0; color: var(--text-white);">${v.title}</h5>
                    <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">${v.category} • Trust: ${v.trustScore}%</p>
                </div>
                <button class="btn-glow" style="padding: 6px 12px; font-size: 0.75rem;" onclick="playAthleteVideo('${athlete.id}', '${v.id}')">
                    Play Video <i class="fa-solid fa-play"></i>
                </button>
            `;
            videosList.appendChild(item);
        });
    }
    
    // Draw Radar Chart
    setTimeout(() => {
        drawRadarChart('profile-radar-chart', athlete.skills || { speed: 80, stamina: 80, agility: 80, strength: 80, skill: 80, flexibility: 80 });
    }, 50);
}

function drawRadarChart(canvasId, skills) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 220;
    const h = canvas.height = 220;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 70;
    
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
    
    ctx.font = '8px Inter';
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
        
        const xText = cx + (radius + 15) * Math.cos(angle);
        const yText = cy + (radius + 12) * Math.sin(angle);
        const labelName = keys[i].toUpperCase();
        ctx.fillText(`${labelName}`, xText, yText);
    }
    
    ctx.strokeStyle = '#ccff00';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 85, 0, 0.35)';
    
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
}

// Modal video player variables
let modalPoseAnimationId = null;

function playAthleteVideo(athleteId, videoId) {
    const athletes = getAthletes();
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete) return;
    
    const video = athlete.videos.find(v => v.id === videoId);
    if (!video) return;
    
    const modal = document.getElementById('landing-video-modal');
    const player = document.getElementById('modal-video-player');
    const modalTitle = document.getElementById('modal-video-title');
    const modalSport = document.getElementById('modal-video-sport');
    const modalBadge = document.getElementById('modal-video-badge');
    const modalDetail = document.getElementById('modal-video-detail');
    const modalCanvas = document.getElementById('modal-pose-canvas');
    const modalPanel = document.getElementById('modal-pose-panel');

    modal.style.display = 'flex';
    player.src = video.path;
    player.play();

    modalTitle.textContent = `${athlete.name} - ${video.title}`;
    modalSport.textContent = athlete.sport;
    modalBadge.innerHTML = `<i class="fa-solid fa-shield"></i> Trust: ${video.trustScore}%`;
    modalDetail.textContent = `Kinematics joint map coordinate overlays. AI Verification Confidence: ${video.trustScore}%.`;

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
        
        // Coords
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

function logoutUser() {
    localStorage.removeItem('talent_id_current_user');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    loadSidebarInfo();
    loadAthleteProfileDetails();
});
