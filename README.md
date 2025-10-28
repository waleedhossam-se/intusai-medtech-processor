# MedTech Image Processor

A full-stack web application for medical image processing, built for Intus.AI technical assessment.

## 🚀 Features
- **Image Upload**: Support for JPG/PNG medical images
- **Phase Selection**: Choose between Arterial (increased contrast) or Venous (Gaussian smoothing) processing
- **Real-time Processing**: Backend image processing with immediate results
- **Side-by-Side Comparison**: Display original and processed images simultaneously
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Django REST Framework, Python 3.x
- **Image Processing**: Pillow, scikit-image
- **API Communication**: RESTful API with CORS support
- **Deployment**: GitHub Pages (Frontend), Hugging Face Spaces (Backend)

## 📁 Project Structure
IntusAI_Technical_Test/
├── frontend/ # Static frontend files
│ ├── index.html # Main application interface
│ ├── css/
│ │ └── style.css # Styling and responsive design
│ ├── js/
│ │ └── script.js # Frontend logic and API communication
│ └── package.json # Node.js dependencies (Three.js)
├── backend/ # Django backend API
│ ├── medtech_project/ # Django project settings
│ ├── image_processor/ # Image processing app
│ │ ├── views.py # API endpoints and image processing logic
│ │ └── urls.py # URL routing
│ ├── requirements.txt # Python dependencies
│ └── manage.py # Django management script
└── README.md # Project documentation

text

## 🎯 How It Works
1. **User Interface**: Clean web interface for image upload and phase selection
2. **Backend Processing**: Django API receives image, processes it based on selected phase
3. **Image Processing**:
   - **Arterial Phase**: Increases image contrast using Pillow's ImageEnhance
   - **Venous Phase**: Applies Gaussian blur for smoothing effect
4. **Result Display**: Returns base64-encoded images for immediate frontend display

## 🌐 Live Demo
- **Frontend**: [GitHub Pages URL will be added after deployment]
- **Backend API**: [Hugging Face Spaces URL will be added after deployment]

## 🏃‍♂️ Local Development

### Prerequisites
- Python 3.8+
- Node.js (for Three.js dependency)

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend Setup
bash
cd frontend
# Open index.html in browser or use live server
Access the Application
Frontend: http://localhost:3000 (or open index.html directly)

Backend API: http://localhost:8000/api/process/

🔧 API Endpoints
POST /api/process/

Body: Form-data with 'image' (file) and 'phase' (arterial|venous)

Response: JSON with base64 encoded original and processed images

🚀 Deployment
Frontend (GitHub Pages)
Push code to GitHub repository

Enable GitHub Pages in repository settings

Update API_BASE_URL in script.js to point to deployed backend

Backend (Hugging Face Spaces)
Create new Space with Docker template

Upload backend code and requirements.txt

Configure port and startup commands

📝 Implementation Notes
CORS configured for cross-origin requests between frontend and backend

Base64 encoding used for image transmission to avoid file storage

Error handling for invalid files and processing failures

Responsive design for mobile compatibility

🕒 Development Time
This project was completed within the 4-hour timeframe as per Intus.AI technical assessment requirements.

👨‍💻 Developer
Waleed Hossam Shaker

Email: waleed.hossam1@msa.edu.eg

GitHub: https://github.com/waleedhossam-se

LinkedIn: http://linkedin.com/in/waleed-hossam
