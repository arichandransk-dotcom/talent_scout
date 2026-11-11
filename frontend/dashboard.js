// Athlete Dashboard Logic
const DB_ATHLETES_KEY = 'talent_id_athletes';
const DB_NOTIFICATIONS_KEY = 'talent_id_notifications';

function getCurrentUser() {
    try {
        const user = localStorage.getItem('talent_id_current_user');
        if (user) return JSON.parse(user);
    } catch(e) {}
    
    // Fallback default athlete if not logged in
    return {
        id: 'ath_1',
        name: 'Amit Phogat',
        role: 'athlete'
    };
}

function loadDashboardData() {
    const user = getCurrentUser();
    
    // Get database athletes
    let athletes = [];
    try {
        athletes = JSON.parse(localStorage.getItem(DB_ATHLETES_KEY)) || [];
    } catch(e) {}
    
    const self = athletes.find(a => a.id === user.id) || athletes[0] || user;

    // Sidebar info
    document.getElementById('sidebar-user-name').textContent = self.name;
    document.getElementById('sidebar-user-role').textContent = (user.role || 'athlete').toUpperCase();
    if (self.profileImage) {
        document.getElementById('sidebar-user-avatar').src = self.profileImage;
    }

    // Set Dynamic Profile URLs
    const myProfileLink = document.getElementById('nav-my-profile');
    if (myProfileLink) {
        myProfileLink.href = `profile.html?id=${self.id}`;
    }
    const viewProfileBtn = document.getElementById('dash-view-profile-btn');
    if (viewProfileBtn) {
        viewProfileBtn.href = `profile.html?id=${self.id}`;
    }

    // Stats
    document.getElementById('dashboard-stat-score').textContent = (self.performanceScore || 90) + "%";
    document.getElementById('dashboard-stat-rank').textContent = "#" + (self.aiRank || 5);
    document.getElementById('dashboard-stat-status').textContent = (self.verificationStatus || 'approved').toUpperCase();

    // Biometrics
    document.getElementById('dash-biometric-height').textContent = (self.height || 180) + " cm";
    document.getElementById('dash-biometric-weight').textContent = (self.weight || 70) + " kg";
    document.getElementById('dash-biometric-bmi').textContent = (self.bmi || 21.6) + " (Optimal)";
    document.getElementById('dash-biometric-blood').textContent = self.bloodGroup || "O+";

    // Videos
    const vidsList = document.getElementById('dashboard-videos-list');
    vidsList.innerHTML = '';
    
    if (!self.videos || self.videos.length === 0) {
        vidsList.innerHTML = '<p class="text-muted">No highlight videos uploaded yet. Upload videos on the home page.</p>';
    } else {
        self.videos.forEach(v => {
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
                <span style="font-size: 0.75rem; color: var(--neon-blue);"><i class="fa-solid fa-circle-check"></i> Scanned</span>
            `;
            vidsList.appendChild(item);
        });
    }

    // Notifications indicator check
    try {
        const notifications = JSON.parse(localStorage.getItem(DB_NOTIFICATIONS_KEY)) || [];
        const selfNotifs = notifications.filter(n => n.recipientId === self.id);
        const alertIndicator = document.getElementById('alert-indicator');
        if (selfNotifs.length > 0) {
            alertIndicator.style.display = 'block';
        } else {
            alertIndicator.style.display = 'none';
        }
    } catch(e) {}
}

function logoutUser() {
    localStorage.removeItem('talent_id_current_user');
    window.location.href = 'index.html';
}

function showNotifications() {
    const user = getCurrentUser();
    const overlay = document.getElementById('notifications-overlay');
    overlay.style.display = 'block';
    
    const list = document.getElementById('notifications-panel-list');
    list.innerHTML = '';
    
    let notifications = [];
    try {
        notifications = JSON.parse(localStorage.getItem(DB_NOTIFICATIONS_KEY)) || [];
    } catch(e) {}
    
    const selfNotifs = notifications.filter(n => n.recipientId === user.id);
    
    if (selfNotifs.length === 0) {
        list.innerHTML = '<p class="text-muted" style="text-align: center; margin-top: 30px;">No new alerts.</p>';
        return;
    }
    
    selfNotifs.forEach(n => {
        const item = document.createElement('div');
        item.className = 'glass-card';
        item.style.padding = '16px';
        item.style.borderColor = 'var(--neon-purple)';
        item.style.marginBottom = '12px';
        
        item.innerHTML = `
            <div style="font-weight: 700; color: var(--neon-blue); margin-bottom: 8px;">${n.title}</div>
            <p style="font-size: 0.85rem; line-height: 1.5; margin-bottom: 8px; color: var(--text-gray);">${n.message}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: right;">${new Date(n.date).toLocaleDateString()}</div>
        `;
        list.appendChild(item);
    });
}

function closeNotifications() {
    document.getElementById('notifications-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});
