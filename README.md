# Price Optimization Tool

A web application for managing products and optimizing prices using demand forecasting.

## Features

- User authentication and authorization
- CRUD operations for products
- Price optimization algorithm
- Demand forecasting visualization
- Role-based access control

## Technologies

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Database**: PostgreSQL

## Installation

1. Clone the repository
2. Backend setup:

```bash
cd price-optimization-tool/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd ../frontend
npm install
npm start

pip install requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```



############ FRONTEND ###############

# Price Optimization Tool

A React-based frontend application for product management and price optimization analytics, integrated with a Django backend.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4)

## ✨ Features

- JWT Authentication Flow
- Product CRUD Operations
- Price Optimization Algorithms
- Demand Forecasting Visualizations
- Responsive UI with AG-Grid Integration

## 🚀 Quick Start

### Prerequisites
- Node.js ≥16.x
- npm ≥9.x
- Running Django Backend (`http://localhost:8000`)

### Installation
```bash
git clone https://github.com/your-username/price-optimization-tool.git
cd frontend
npm install


src/
├── components/          # Reusable components
│   ├── ForecastModal.js # Interactive chart modal
│   ├── Layout.js        # App shell with navigation
│   ├── ProductForm.js   # CRUD form with validation
│   └── ProductGrid.js   # AG-Grid implementation
│
├── pages/               # Route components
│   ├── Login.js         # Auth interface
│   ├── PricingOptimization.js # Optimization dashboard
│   └── ProductList.js   # Product management
│
├── api.js               # Axios configuration
├── App.js               # Router setup
└── index.js             # Entry point

🔍 Key Implementation Details
# State Management
Component-level state with React hooks
JWT token persistence in localStorage
Data re-fetching after mutations

# Error Handling
Automatic 401 redirects
Console logging for development
Basic form validation

# Performance
AG-Grid virtualization for large datasets
Chart.js component tree-shaking
CSS transitions for modal animations

