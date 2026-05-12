# ParentShield GuideBook

## 1. Purpose

ParentShield is a parent control application built from two parts:

- a Laravel + React web app for parent management, monitoring, and configuration
- a separate Windows service for traffic blocking and redirect

The goal is not only to show logs, but to make the browser traffic control system work as a complete flow:

1. parent logs in
2. parent chooses a child profile
3. service monitors traffic from the Windows machine
4. service sends network events to the web app
5. web app stores, classifies, and displays logs
6. parent can mark a log as locked or unlocked
7. service uses that decision to redirect or allow future access

The system should feel like one product even though the runtime is split between the web app and the Windows service.

## 2. Core Idea

The application has two main responsibilities:

### Monitor

The monitor layer receives requests from the service and turns each visited URL into a log record.

Expected behavior:

- if a URL has never been seen before, store it as `unknown` by default
- if the URL is recognized as safe, store it as `unlock` or `allowed`
- if the URL is recognized as dangerous, store it as `lock` or `blocked`
- the parent can later change the decision manually
- the stored decision becomes part of the child profile history

### Blocking and Redirect

The blocking layer belongs to the Windows service.

Expected behavior:

- the service intercepts browser requests on the Windows machine
- if a request is dangerous, the service redirects the browser to a block page or approved redirect page
- if a request is safe, the service allows it to continue
- if a request is unknown, the service should still report it to the web app and store it with default status
- the service should be able to start once at startup and stop once when needed
- when stopped, Windows proxy settings must be restored safely

## 3. High-Level Architecture

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

### Main Components

- **Web UI**: parent dashboard and settings
- **REST API**: authentication, child profile management, log storage, statistics
- **Windows Service**: request interception, redirect, proxy control, and traffic monitoring
- **Database**: parent users, child profiles, dangerous websites, logs

## 4. Roles and Scope

### Parent

The parent is the only user who logs in to the web app.

Parent capabilities:

- login to the web app
- create, edit, and delete child profiles
- choose the active child profile for monitoring
- view logs and statistics for all children or one selected child
- lock or unlock web access decisions for a log item
- manage dangerous websites list
- control service-related settings if needed

### Child Profile

A child profile is not a login account in the web version.

A child profile is only a logical profile used for:

- separating logs per child
- filtering dashboard data
- binding traffic events to a specific child profile
- making monitoring data easier to understand

Important rule:

- child profile is a profile, not a separate auth user
- there is no child login route in the web app
- the parent selects the active child profile from the UI

### Windows Service

The service is a local background component.

Responsibilities:

- start on demand
- set Windows proxy settings
- intercept requests
- redirect dangerous requests
- report request events to the Laravel API
- restore settings on stop

## 5. Application Structure

### Web Application

The Laravel + React app handles:

- auth
- dashboard
- child profile CRUD
- log display
- manual lock/unlock decisions
- charts and summaries
- data classification display

### Service Folder

The service should live in its own folder inside the same repo, for example:

- `service/windows-service`

This folder should contain only service-related code and assets.

Expected contents:

- proxy or interception scripts
- Windows start/stop scripts
- config files
- service bootstrap logic
- list of dangerous websites
- any redirect page integration logic

## 6. Data Model Expectations

### Users Table

Stores parent account data.

Expected columns:

- id
- name
- email
- password
- access token related data if needed

### Children Table

Stores child profiles owned by a parent.

Expected columns:

- id
- parent_id
- name
- timestamps

Expected rule:

- one parent can have many child profiles
- each child profile belongs to one parent
- child profiles are used as monitoring partitions

### Logs Table

Stores traffic events.

Expected columns and meaning:

- `log_id`: unique log identifier
- `parent_id`: owner parent
- `child_id`: active child profile when request was captured
- `url`: visited URL
- `web_title`: page title if available
- `web_description`: description if available
- `detail_url`: detail or redirect target if needed
- `grant_access`: parent decision, true or false
- `classified_final_label`: final classification, such as safe or dangerous
- `classified_title`: classification title if available
- `classified_description`: classification explanation if available
- `classified_title_raw`: raw classifier label if available

### Dangerous Websites Table

Stores known dangerous domains or URLs.

Expected use:

- service or backend checks the visited host against this list
- if matched, the URL is considered dangerous
- if not matched, the record can be treated as unknown or safe depending on classification source

## 7. Log Status Logic

The log status must be clearly defined.

Suggested model:

- `unknown`: URL was seen for the first time and no rule matched yet
- `allowed` or `unlock`: URL is considered safe and can be opened
- `blocked` or `lock`: URL is dangerous and should be redirected

Expected flow:

1. service captures a request
2. service sends URL data to the monitor API
3. backend checks if the URL exists in dangerous list
4. if the URL is recognized as dangerous, store it as locked/blocked
5. if the URL is safe but not yet known, store it as unknown by default
6. parent may later override the decision to lock or unlock

Important behavior:

- default should not erase the unknown state
- the system should know the difference between automatic classification and parent override
- manual parent action should be stored separately from automatic detection if possible

## 8. Child Profile Selection Logic

The lock menu in the app should mean selecting the active child profile.

Expected behavior:

- parent logs in first
- parent opens the profile selector
- parent chooses one child profile
- dashboard and logs immediately switch to that child profile
- if no child profile is selected, the dashboard can fall back to all profiles or a global view

This means the selector is not a child login feature.

It is a context switch for monitoring.

### Global Profile Fallback

If a site or event is not tied to a specific child profile, the app should support a global fallback behavior.

Expected interpretation:

- if the selected child has profile-specific rules, use those rules first
- if no child-specific rule exists, use the global list or default profile list
- if no explicit rule exists at all, treat the event as unknown

This allows one machine to behave consistently even when profile-specific data is incomplete.

## 9. Monitor Flow

The monitor flow is the data intake path from the Windows service to the API.

Expected sequence:

1. browser request happens on Windows
2. service intercepts request
3. service checks whether the request is safe or dangerous
4. service decides whether to allow or redirect
5. service sends event data to Laravel API
6. Laravel validates the request
7. Laravel finds the active child profile
8. Laravel saves the event into logs
9. dashboard shows the event in the selected child context

What monitor should store:

- raw URL
- child profile reference
- parent reference
- automatic classification result
- parent override decision if any
- timestamp

## 10. Blocking and Redirect Flow

Blocking is handled by the service, not by the React UI.

Expected sequence:

1. service sees a requested host
2. service checks dangerous list or rule set
3. if dangerous, service redirects to a block page
4. if safe, service allows request to continue
5. if unknown, service still logs the request
6. parent can later decide whether to lock or unlock that website

Important rule:

- the web dashboard does not perform the network interception itself
- the web dashboard only displays and manages decisions

## 11. Parent Dashboard Flow

Expected dashboard behavior:

- parent can see total safe content
- parent can see total dangerous content
- parent can see monthly and yearly statistics
- parent can view recent activity logs
- parent can click a log URL to inspect it
- parent can lock or unlock a specific log record
- parent can switch child profile context at any time

Dashboard data should always respect the active child profile.

If the selected profile is `ALL`, the app should aggregate across all children.

If one child is selected, the dashboard should only show that child’s data.

## 12. CRUD for Children

The Children page is the place to manage profiles.

Expected behavior:

- add a new child profile
- edit child profile name
- delete child profile
- when a child is deleted, if it is the active profile, clear the selected profile
- after profile changes, dashboard and selectors must refresh

The page should not behave like a login screen.

## 13. Routing Expectations

### Web Routes

Recommended routes:

- `/home` or a profile selection screen
- `/auth/login`
- `/dashboard`
- `/log-activity`
- `/children`
- `/setting`
- `/about`

Not recommended in the web version:

- child login route
- child auth route
- any route that suggests child is a separate login user

### Navigation Rules

- parent login leads to dashboard or role/selection flow
- lock/profile selector leads to active child selection
- profile selection should not open a child login page
- any desktop-only feature should be hidden or clearly marked

## 14. Service Behavior Expectations

The Windows service should be treated as a companion runtime.

Expected responsibilities:

- start once
- stop once
- set proxy settings
- restore proxy settings
- intercept traffic
- redirect blocked URLs
- log traffic events
- support admin rights requirement

The service should fail safely.

If it cannot start or cannot modify proxy settings, it should not leave Windows in a broken proxy state.

## 15. Safety and Admin Requirements

Because the service modifies Windows proxy settings, it should require administrator rights.

Expected safeguards:

- confirm admin before starting service setup
- avoid leaving proxy enabled if the service crashes
- restore original Windows settings on stop
- keep a clear start and stop procedure

## 16. API Expectations

The REST API should support at least:

- login and parent auth
- get current parent user
- get children list
- create/update/delete child profile
- get log list by child or all children
- create log event from service
- update grant access decision
- get summary by child or all
- get yearly statistics
- get monthly statistics
- get dangerous websites list

## 17. What Is Missing or Still Risky

Based on the current codebase, these areas are still likely incomplete or ambiguous:

- unknown state is not yet modeled as a first-class log status
- global profile fallback is not yet explicit in the data model
- profile-specific rule substitution is not yet formalized in service logic
- service implementation is not present in this repo yet
- the current UI still needs consistent naming for lock versus select profile

## 18. Desired Final Behavior

The final system should behave like this:

1. parent opens the app
2. parent logs in
3. parent chooses a child profile context
4. service runs on Windows and monitors browsing
5. dangerous sites are blocked and redirected
6. safe sites are logged
7. unknown sites are stored with default unknown status
8. parent reviews logs and decides to lock or unlock
9. the selected child profile controls what data is shown in the dashboard
10. the Windows proxy state can be started and stopped safely

## 19. Implementation Principle

The biggest rule for this project is separation of concerns:

- React handles presentation
- Laravel handles data and API rules
- Windows service handles interception and redirect
- database stores the shared truth

Do not let the UI pretend to be the service.
Do not let the service own dashboard state.
Do not let profile selection be confused with login.

That separation is what will keep ParentShield understandable and maintainable.

## 20. Flow Diagram

### Parent Flow

```text
Open app
  -> Login as parent
  -> Load children list
  -> Select active child profile
  -> Open dashboard / log activity / children management
  -> Review logs
  -> Lock or unlock a URL
```

### Service Flow

```text
Windows start
  -> Start service with admin rights
  -> Set proxy settings
  -> Intercept browser request
  -> Check dangerous list and child profile rules
  -> Allow or redirect
  -> Send log event to Laravel API
  -> On stop, restore proxy settings
```

### Log Decision Flow

```text
Request captured
  -> Is domain known dangerous?
      -> yes: store blocked/lock
      -> no: is it already allowed by parent?
          -> yes: store unlock/allowed
          -> no: store unknown
```

## 21. REST API Contract Draft

This is the expected API shape for the core features.

| Method   | Endpoint                                          | Purpose                              |
| -------- | ------------------------------------------------- | ------------------------------------ |
| `POST`   | `/api/auth/login`                                 | Parent login                         |
| `POST`   | `/api/auth/logout`                                | Parent logout                        |
| `GET`    | `/api/auth/me`                                    | Get current parent session           |
| `GET`    | `/api/child`                                      | List child profiles                  |
| `POST`   | `/api/child`                                      | Create child profile                 |
| `PUT`    | `/api/child/{id}`                                 | Update child profile                 |
| `DELETE` | `/api/child/{id}`                                 | Delete child profile                 |
| `GET`    | `/api/log/{childId}`                              | List logs for one child or `ALL`     |
| `GET`    | `/api/log/summary/{childId}`                      | Summary for one child or `ALL`       |
| `GET`    | `/api/log/statistic-year/{childId}`               | Yearly chart data                    |
| `GET`    | `/api/log/statistic-month/{childId}`              | Monthly chart data                   |
| `POST`   | `/api/log`                                        | Service sends captured request       |
| `PUT`    | `/api/log/grant-access/{logId}`                   | Parent locks or unlocks a URL        |
| `GET`    | `/api/classified-url/dangerous-website/{childId}` | Service or UI fetches dangerous URLs |

## 22. Status Rules

Recommended status vocabulary:

- `unknown`: captured, not yet classified by rule
- `allowed`: safe and open
- `blocked`: dangerous and redirected
- `lock`: parent manually blocked it
- `unlock`: parent manually allowed it

Suggested rule hierarchy:

1. service rule or dangerous list has priority for redirect
2. parent manual decision overrides default classification
3. unknown stays unknown until a rule or parent action changes it

## 23. Child Profile Rule Model

If child profiles have different lists, the system needs one clear fallback strategy.

Expected idea:

- each child can have its own allow/deny context
- if a URL is not defined for the selected child, the app can fall back to a global profile
- if global profile also does not define it, the URL becomes `unknown`
- service and backend should use the same rule source of truth

This avoids inconsistent behavior between one child profile and another.

## 24. Implementation Checklist

### Web App

- parent login works
- children CRUD works
- active child selection works
- dashboard filters by selected child
- logs show correct child name
- lock and unlock modal works without layer issues
- no child login route exists in web flow

### API

- auth endpoints are stable
- child endpoints return correct profile data
- log endpoints support `ALL` and single-child queries
- summary/statistics respect selected child
- log creation accepts traffic events from service

### Service

- Windows service can start and stop cleanly
- proxy settings are set and restored safely
- service can intercept and redirect dangerous traffic
- service can send captured URL data to the API
- service logs use the selected child profile context

### Data Quality

- unknown state is represented clearly
- dangerous website list is consistent
- child profile fallback strategy is documented
- manual lock/unlock decisions are stored cleanly
