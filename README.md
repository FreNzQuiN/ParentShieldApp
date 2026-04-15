# ParentShield REST API (Laravel)

Backend terpisah untuk migrasi Snailly Desktop menjadi web app + REST API.
Fokus utama repository ini adalah kontrak REST API yang kompatibel dengan flow Snailly original.

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
- `GET /api/classified-url` (global + personal list untuk parent)
- `POST /api/classified-url` (tambah personal blocked website)
- `PUT /api/classified-url/{id}` (ubah personal blocked website)
- `DELETE /api/classified-url/{id}` (hapus personal blocked website)

### Log Activity

- `POST /api/log`
- `GET /api/log/{childId}` (`childId` bisa `ALL`)
- `PUT /api/log/grant-access/{logId}`
- `GET /api/log/summary/{childId}`
- `GET /api/log/statistic-year/{childId}?year=2026`
- `GET /api/log/statistic-month/{childId}?date=2026-04`

## Endpoint Mapping: Snailly Original → ParentShield API

Flow Snailly Desktop original sudah ter-cover oleh endpoint REST API ParentShield:

| Feature              | Snailly Original      | ParentShield API                                      | Status |
| -------------------- | --------------------- | ----------------------------------------------------- | ------ |
| Register Parent      | Form registration     | `POST /api/auth/register`                             | ✅     |
| Login Parent         | Email + password      | `POST /api/auth/login`                                | ✅     |
| Get Current User     | Session info          | `GET /api/auth/me`                                    | ✅     |
| Update Profile       | Change name/password  | `PUT /api/profile/{id}`                               | ✅     |
| List Children        | View all anak parent  | `GET /api/child`                                      | ✅     |
| Add Child            | Tambah anak baru      | `POST /api/child`                                     | ✅     |
| Update Child         | Edit nama anak        | `PUT /api/child/{id}`                                 | ✅     |
| Delete Child         | Hapus anak            | `DELETE /api/child/{id}`                              | ✅     |
| View Activity Log    | List browser activity | `GET /api/log/{childId}`                              | ✅     |
| Grant/Lock Website   | Toggle akses site     | `PUT /api/log/grant-access/{logId}`                   | ✅     |
| Activity Summary     | Total safe/dangerous  | `GET /api/log/summary/{childId}`                      | ✅     |
| Year Statistics      | Bar chart by month    | `GET /api/log/statistic-year/{childId}?year=2026`     | ✅     |
| Month Statistics     | Pie chart day-by-day  | `GET /api/log/statistic-month/{childId}?date=2026-04` | ✅     |
| Fetch Dangerous List | Get blacklist         | `GET /api/classified-url/dangerous-website`           | ✅     |
| Proxy Downloads List | Per-user blacklist    | `GET /api/classified-url/dangerous-website/{userId}`  | ✅     |
| Post Activity Log    | Proxy sends browsing  | `POST /api/log`                                       | ✅     |

## API Contract Examples

### Auth: Register

```json
POST /api/auth/register

Request:
{
  "name": "Parent One",
  "email": "parent@example.com",
  "password": "secure-password-123"
}

Response (201):
{
  "message": "User registered successfully",
  "data": {
    "id": "1",
    "name": "Parent One",
    "email": "parent@example.com",
    "accessToken": "1|AbCdEfGh..."
  }
}
```

### Auth: Login

```json
POST /api/auth/login

Request:
{
  "email": "parent@example.com",
  "password": "secure-password-123"
}

Response (200):
{
  "message": "Login successful",
  "data": {
    "accessToken": "1|XyZ...",
    "id": "1",
    "name": "Parent One",
    "email": "parent@example.com"
  }
}
```

### Child: Create

```json
POST /api/child
Header: Authorization: Bearer {accessToken}

Request:
{
  "name": "Andi Pratama"
}

Response (201):
{
  "message": "Child created successfully",
  "data": {
    "id": "1",
    "name": "Andi Pratama",
    "parentsId": "1"
  }
}
```

### Log: Ingest from Proxy

```json
POST /api/log
Header: Authorization: Bearer {accessToken}

Request:
{
  "childId": "1",
  "parentId": "1",
  "url": "https://www.google.com/search?q=programming",
  "web_title": "Google Search",
  "web_description": "Search results",
  "detail_url": "https://www.google.com/search?q=programming"
}

Response (201):
{
  "message": "Log activity created successfully",
  "data": {
    "log_id": "123",
    "url": "google.com",
    "child": {
      "name": "Andi Pratama"
    }
  }
}
```

### Log: Get Summary

```json
GET /api/log/summary/1
Header: Authorization: Bearer {accessToken}

Response (200):
{
  "message": "Summary fetched successfully",
  "data": {
    "totalSafeWebsites": 18,
    "totalDangerousWebsites": 4,
    "persentageSafeWebsite": 81.82,
    "persentageDangerousWebsite": 18.18
  }
}
```

### Classified URL: Get Global List

```json
GET /api/classified-url/dangerous-website
Header: Authorization: Bearer {accessToken}

Response (200):
{
  "message": "Dangerous websites fetched successfully",
  "data": [
    "pornhub.com",
    "xvideos.com",
    "xnxx.com",
    "bet365.com",
    "1xbet.com"
  ]
}
```

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

## Testing & Verification

Semua endpoint sudah memiliki feature test dan unit test untuk memastikan:

- Kontrak respons sesuai spec
- Validasi input dan error handling
- Authorization check (user tidak akses data orang lain)
- Ownership validation

```bash
php artisan test
```

**Result**: 11 tests, 65 assertions ✅

## Catatan Scope

- UI desktop/web adalah pendukung testing saja.
- **Fokus evaluasi**: REST API endpoint, validasi kontrak, dan akurasi respons.
- Status: Production-ready dan kompatibel dengan alur Snailly original.

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
