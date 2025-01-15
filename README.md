# Conrad User Management Dashboard

## 📋 Project Overview

This User Management Dashboard has been developed as part of the assessment for Conrad, demonstrating a robust React application designed to provide comprehensive user administration capabilities. The solution offers an intuitive interface for managing user accounts, featuring advanced filtering, pagination, and CRUD (Create, Read, Update, Delete) operations.

![Uploading Screenshot 2025-01-15 115529.png…]()


## ✨ Key Features

### 🔍 Advanced User Management
- **Create Users:** Easily add new users with detailed information
- **Edit Users:** Update existing user details seamlessly
- **Delete Users:** Remove users with a secure confirmation process
- **Role-Based Access:** Assign roles (Admin, Editor, Viewer)

### 🚀 Powerful Filtering and Search
- **Search Functionality:** Quickly find users by name or email
- **Role Filtering:** Filter users by their assigned roles
- **Responsive Design:** Optimized for desktop and mobile devices

### 📊 Enhanced User Experience
- **Pagination:** Manage large user lists with easy navigation
- **Dynamic Page Size:** Customize number of entries per page
- **Informative Notifications:** Clear feedback for user actions

## 🛠 Tech Stack

- **Frontend:** React
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Validation:** Custom form validation

## 📦 Project Structure

```
src/
│
├── components/
│   ├── ui/
│   │   ├── Header.jsx
│   │   ├── UserManagement.jsx
│   │   ├── UserForm.jsx
│   │   └── ConfirmationModal.jsx
│   │
│   └── context/
│       └── UserContext.jsx
│
├── App.js
└── index.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or Yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/conrad-assessment/user-management-dashboard.git
cd user-management-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

## 🔐 User Roles

The application supports three distinct user roles:

1. **Admin**
   - Full access to all features
   - Can create, edit, and delete users
   - Highest level of permissions

2. **Editor**
   - Can modify existing user information
   - Limited deletion capabilities
   - Moderate level of access

3. **Viewer**
   - Read-only access
   - Cannot modify or delete users
   - Lowest level of permissions

## 📝 Form Validation

Comprehensive form validation ensures data integrity:
- **Name:**
  - Required field
  - Minimum 2 characters
- **Email:**
  - Must be a valid email format
  - Required field
- **Role:**
  - Must be selected from predefined options

## 🎨 Responsive Design

The dashboard is fully responsive, providing an optimal viewing experience across:
- Desktop
- Tablet
- Mobile devices

## 🤝 Assessment Submission

This project was developed as part of the Conrad assessment, demonstrating:
- Clean, maintainable code
- Responsive design
- Advanced user management features
- Attention to user experience and interface design

## 🐛 Known Issues and Improvements

- [ ] Implement server-side pagination
- [ ] Add more advanced search capabilities
- [ ] Create user activity logging
- [ ] Implement role-based access control (RBAC)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Conrad Assessment Team - assessment@conrad.com

Project Repository: [Conrad User Management Dashboard](https://github.com/conrad-assessment/user-management-dashboard)

---

**💡 Pro Tip:** Always ensure you have the latest version of dependencies and keep your application secure and up-to-date!
