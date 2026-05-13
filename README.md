# 🛡️ ParentShield App

ParentShield is a comprehensive parental control application that combines a web-based management dashboard with a local Windows service to monitor, classify, and control browser traffic for children.

## 📖 Overview

ParentShield operates in a two-part ecosystem:
1. **Web Application (Laravel + React):** A dashboard where parents can log in, manage child profiles, review traffic logs, view statistics, and manually override traffic rules (Lock/Unlock).
2. **Windows Service (Local):** A background service that intercepts web requests on the target machine, checks them against the ParentShield rules, redirects dangerous traffic, and reports events back to the web dashboard.

## ✨ Key Features

* **Child Profile Management:** Create and switch between specific child profiles to segment traffic logs and rules.
* **Traffic Monitoring & Classification:** Automatically classifies websites as `safe`, `dangerous`, or `unknown`.
* **Manual Override:** Parents can review logs and manually lock (block) or unlock (allow) specific URLs.
* **Interactive Dashboard:** View monthly and yearly statistics and visualize safe vs. dangerous content ratios using Recharts.
* **API-First Design:** Fully decoupled REST API authenticated via Laravel Sanctum.

## 🛠️ Tech Stack

**Backend:**
* [Laravel 12](https://laravel.com/) (PHP 8.2+)
* Laravel Sanctum (API Authentication)

**Frontend:**
* [React 19](https://react.dev/)
* [Vite 6](https://vitejs.dev/)
* [Tailwind CSS v4](https://tailwindcss.com/)
* [Zustand](https://zustand-demo.pmnd.rs/) (State Management)
* [Material-UI (MUI)](https://mui.com/) & Emotion
* [Recharts](https://recharts.org/) (Data Visualization)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
* PHP >= 8.2
* Composer
* Node.js & npm
* MySQL / SQLite (or your preferred database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/ParentShieldApp.git](https://github.com/yourusername/ParentShieldApp.git)
   cd ParentShieldApp

```

2. **Install PHP Dependencies:**
composer install

```


3. **Install JavaScript/React Dependencies:**
```bash
npm install

```


4. **Environment Setup:**
Copy the example environment file and generate a new application key.
```bash
cp .env.example .env
php artisan key:generate

```


*Note: Don't forget to configure your `DB_` database credentials inside the `.env` file.*
5. **Database Migration & Seeding:**
Run the migrations to create the required tables (Users, Children, Logs, DangerousWebsites).
```bash
php artisan migrate:fresh --seed

```


6. **Run the Application:**
Start the Laravel development server and Vite for frontend Hot-Module Replacement (HMR).
```bash
# Terminal 1 (Run Laravel Server)
php artisan serve

# Terminal 2 (Run Vite)
npm run dev

```


Visit `http://localhost:8000` in your browser.

## 🏗️ Architecture & Data Flow

```text
Windows Machine
  -> Windows Service
      -> Intercept requests
      -> Decide redirect or allow
      -> Send traffic event to Laravel API

Laravel API
  -> Validate request
  -> Match child profile
  -> Classify URL status
  -> Store log
  -> Expose dashboard data

React Dashboard
  -> Parent login
  -> Select active child profile
  -> Show logs, charts, and status
  -> Allow manual lock/unlock decisions

```

## 📡 REST API Endpoints

The core functionalities are exposed via the following endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Parent login |
| `POST` | `/api/auth/logout` | Parent logout |
| `GET` | `/api/auth/me` | Get current parent session |
| `GET` | `/api/child` | List child profiles |
| `POST` | `/api/child` | Create child profile |
| `PUT` | `/api/child/{id}` | Update child profile |
| `DELETE` | `/api/child/{id}` | Delete child profile |
| `GET` | `/api/log/{childId}` | List logs for one child or `ALL` |
| `GET` | `/api/log/summary/{childId}` | Summary for one child or `ALL` |
| `POST` | `/api/log` | Service sends captured request |
| `PUT` | `/api/log/grant-access/{logId}` | Parent locks or unlocks a URL |

## 🔒 Security & Service Guidelines

* **Separation of Concerns:** The React app handles the UI, Laravel handles the rules and data, and the Windows service exclusively handles network interception.
* **Administrator Rights:** The Windows service requires admin privileges to safely modify and restore proxy settings.
* **Profile Logic:** Child profiles are *not* separate authentication entities. They act as data partitions to help parents filter rules and logs effectively.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
