IngredientIQ

Product Safety Intelligence

IngredientIQ is a web application that analyzes cosmetic and personal-care product ingredients and presents safety information in a simple, profile-aware format.

Features

Manual barcode entry for product lookup

Ingredient-list analysis

Ingredient normalization and safety classification

Profile-aware warnings

Product safety score and A–F grade

Ingredient-level details and safety distribution

REST API powered by FastAPI

React-based frontend

Architecture

User
  │
  ▼
React Frontend
  │
  ▼
FastAPI REST API
  │
  ├── Product Lookup
  │     └── OpenBeautyFacts / OpenFoodFacts
  │
  ├── Ingredient Processing
  │     ├── Normalization
  │     ├── Reference Data
  │     └── Safety Classification
  │
  ├── Profile Matcher
  │
  └── Product Scorer
        │
        ▼
   Analysis Results

How It Works

Enter a barcode or ingredient list.

IngredientIQ retrieves or processes the ingredient data.

Ingredients are normalized and classified using the local reference data and model.

Selected user profiles are checked for relevant warnings.

The application returns ingredient details, safety distribution, warnings, and an overall product grade.

Tech Stack

Frontend

React

Vite

Axios

Backend

Python

FastAPI

Scikit-learn

Pandas

NumPy

Data

Parquet reference datasets

OpenBeautyFacts / OpenFoodFacts APIs

Trained safety classification model

Project Structure

IngredientIQ/
├── data/
│   └── reference/
├── frontend/
│   └── react-app/
├── models/
├── pipeline/
├── src/
│   └── api/
├── tests/
├── .env.example
├── Dockerfile
├── render.yaml
├── requirements.txt
└── run_pipeline.py

Setup

1. Clone the repository

git clone <repository-url>
cd IngredientIQ

2. Backend

Create and activate a virtual environment:

python -m venv venv
venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the API:

uvicorn src.api.main:app --reload

The backend runs at http://localhost:8000.

3. Frontend

cd frontend/react-app
npm install
npm run dev

The frontend runs at http://localhost:3000.

Set the API URL in frontend/react-app/.env:

VITE_API_URL=http://127.0.0.1:8000

API Endpoints

Method

Endpoint

Purpose

GET

/health

API health check

POST

/scan/barcode

Analyze a product by barcode

POST

/ingredients/batch

Analyze multiple ingredients

GET

/ingredient/{name}

Get ingredient information

GET

/profiles

Get supported user profiles

GET

/grades

Get product grading information

Interactive API documentation is available at:

http://localhost:8000/docs

Data and Model

IngredientIQ uses:

data/reference/ingredient_safety.parquet

data/reference/inci_synonyms.parquet

models/safety_classifier.pkl

External product information can be retrieved from OpenBeautyFacts and OpenFoodFacts when available.

Current Scope

IngredientIQ currently supports manual barcode entry and ingredient-list analysis. It does not require a camera-based barcode scanner.

Results are intended as informational product-safety guidance and should not replace professional medical or dietary advice.

Deployment

The repository includes:

Dockerfile for containerized deployment

render.yaml for Render deployment configuration

Future Enhancements

Camera-based barcode scanning

OCR-based ingredient extraction

Expanded ingredient reference data

Additional personalization profiles

Improved product coverage

License

This project is provided for educational and research purposes.
