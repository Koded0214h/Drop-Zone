# 🚀 DropZone

DropZone is a **secure vault** for developers to access curated resources like **cheat sheets**, **GitHub repositories**, and **private docs** — released over time.

Built with **Django REST Framework** and **React**, it features token-based authentication, download protection, bookmarking, and onboarding email flows.

---

## 🔧 Tech Stack

| Layer        | Tech                      |
|--------------|---------------------------|
| Backend      | Django + DRF              |
| Frontend     | React + TailwindCSS       |
| Auth         | JWT (SimpleJWT)           |
| Database     | PostgreSQL (NeonDB)       |
| File Uploads | Local (Protected Access)  |
| Mailing      | Gmail SMTP (SSL port 465) |

---

## 📦 Features

- 🔐 User registration & JWT login
- ✉️ Onboarding email after signup
- 🕒 Time-based drop releases (e.g. weekly or scheduled)
- 📁 File upload per drop (PDFs, ZIPs, etc.)
- 📥 Download protection via secure backend route
- 📌 Bookmark drops
- 📜 View all bookmarks
- 🔍 Clean, responsive dashboard (React + Tailwind)
- 🧪 API built with DRF, permission-protected

---

## 📁 Folder Structure

```
DropZone/
├── backend/                 # Django REST API
│   ├── backend/            # Django project settings
│   │   ├── settings.py     # Development settings
│   │   ├── settings_prod.py # Production settings
│   │   └── urls.py         # Main URL configuration
│   ├── core/               # Main Django app
│   │   ├── models.py       # Drop, UserDropBookmark models
│   │   ├── views.py        # API views & endpoints
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # API routes
│   ├── templates/          # Email templates
│   ├── media/              # Uploaded files
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # Heroku deployment
│   ├── runtime.txt        # Python version
│   └── deploy.sh          # Deployment script
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # React pages
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DropDetail.jsx
│   │   │   └── Bookmarks.jsx
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── DropCard.jsx
│   │   ├── api/           # API configuration
│   │   │   └── axios.js   # Axios with JWT interceptor
│   │   └── App.jsx        # Main React app
│   ├── package.json       # Node dependencies
│   ├── tailwind.config.js # TailwindCSS config
│   └── vite.config.js     # Vite configuration
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL database
- Gmail account (for email)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database and email settings

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver 8000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=DropZone <your-email@gmail.com>
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/health/` | GET | Health check | No |
| `/api/register/` | POST | User registration | No |
| `/api/login/` | POST | JWT login | No |
| `/api/refresh/` | POST | Refresh JWT token | No |
| `/api/drops/released/` | GET | Get released drops | Yes |
| `/api/drops/upcoming/` | GET | Get upcoming drops | Yes |
| `/api/drops/{id}/` | GET | Get drop details | Yes |
| `/api/drops/{id}/download/` | GET | Download drop file | Yes |
| `/api/drops/{id}/bookmark/` | POST | Toggle bookmark | Yes |
| `/api/bookmarks/` | GET | Get user bookmarks | Yes |

---

## 🎨 Frontend Features

### Pages
- **Landing**: Marketing page with features and testimonials
- **Login/Register**: Authentication forms with validation
- **Dashboard**: Main hub showing released, bookmarked, and upcoming drops
- **Drop Detail**: Individual drop view with download and bookmark
- **Bookmarks**: User's saved drops

### Components
- **Navbar**: Responsive navigation with mobile menu
- **DropCard**: Reusable card component for displaying drops

### Features
- Mobile-first responsive design
- JWT token management with auto-refresh
- Loading states and error handling
- Smooth animations and transitions
- Professional UI with TailwindCSS

---

## 🔒 Security Features

- JWT-based authentication
- Protected file downloads
- CORS configuration
- Input validation and sanitization
- Secure password handling
- Time-based access control for drops

---

## 📧 Email Integration

DropZone sends welcome emails to new users using Gmail SMTP:

- **Template**: `templates/emails/welcome.html`
- **Trigger**: User registration
- **Content**: Welcome message with username

---

## 🚀 Deployment

### Backend (Heroku)
```bash
cd backend
./deploy.sh
```

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Development

### Running Tests
```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm test
```

### Code Quality
```bash
# Backend
cd backend
python manage.py check

# Frontend
cd frontend
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/dropzone/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/dropzone/wiki)
- **Email**: support@dropzone.com

---

## 🙏 Acknowledgments

- Django REST Framework for the robust API
- React team for the amazing frontend framework
- TailwindCSS for the utility-first CSS framework
- Vite for the fast build tool
- Heroku for the deployment platform 