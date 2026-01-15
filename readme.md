Memorial Platform

A full‑stack memorial and remembrance web platform built with Flask, SQLite, and vanilla JavaScript. The platform allows users to create memorial pages for loved ones, write and share eulogies, upload photos, and share pages publicly while maintaining a clean, respectful, and modern user experience.

This project is designed to be lightweight, easy to deploy, and suitable for both personal use and small‑scale production environments.

🌟 Features
🕊 Memorial Pages

Create a dedicated page for each individual

Display personal details, biography, and timeline

Publicly shareable memorial URLs

✍️ Eulogies

Write rich eulogies linked to a memorial

Attach multiple photos to a single eulogy

Rendered dynamically using Web Components

🖼 Photo Uploads

Upload and store images locally

Organized by eulogy and memorial

Images rendered dynamically on the frontend

🔗 Social Sharing

Share buttons available on:

Homepage

Memorial pages

Individual eulogies

Optimized for WhatsApp, Facebook, X, and direct link sharing

🧭 Navigation

Custom reusable navigation bar (Web Component)

Responsive and mobile‑friendly layout

🔐 Admin / Moderation (Optional)

Admin dashboard for managing content

Secure authentication (Flask sessions)

🛠 Tech Stack
Backend

Python 3.10+

Flask – Web framework

SQLite – Lightweight relational database

Werkzeug – Security utilities

Frontend

Vanilla JavaScript (ES6)

Web Components (Custom Elements)

HTML5 & CSS3

Feather Icons

Other

Jinja2 – Server‑side templating

Gunicorn (production)

📁 Project Structure
memorial-project/
│
├── app.py
├── requirements.txt
├── README.md
│
├── database/
│   └── memorial.db
│
├── static/
│   ├── css/
│   ├── js/
│   │   ├── navbar.js
│   │   ├── eulogy-card.js
│   │   └── share.js
│   └── uploads/
│       └── eulogies/
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── memorial.html
│   ├── eulogy.html
│   └── admin/
│
└── instance/
    └── memorial.db
🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/memorial-platform.git
cd memorial-platform
2️⃣ Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
3️⃣ Install Dependencies
pip install -r requirements.txt
4️⃣ Run the Application
flask run

Visit: http://127.0.0.1:5000

🗄 Database

Uses SQLite for simplicity

Automatically created on first run (if configured)

Tables include:

memorials

eulogies

eulogy_photos

users (admin)

You can migrate to PostgreSQL or MySQL for production if needed.

🖼 Image Uploads

Uploaded images are stored locally in:

static/uploads/eulogies/

Each image path is stored in the database and served via Flask’s static route.

⚠️ Important: Ensure the static/uploads/ directory exists and is writable.

🌐 Deployment Notes
Recommended Options

Hostinger (VPS or Business Hosting)

Render

Railway

Fly.io

Production Tips

Use Gunicorn instead of Flask dev server

Set DEBUG = False

Use environment variables for secrets

Serve static files correctly (Nginx recommended)

🔒 Security Considerations

Passwords are hashed using Werkzeug

Admin routes protected with decorators

File uploads validated by extension

For production, consider:

CSRF protection

Rate limiting

HTTPS

📌 Roadmap

Reactions / condolences

Comment moderation

Cloud image storage (S3 / Cloudinary)

User accounts for families

SEO meta previews for shared links

🤝 Contributing

Contributions are welcome.

Fork the repo

Create a feature branch

Commit changes

Open a Pull Request

📜 License

This project is licensed under the MIT License.

✨ Author

Mark Feka
Blockchain & Full‑Stack Developer

Built with respect, remembrance, and simplicity in mind.