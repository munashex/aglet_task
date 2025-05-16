
### 🌐 Live Website

**Deployed on Vercel:**  
🔗 [https://aglet-task.vercel.app](https://aglet-task.vercel.app)

---

## 📁 Project Structure

The project is organized for clarity and scalability, with separate folders for components, pages, and media assets.

src/
├── components/
│ ├── Navbar.jsx # Navigation bar component
│ └── VideoSlider.jsx # Optional: Video slider component (if used)
│
├── data/
│ ├── images/ # Stores all image files used in the app
│ └── videos/ # Stores video files (e.g., contact page background)
│
├── pages/
│ ├── Home.jsx # Homepage layout
│ └── Contact.jsx # Contact page with video background and information
│
├── App.jsx # Main application component
└── index.js # Entry point of the React application



---

## 📂 Root Directory

- `favicon.ico` – Website icon displayed in browser tabs.
- `vercel.json` – Vercel configuration file to handle routing fallback.  
  This prevents page reload issues (e.g., 404 errors) when refreshing on nested routes like `/contact`.

---

## 🚀 Deployment

The application is deployed using **Vercel**, a modern frontend hosting platform.

- Automatically builds and deploys on push.
- Handles custom routing and refresh issues via the `vercel.json` configuration file.

---

## 🛠 Technologies Used

- **React** – Component-based UI library.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Vercel** – Hosting and continuous deployment.

---

## 📌 Notes

- All videos and images used are stored in the `src/data` folder.
- The design is responsive across all screen sizes.
- Smooth scroll functionality is implemented for enhanced UX when navigating from the video to the second section.

---

**Developed by:**  
**Munashe Mugonda**  
📧 munashemugondaa@gmail.com  
📞 +27 68 952 6513