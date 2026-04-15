# ParentShield REST API (Laravel)

Backend terpisah untuk migrasi Snailly Desktop menjadi web app + REST API.

## Stack

- Laravel 12
- Laravel Sanctum (token auth)
- MySQL (XAMPP)
- Proxy daemon terpisah (Python, folder `proxy-service`)

## Struktur Endpoint Inti

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Profile

- `PUT /api/profile/{id}`

### Child

- `GET /api/child`
- `POST /api/child`
- `GET /api/child/{id}`
- `PUT /api/child/{id}`
- `DELETE /api/child/{id}`

### Dangerous Website

- `GET /api/classified-url/dangerous-website`
- `GET /api/classified-url/dangerous-website/{userId}`

### Log Activity

- `POST /api/log`
- `GET /api/log/{childId}` (`childId` bisa `ALL`)
- `PUT /api/log/grant-access/{logId}`
- `GET /api/log/summary/{childId}`
- `GET /api/log/statistic-year/{childId}?year=2026`
- `GET /api/log/statistic-month/{childId}?date=2026-04`

## Setup XAMPP

1. Start Apache dan MySQL dari XAMPP Control Panel.
2. Buat database MySQL:

```sql
CREATE DATABASE parentshield_db;
```

3. Konfigurasi `.env` (sudah diset default MySQL lokal):

- `DB_CONNECTION=mysql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_DATABASE=parentshield_db`
- `DB_USERNAME=root`
- `DB_PASSWORD=`

4. Jalankan migrasi:

```bash
php artisan migrate
```

5. Jalankan server API:

```bash
php artisan serve --port=8000
```

## CORS Frontend Lokal

CORS sudah dikonfigurasi untuk origin lokal umum:

- `http://localhost:3000`
- `http://localhost:5173`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

`FRONTEND_URL` dapat diubah di `.env`.

## Proxy Service

Lihat panduan di `proxy-service/README.md`.

Proxy service bertugas:

- Ambil list dangerous website dari API Laravel
- Intercept request browsing
- Kirim log aktivitas ke endpoint `POST /api/log`

## Web Frontend (React)

Frontend web ada di folder `web`.

1. Salin env frontend:

```bash
cd web
copy .env.example .env
```

2. Jalankan mode development:

```bash
npm install
npm run dev
```

3. Build production:

```bash
npm run build
```

Catatan:

- Default API base URL frontend: `http://localhost:8000/api`
- Akun seed default backend: `devhackfest@gmail.com` / `password`
