# front-trello

This frontend is an **Angular** application that provides a **Jira/Trello-like Kanban experience** for managing projects, boards, and issues.

The goal is to deliver a **clean, modern and responsive UI**, focused on productivity:
- Quick navigation between workspaces and projects
- Drag & drop Kanban boards
- Fast issue creation and editing
- Filters and search
- Issue detail panel with comments, attachments and history

## UI Overview

### 1) App Layout (Global)
The application uses a **dashboard layout** similar to Jira:

- **Top Bar**
  - App name / logo
  - Current workspace + project selector
  - Search bar
  - User profile menu (logout, settings)

- **Left Sidebar**
  - Workspaces list
  - Projects inside selected worskpace
  - Quick navigation items
    - Board
    - Issues
    - Members
    - Settings

- **Main Content**
  - Changes depending on the selected section (Board, Issues, etc.)

## Main Screens

### 2) Authentication Pages
#### Login
Simple card centered:
- Email + password
- "Remember me"
- Login button
- Link to register

#### Register
Similar layout:
- Name, email, password
- Create account button
- Link back to login

---

### 3) Workspace Selection
Once logged in, the user lands on a **Workspaces page**:

- Grid/list of workspace cards
- Each card shows:
  - Workspace name
  - Number of projects
  - User role (OWNER / ADMIN / MEMBER / VIEWER)
- Actions:
  - Create workspace
  - Enter workspace

---

### 4) Projects Page
Inside a workspace, the user sees the projects:

- Table or cards view
- Project key (example: `KANB`)
- Project name + description
- Actions:
  - Open Board
  - Edit project (if role allows)
  - Manage members (if role allows)

---

## Kanbn Board (Core Feature)

### 5) Board View
This is the main viwe of the app

It displays:
- A **horizontal Kanban board** with columns (To Do / Doing / Done)
- Each column contains **issue cards**
- Issues can be **dragged and dropped** between columns

#### Column UI
Each card shows:
- Issues type icon (TASK / BUG / STORY)
- Title
- Priority badge (LOW / MEDIUM / HIGH)
- Labels (chips)
- Due date (if exists)
- Assignee avatar (if exists)

---

### 6) Issues Detail Drawer
When clicking an issue card, a **right-side drawer** opens:

**Header**
- Issue title (editable)
- Issue key (optional: `KANB-21`)
- Status dropdown (column)
- Priority dropdown

**Tabs**
- **Details**
  - Description (markdown)
  - Assignees selector
  - Due date picker
  - Labels
- **Comments**
  - Thread-style comments
  - Add comment box
- **Attachments**
  - Upload files
  - Download / preview
- **History**
  - Timeline of changes (moved, edited, assigned, etc.)

---

## Members & Roles Screen
A **Members** screen allows workspace/project admins to:

- View member list
- See roles
- Change role (if allowed)
- Remove member (if allowed)
- Invite new member (by email/token)

---

## Navigation Map
Typical navigation flow:

1. Login/Register
2. Workspaces
3. Select Workspace
4. Projects
5. Open Project
6. Board (Kanban)
7. Click issues - Issue Detail Drawer
8. Members / Settings (optional)

---

## Tech Stack
- Angular components, Router, Material...
- RxJS
- Drag & Drop
- Reactive forms
- JWT handling via HTTP Interceptor

## Project Structure
```txt
src/
  app/
    core/
      auth/
      guards/
      interceptors/
      services/
    shared/
      components/
      models/
      utiles
    features/
      auth/
      workspaces/
      projects/
      board/
      issues/
      members/
