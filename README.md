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
