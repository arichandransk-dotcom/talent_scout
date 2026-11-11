# Talent Identifier - Smart Digital Sports Recruitment Platform

Talent Identifier is a modern, responsive, and secure digital trials and athletic profiling portal designed to support national/state sports selections. The platform enables athletes to upload performance logs and video recordings directly, and allows official coaches/selectors to filter, review AI biomechanics, and invite players to official trial camps.

---

## ⚡ Quick Preview (No Setup Required)

To experience the platform immediately:
1. Navigate to the `frontend/` directory.
2. Double-click and open [frontend/index.html](file:///c:/talent_scout/frontend/index.html) in any web browser.

> [!NOTE]
> The client app detects when running standalone and automatically activates **Local Storage Mock Database Mode**. All actions (registration, video upload, verification workflows, pose overlays, invitations, and PDF exports) will function instantly using local browser states.

---

## 🛠️ Full-Stack Deployment Setup

To deploy the full Node.js, Express, and MongoDB backend:

### 1. Prerequisites
- **Node.js** (v16.0.0 or higher)
- **MongoDB** (Running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI)

### 2. Backend Config
Rename `.env.example` in the `backend/` folder to `.env` and configure your environment variables:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/talent_identifier
JWT_SECRET=super_secure_national_sports_portal_key_2026
UPLOAD_DIR=uploads/
```

### 3. Installation & Run
From your terminal, navigate to the `backend/` folder:
```bash
# Install dependencies
npm install

# Start production server
npm start

# Run in hot-reload developer mode
npm run dev
```

The unified platform will run on: **`http://localhost:5000`** (serving both API endpoints and the static frontend client).

---

## 🔑 Demo Authorization Accounts

You can log in directly using the credentials below to inspect various selection panels:

| Panel Role | Login Email / ID | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Athlete** | `athlete@gmail.com` | *Any* | Upload highlights, view biometrics, download invites |
| **Official Selector / Coach** | `coach@sports.gov` | *Any* | Shortlist profiles, inspect dossier, send invites |
| **System Auditor (Admin)** | `admin@sports.gov` | *Any* | Verify certificates, inspect state density heatmap |

---

## 🚀 Advanced Platform Features Included

1. **AI Biomechanical Pose overlay**: When previewing uploads, a dynamic coordinate canvas mapping calculates joints angle rotation (Spine angle alignment, Knee extensions) to track movement efficiency.
2. **Dynamic Radar charts**: Visualizes skill indexes based on selected sport categories (Speed, Agility, Stamina, Strength, Skill).
3. **Geographical Density Map**: Allows administrators to inspect density charts outlining where top athletic prospects are located.
4. **Official trials Invitation System**: Coaches can issue invitations which instantly deliver notification alerts to athletes.
5. **Print-to-PDF Resume**: Formats the physical, medical, and certification logs into a printable dossier.
