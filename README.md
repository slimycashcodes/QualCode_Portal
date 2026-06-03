# 🧠 Self Talk Psychologist Portal — Resource Registry

Welcome to the **Self Talk Psychologist Portal**! This is a production-grade web application engineered for institutional behavioral health administrators and clinical teams. The system acts as a unified digital workspace to serialize, audit, map, and dispatch verified care toolkits, workshops, and mindfulness resources (e.g., *Mind Matters™* and *WorkWell™* frameworks).

The architecture features a completely decoupled, high-performance enterprise tech stack:

- **Frontend Matrix:** Responsive React 18 single-page application crafted using ****IBM** Carbon Design System v11**, Vite, Formik, and Axios.
- **Backend Core:** Reactive **REST** **API** engine built on **Spring Boot 3** (Java 17+), leveraging Spring Data MongoDB for lightning-fast document query handling and custom validation processing.

---

## 🏗️ System Architecture Overview

Data moves securely across your network runtime layers through the following user-space flows:

1. **Public/Landing Space (`/`)**: A high-fidelity, fluid hero layout featuring dark blurred background textures, corporate copy alignments, and bottom product category tab pillars matching professional modern design specifications.
2. **Authorization Gate (`/login`)**: Built-in simulated Role-Based Access Control (**RBAC**). Submitting system credentials flags session states to toggle structural dashboard elements dynamically.
3. **The Registry Dashboard (`/dashboard`)**: Displays active workspace data lists utilizing complex custom MongoDB query operators, complete with interactive expandable summary drawers and a slide-out inspect panel tracking clinical tags.

---

## 🗄️ Repository Directory Layout

Ensure your root repository layout matches this structure perfectly before executing setup targets:

```text
📁 self-talk-portal/
├── 📁 backend/                       # Spring Boot 3 Engine Root
│   ├── 📁 src/
│   │   ├── 📁 main/
│   │   │   ├── 📁 java/com/example/modulesbackend/
│   │   │   │   ├── 📁 config/        # Interceptor Registration & **CORS** Configurations
│   │   │   │   ├── 📁 controller/    # **REST** **API** endpoints & Auth Interceptors
│   │   │   │   ├── 📁 dto/           # Data Transfer Objects (Request/Response schemas)
│   │   │   │   ├── 📁 entity/        # MongoDB Document Models & Lifecycle Enums
│   │   │   │   ├── 📁 exception/     # Global Resource handling infrastructure
│   │   │   │   └── 📁 service/       # Business Execution Core & Model Mapping
│   │   │   └── 📁 resources/
│   │   │       └── application.properties
│   └── pom.xml
└── 📁 modules-frontend/              # React + Carbon UI App Root
    ├── 📁 public/                    # Static core resources
    ├── 📁 src/
    │   ├── 📁 components/            # Layout wraps, Filter panels & Inspect drawers
    │   ├── 📁 pages/                 # Welcome Landing, Login entry, and Module list grids
    │   ├── 📁 services/              # Axios **API** clients & Auth context engines
    │   ├── App.jsx                   # Central Application routing maps
    │   ├── index.scss                # Global Carbon theme compilation point
    │   └── main.jsx                  # React **DOM** mount runtime bootstrapper
    ├── package.json
    └── vite.config.js

```

---
### Phase 1: Backend Deployment (Spring Boot & MongoDB)

### Prerequisite Checklist

- **Java Development Kit (**JDK**):** Version 17 or higher installed (`java -version`).
- **Apache Maven:** Version 3.8+ installed (`mvn -v`).
- **MongoDB Community Server:** Running locally on default port `**27017**`.

### 1. Database Configuration & Verification

Ensure your local MongoDB instance is active. Open your shell or MongoDB Compass and connect to:

```
text mongodb://localhost:**27017**/modules_db
```

### 2. Configure Environment Properties

Navigate to `backend/src/main/resources/application.properties` and verify your profile configuration strings match exactly:

```
spring.application.name=modules-backend server.port=**8080**

# Database Configuration Connection Paths

spring.data.mongodb.uri=mongodb://localhost:**27017**/modules_db

# Logging adjustments for cleaner stack traces

logging.level.org.springframework.data.mongodb=**DEBUG**
```

### 3. Compilation and Execution

Open a terminal inside your `backend/` folder and execute the clean compilation cycles to drop target caches and boot the embedded Tomcat engine:

```
# Clean historical maven target classes and compile components mvn clean compile

# Boot up the Spring Boot server environment

mvn spring-boot:run
```

The console will print compilation details and finish with a success initialization marker: `**INFO**  --- [main] c.e.m.ModulesBackendApplication : Started ModulesBackendApplication in X.XX seconds`

### 4. Seed Production-Grade Evaluation Mock Data

To populate the tabbed dashboard with realistic items that map directly to the advanced filter controls, execute this initialization script inside your MongoDB shell client (`mongosh`):

```
use modules_db;
db.modules.drop();

db.modules.insertMany([
  {
    "name": "Anti Bullying Methods",
    "description": "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth, positive behavioral reinforcement, and creating peer support systems.",
    "serviceComponent": "Workshop",
    "programName": "Mind Matters Jr.",
    "category": "CBSE",
    "targetGroup": "12th Grade",
    "tags": ["Maharishi Chetpet", "Anti-Bullying", "Campus-Safety"],
    "collaborators": ["Saranya Loganathan"],
    "status": "APPROVED",
    "createdOn": ISODate(),
    "updatedOn": ISODate()
  },
  {
    "name": "Handling Depression in Minors",
    "description": "Clinical intervention pathways, coping templates, and baseline identification strategies mapped to early childhood classroom stress and academic anxiety indicators.",
    "serviceComponent": "Counseling Program",
    "programName": "Individual Intake Pathway",
    "category": "Clinical Intervention",
    "targetGroup": "11th Grade",
    "tags": ["Mental-Health", "Coping-Skills", "Intervention"],
    "collaborators": ["Rashika Jeyakumar"],
    "status": "PENDING_REVIEW",
    "createdOn": ISODate(),
    "updatedOn": ISODate()
  },
  {
    "name": "Anxiety & Mindfulness Guide",
    "description": "Self-guided interactive workbook featuring breathing rhythm patterns, muscle relaxation logs, and thought-reframing spaces for high school stress mitigation.",
    "serviceComponent": "Educational Content",
    "programName": "Self-Guided Toolkits",
    "category": "Anxiety Grounding",
    "targetGroup": "12th Grade",
    "tags": ["Mindfulness", "Anxiety", "Self-Care"],
    "collaborators": ["Tooba Farheen"],
    "status": "REQUESTED_CHANGE",
    "createdOn": ISODate(),
    "updatedOn": ISODate()
  }
]);
```

---


### Phase 2: Frontend Setup (React & Carbon Design)

### Prerequisite Checklist

- **Node.js:** **LTS** version installed (`node -v`, version 18+ or 20+ recommended).
- **npm:** Comes pre-packaged with Node (`npm -v`).

### 1. Workspace Navigation

Open a new terminal window in VS Code and change directory into your nested frontend folder. **This is critical** because executing setup parameters from the repository root will bypass local configuration records:

```
bash cd modules-frontend
```

### 2. Dependency Resolution

Pull the Carbon v11 components, core **SASS** engines, layout asset icons, and form validation dependencies directly into your workspace node layer:

```
bash npm install
```

### 3. Execution of Client Application Development Server

Launch Vite's internal compilation module server with a force-clear parameter. This bypasses Vite dependency caching tricks and ensures all Carbon vector icons render accurately without build conflicts:

```
bash npm run dev -- --force
```

Vite will spin up your client workspace and expose the tracking local port:

```
**VITE** v5.x.x  ready in xxx ms

    ➜  Local:   [http://localhost:**5173**/](http://localhost:**5173**/)
    ➜  Network: use --host to expose
```

---


## 🔑 Operational Testing & Sign-In Guide

Once both applications are active, navigate your web browser to `[http://localhost:**5173**/`.](http://localhost:**5173**/`.)

1. **Welcome Interface:** Explore the realistic marketing landing grid. Click on **Portal Login** or **Try the Zen Pilot Program** to approach the secure workspace gate.
2. **Login Credentials Panel:** Enter one of the simulated enterprise authorization profile key matrices:
- **To Review Administrative Dashboard (Review Queue - Admin View):**
- **User ID:** `admin`
- **Password:** `admin123`

- **To Review Contributor Dashboard (Review Queue View):**
- **User ID:** `user`
- **Password:** `user123`

3. **Data Workspace Interaction:** Toggle between tabular switcher states (`Pending`, `Approved`, `Needs Changes`) to filter lists dynamically. Click a **Program Title** to slide open the right details inspector, or click the **Chevron Arrows** to expand inline summaries.

---

## 🛠️ Diagnostics Troubleshooting Matrix

- **Issue: The Dashboard table renders completely empty after passing login inputs.**
- *Fix:* Open your browser developer options (`**F12**` ➜ `Network` tab). Ensure that the outbound payload requests to `[http://localhost:**8080**/api/modules`](http://localhost:**8080**/api/modules`) are not encountering network dropouts. Verify your Spring Boot server and local MongoDB daemon service are running.

- **Issue: Components crash at runtime referencing an `undefined` variable tag.**
- *Fix:* Verify that no obsolete icon strings (like `MisuseFilled`) are present inside `ModuleList.jsx`. Use explicit Carbon components such as `WarningFilled`, `CheckmarkFilled`, or `ErrorFilled`.

- **Issue: Typography or theme layout parameters appear distorted.**
- *Fix:* Verify that `@use '@carbon/react';` is correctly compiled at line 1 of `src/index.scss`, and check that your `vite.config.js` has appropriate preprocessor **CSS** mapping rules.
