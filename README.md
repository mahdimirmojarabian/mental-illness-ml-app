# Mental Illness Prevalence Prediction App 📈🧠

This application is designed to predict the prevalence of eating disorders based on the prevalence of several other mental health disorders. Leveraging machine learning, this app provides a user-friendly interface for making predictions using Linear Regression as a starter model.

---

## 📌 Table of Contents
- Overview
- Source of Data
- Project Purpose
- Tech Stack & Tools
- Project Structure
- Installation & Setup
- Running the Application
- Screenshots
- Machine Learning Model
- Endpoints (API)
- Contributing

---

## 🚀 Overview
This app is developed to provide insights into mental health disorder prevalence. Initially, it leverages a simple Linear Regression model trained on Kaggle mental health data to predict eating disorders based on:

- Schizophrenia disorders
- Depressive disorders
- Anxiety disorders
- Bipolar disorders

---

## 📊 Source of Data
The dataset is publicly available on Kaggle:

🔗 [Mental Health Dataset - Kaggle](https://www.kaggle.com/datasets/imtkaggleteam/mental-health)

---

## 🎯 Project Purpose
The goal of this project is to:

- Educate and visualize relationships between various mental health disorders.

- Provide a straightforward interface for predicting mental health metrics.

- Serve as a foundation for more complex predictive models.

## 🛠️ Tech Stack & Tools
**Frontend**
- React.js
- Next.js
- Axios
- React-toastify (notifications)
- CSS Modules / global CSS

**Backend**
- Python
- FastAPI (Web Framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- JWT Authentication

**Machine Learning**
- scikit-learn (Linear Regression)
- NumPy
- Pandas
- joblib (for serialization)

## 📁 Project Structure
```
mental-illness-ml-app/
├── backend/
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── auth.py
│   ├── app.py
│   ├── requirements.txt
│   └── train.py
│
├── frontend/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── PredictionForm.jsx
│   │   ├── PredictionHistory.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── index.js
│   │   ├── predict.js
│   │   ├── history.js
│   │   ├── login.js
│   │   └── register.js
│   └── styles/
│       └── globals.css
│
├── README.md
├── .gitignore
└── package.json
```
---

## 💻 Installation & Setup
Step 1: Clone Repository

```
git clone https://github.com/YOUR_GITHUB_USERNAME/mental-illness-ml-app.git
cd mental-illness-ml-app
```
Step 2: Setup Backend (Python)

```
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows

pip install -r requirements.txt
```
Create .env inside the backend folder:
```
DATABASE_URL=postgresql://your_user:your_password@localhost/your_db
SECRET_KEY=your_jwt_secret_key
```
Step 3: Setup Frontend

```
cd ../frontend
npm install
```

---

## 🚀 Running the Application
Run Backend API

```
cd backend
uvicorn app:app --reload --port 8000
```
Run Frontend

```
cd frontend
npm run dev
```
Visit http://localhost:3000 in your browser.

---
## 📷 Screenshots

Login Page

Prediction Form

Prediction History

---

## 📈 Machine Learning Model
Linear Regression Model

- Features:

Schizophrenia disorders

Depressive disorders

Anxiety disorders

Bipolar disorders

- Target:

Eating disorders

Training snippet:

```
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
```

## 🌐 Endpoints (API)
POST `/register` - Create new user account

POST `/login` - User login, returns JWT token

POST `/predict` - Make predictions

GET `/history` - Fetch prediction history

GET `/me` - Get user details

## 🙌 Contributing
Feel free to fork this repository and enhance the app. Contributions are welcomed!

- Fork the project

- Create your feature branch (`git checkout -b feature/AwesomeFeature`)

- Commit your changes (`git commit -m 'Add some AwesomeFeature'`)

- Push to the branch (`git push origin feature/AwesomeFeature`)

- Open a Pull Request


  
