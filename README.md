# 🌿 PT Nutrition Coaching Website

A full-stack nutrition coaching business website with automated testing suite, demonstrating modern web development and QA automation practices.

![Playwright Tests](https://github.com/preetithakur3128/nutrition-coaching-website/actions/workflows/playwright.yml/badge.svg)

## 🌐 Live Demo

**Website:** [https://stunning-llama-72ce6d.netlify.app](https://stunning-llama-72ce6d.netlify.app)

---

## 📋 Project Overview

This project showcases a complete full-stack application built for a nutrition coaching business, featuring:

- **Frontend:** React-based single-page application
- **Backend:** Supabase REST API
- **Database:** PostgreSQL (via Supabase)
- **Testing:** Comprehensive Playwright test suite
- **CI/CD:** GitHub Actions for automated testing
- **Hosting:** Netlify (frontend)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    (React + Tailwind CSS)                       │
│                                                                 │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│   │   Home   │  │  About   │  │ Services │  │ Contact  │       │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                   │             │
│                                          Form Submit            │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE REST API                          │
│                                                                 │
│   POST /rest/v1/clients  →  Create new client inquiry          │
│   GET  /rest/v1/clients  →  Read client data                   │
│   PATCH /rest/v1/clients →  Update client status               │
│   DELETE /rest/v1/clients → Remove client record               │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                          │
│                                                                 │
│   Table: clients                                                │
│   ├── id (primary key)                                         │
│   ├── name, email, phone                                       │
│   ├── service, current_weight, goal_weight                     │
│   ├── message, status                                          │
│   └── created_at                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Test Suite

### Test Coverage Summary

| Category | Tests | Description |
|----------|-------|-------------|
| **UI Tests** | 13 | Frontend functionality & navigation |
| **Database API Tests** | 10 | CRUD operations on PostgreSQL |
| **API Health Checks** | 5 | Service monitoring & alerting |
| **Total** | **28** | Comprehensive coverage |

### UI Tests (TC01-TC13)

| Test ID | Description |
|---------|-------------|
| TC01 | Homepage loads successfully |
| TC02 | Navigation - All sections accessible |
| TC03 | Contact form - All fields present |
| TC04 | Contact form - Can fill all fields |
| TC05 | Services section - All packages displayed |
| TC06 | Services - Book buttons navigate to contact |
| TC07 | Correct email displayed |
| TC08 | Testimonials - All reviews visible |
| TC09 | Mobile responsive - Page loads on mobile viewport |
| TC10 | Footer - Content verified |
| TC11 | Hero → About → Contact navigation flow |
| TC12 | Page load performance + Header + Logo visibility |
| TC13 | Contact form complete submission flow |

### Database API Tests (DB01-DB10)

| Test ID | Description |
|---------|-------------|
| DB-01 | CREATE - Add new client to database |
| DB-02 | READ - Get all clients from database |
| DB-03 | READ - Get client by email |
| DB-04 | READ - Filter clients by service type |
| DB-05 | UPDATE - Update client status |
| DB-06 | UPDATE - Update client goal weight |
| DB-07 | READ - Verify updates persisted |
| DB-08 | CREATE - Add second client |
| DB-09 | READ - Verify multiple clients exist |
| DB-10 | DELETE - Cleanup test data |

### API Health Check Tests

| Test | Description |
|------|-------------|
| Website Health | Verify Netlify deployment is UP |
| Supabase API Health | Verify database API is responding |
| Health Summary Report | Generate comprehensive status report |
| Slow Response Detection | Alert when API response > 3 seconds |
| Failure Simulation | Test error handling when API is down |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Tailwind CSS** - Styling
- **Babel** - JavaScript compiler

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database
- **REST API** - Data communication

### Testing
- **Playwright** - End-to-end testing framework
- **Screenshot capture** - Visual evidence on all tests
- **Video recording** - Full test execution recording

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Netlify** - Frontend hosting
- **Git** - Version control

---

## 📁 Project Structure

```
nutrition-coaching-website/
├── index.html                      # Main application (React SPA)
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── tests/
│   ├── nutrition-website.spec.js   # UI tests (TC01-TC10)
│   ├── TC11.spec.js                # Navigation flow test
│   ├── TC12.spec.js                # Performance test
│   ├── TC13.spec.js                # Form submission test
│   ├── api-database.spec.js        # Database API tests
│   └── api-health-check.spec.js    # Health monitoring tests
├── test-results/                   # Screenshots & videos
└── playwright-report/              # HTML test reports
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/preetithakur3128/nutrition-coaching-website.git

# Navigate to project
cd nutrition-coaching-website

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/nutrition-website.spec.js

# Run with UI mode (visual)
npx playwright test --ui

# Run with headed browser
npx playwright test --headed

# View test report
npx playwright show-report
```

### Local Development

```bash
# Serve locally
npx http-server -p 8080 -o
```

---

## 📊 Test Reports & Evidence

### Screenshots
All tests capture screenshots automatically:
- **Pass:** Screenshot of final state
- **Fail:** Screenshot at failure point

### Video Recording
Full video recordings available in `test-results/` folder.

### HTML Report
```bash
npx playwright show-report
```

---

## 🔄 CI/CD Pipeline

Tests run automatically on:
- Every push to `main` branch
- Every pull request

**GitHub Actions workflow:**
- Installs dependencies
- Runs all Playwright tests
- Uploads test artifacts (screenshots, videos, reports)

---

## 📈 Key Features Demonstrated

### For QA/Test Engineers
- ✅ Page Object Model ready structure
- ✅ Data-driven test approach
- ✅ API testing with request/response validation
- ✅ Visual regression testing capability
- ✅ Cross-browser testing configuration
- ✅ CI/CD integration

### For Developers
- ✅ Full-stack application architecture
- ✅ REST API integration
- ✅ Database schema design
- ✅ Error handling
- ✅ Form validation

---

## 👩‍💻 Author

**Preeti Thakur**
- Senior Test Engineer with 15+ years of QA experience
- Expertise in Test Automation, API Testing, and CI/CD
- Currently exploring opportunities in Switzerland

---

## 📄 License

This project is for portfolio demonstration purposes.

---

## 🙏 Acknowledgments

- Supabase for backend services
- Netlify for hosting
- Playwright team for the excellent testing framework
