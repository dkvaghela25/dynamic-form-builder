# Dynamic Form Builder

A drag-and-drop form builder built with React, Vite, and Tailwind CSS.

This project lets you:

- Build custom forms by dragging input types into a canvas
- Configure labels, names, placeholders, options, and validation rules
- Preview generated schema in JSON format
- Fill and submit the generated form
- View, filter, sort, edit, and delete submission rows

The app stores schema and submissions in browser local storage, so you can continue where you left off during development.

## Features

- Drag-and-drop form input creation using `@dnd-kit`
- Supported inputs:
  - Text input (text, number, email, password, color)
  - Multi-line input (textarea)
  - Dropdown
  - Radio group
  - Checkbox group
  - Date picker (date, datetime-local, date-range)
  - File upload
  - Slider (range)
  - Toggle switch
  - Multi-select
- Editable validation rules (required, min/max length, pattern, selection limits, file constraints, date limits)
- Form rendering powered by `react-hook-form`
- Submission listing with:
  - Column-based sorting
  - Filtering by schema fields
  - Pagination
  - Edit and delete actions
- Toast notifications for user feedback

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Router
- React Hook Form + Hook Form DevTools
- DnD Kit (`@dnd-kit/core`, `@dnd-kit/sortable`)

## Project Routes

- `/` - Form builder page (schema creation)
- `/form` - Rendered final form page
- `/list` - Submission details table

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Run lint checks

```bash
npm run lint
```

## How It Works

1. Open `/` and drag input types from the left panel into the form area.
2. Edit field schema (label, name, options, rules) from the editor panel.
3. Review generated schema in the JSON panel.
4. Go to `/form` and submit data.
5. Go to `/list` to manage saved submissions.

## Local Storage Keys

- `formSchema`: stores generated form schema
- `submittedFormData`: stores submitted rows

## Folder Highlights

- `src/components/AvailableInputs`: draggable input source cards
- `src/components/MainContent`: builder canvas and schema editing
- `src/components/FinalForm`: dynamic form rendering and submission actions
- `src/components/SubmissionDetails`: table, filters, and row actions
- `src/contexts`: state management for active schema
- `src/utils`: reusable helpers for rules, defaults, sorting, rendering

## Deployment

The repository includes:

- `netlify.toml`
- `public/_redirects`

These files can be used for Netlify deployment and client-side route handling.
