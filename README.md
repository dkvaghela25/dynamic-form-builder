# 🧩 Dynamic Form Builder

A modern **drag-and-drop form builder** built with **React, Vite, and Tailwind CSS**.

Design, configure, and manage fully dynamic forms with ease — all within a sleek UI and powered by local storage persistence.

---

## 🚀 Overview

This project allows you to:

* 🏗️ Build custom forms via drag-and-drop
* ⚙️ Configure fields with labels, validation, and options
* 🔍 Preview form schema in JSON format
* 📝 Fill and submit generated forms
* 📊 Manage submissions with filtering, sorting, and editing

All data is stored in **browser local storage**, so your progress is preserved during development.

---

## ✨ Features

### 🧱 Form Builder

* Drag-and-drop input creation using `@dnd-kit`
* Intuitive schema editing panel
* Live JSON schema preview

### 🧾 Supported Input Types

* **Basic Inputs**: text, number, email, password, color
* **Textarea**
* **Dropdown / Select**
* **Radio Group**
* **Checkbox Group**
* **Date Picker** (date, datetime-local, date-range)
* **File Upload**
* **Slider (Range)**
* **Toggle Switch**
* **Multi-select**

### ✅ Validation Support

* Required fields
* Min/Max length
* Regex pattern matching
* Selection limits
* File constraints
* Date restrictions

### 📊 Submission Management

* Sort by columns
* Filter by fields
* Pagination support
* Edit & delete entries

### 🔔 User Feedback

* Toast notifications for actions and errors

---

## 🛠️ Tech Stack

* **React 19**
* **Vite 7**
* **Tailwind CSS 4**
* **React Router**
* **React Hook Form + DevTools**
* **DnD Kit** (`@dnd-kit/core`, `@dnd-kit/sortable`)

---

## 🧭 Application Routes

| Route   | Description                    |
| ------- | ------------------------------ |
| `/`     | Form Builder (schema creation) |
| `/form` | Rendered dynamic form          |
| `/list` | Submission management table    |

---

## ⚡ Getting Started

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

---

## 🔄 How It Works

1. Go to `/` and drag input components into the canvas
2. Configure fields (label, name, validation rules)
3. Review the generated JSON schema
4. Navigate to `/form` and submit data
5. Visit `/list` to view and manage submissions

---

## 💾 Local Storage

| Key                 | Description               |
| ------------------- | ------------------------- |
| `formSchema`        | Stores the form structure |
| `submittedFormData` | Stores submitted entries  |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AvailableInputs     # Draggable input elements
│   ├── MainContent         # Builder canvas & schema editor
│   ├── FinalForm           # Dynamic form rendering
│   ├── SubmissionDetails   # Table, filters, actions
├── contexts/               # State management
├── utils/                  # Helper functions
```

---

## 🌐 Deployment

This project includes configuration for **Netlify deployment**:

* `netlify.toml`
* `public/_redirects`

Supports client-side routing out of the box.

---

## 📌 Future Improvements (Optional Section)

* Backend integration (save schemas & submissions)
* Authentication system
* Export/import schema
* Form sharing via link
* UI themes

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---
