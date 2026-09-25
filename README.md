IngredientIQ

Product Safety Intelligence

IngredientIQ is an AI-powered product safety analysis application for beauty and personal care products. It analyzes product ingredients, evaluates selected user profiles, and generates an overall A–F product safety grade.

The system combines a React frontend, FastAPI backend, machine learning, local ingredient reference data, and external product databases.

Features

Manual product barcode entry

Manual ingredient list analysis

Ingredient normalization and reference lookup

Ingredient safety classification

SAFE, MODERATE, and HAZARDOUS safety labels

Personalized analysis using health and dietary profiles

Ingredient-level safety information

Safety distribution

Overall A–F product safety grade

Product-level recommendations and warnings

REST API with FastAPI

React-based web interface

Supported Profiles

Sensitive Skin

Pregnancy

Diabetic

Vegan

Nut Allergy

Fragrance Allergy

Acne-Prone

Architecture

                         USER
                           |
                           v
                +---------------------+
                |    React Frontend   |
                |                     |
                |  Landing Page       |
                |  Barcode Entry      |
                |  Ingredient Checker |
                |  Profile Selection  |
                +----------+----------+
                           |
                           | REST API
                           v
                +---------------------+
                |   FastAPI Backend   |
                |                     |
                |  Product Lookup     |
                |  Ingredient API     |
                |  Profile API        |
                |  Scoring API        |
                +----------+----------+
                           |
             +-------------+-------------+
             |                           |
             v                           v
   +-------------------+       +----------------------+
   | External Product  |       | Local Reference Data |
   | APIs              |       |                      |
   |                   |       | ingredient_safety    |
   | OpenBeautyFacts   |       | inci_synonyms        |
   | OpenFoodFacts     |       |                      |
   +-------------------+       +----------+-----------+
                                          |
                                          v
                               +----------------------+
                               | Ingredient Processing |
                               |                      |
                               | Normalization        |
                               | Feature Processing   |
                               | Safety Classification|
                               +----------+-----------+
                                          |
                                          v
                               +----------------------+
                               | Profile Matcher      |
                               +----------+-----------+
                                          |
                                          v
                               +----------------------+
                               | Product Scorer       |
                               |                      |
                               | Safety Score         |
                               | A-F Grade            |
                               | Warnings             |
                               +----------+-----------+
                                          |
                                          v
                               +----------------------+
                               | Analysis Results     |
                               |                      |
                               | Ingredient Details   |
                               | Safety Distribution  |
                               | Product Grade        |
                               +----------------------+

How It Works

1. User Input

The user can either:

Enter a product barcode manually

Enter an ingredient list manually

2. Product Lookup

For barcode analysis, the backend attempts to retrieve available product and ingredient information from external product databases.

3. Ingredient Processing

Ingredients are cleaned, normalized, and matched against local reference data.

Raw Ingredient
      |
      v
Cleaning
      |
      v
Normalization
      |
      v
INCI / Synonym Matching
      |
      v
Reference Lookup

4. Safety Classification

The processed ingredient information is passed through the project's safety analysis pipeline.

Available safety labels:

SAFE
MODERATE
HAZARDOUS

The trained classifier is stored at:

models/safety_classifier.pkl

5. Profile Matching

Selected user profiles are checked against the analyzed ingredients to identify relevant concerns.

6. Product Scoring

The Product Scorer combines ingredient-level analysis and generates an overall product score and A–F grade.

7. Results

The frontend displays:

Overall grade

Safety distribution

Ingredient-level results

Profile-specific warnings

Product information when available

Technology Stack

Frontend

React

Vite

JavaScript

React Router

Axios

CSS

Backend

Python

FastAPI

Uvicorn

Pydantic

Pandas

NumPy

Scikit-learn

XGBoost

Joblib

PyArrow

Tools

Git

GitHub

Docker

Pytest

MLflow

Project Structure

IngredientIQ/
│
├── data/
│   └── reference/
│       ├── ingredient_safety.parquet
│       └── inci_synonyms.parquet
│
├── frontend/
│   └── react-app/
│       ├── src/
│       │   ├── api/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   └── index.css
│       ├── package.json
│       └── package-lock.json
│
├── models/
│   └── safety_classifier.pkl
│
├── pipeline/
│
├── src/
│   ├── api/
│   ├── features/
│   ├── ingestion/
│   ├── models/
│   └── preprocessing/
│
├── tests/
│
├── Dockerfile
├── render.yaml
├── requirements.txt
├── .env.example
├── .gitignore
├── run_pipeline.py
└── README.md

Installation

Backend

Create a virtual environment:

python -m venv venv
.env\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt

Create the environment file:

Copy-Item .env.example .env

Frontend

Navigate to the frontend:

cd frontend
eact-app

Install dependencies:

npm install

Running the Application

Start the Backend

From the project root:

uvicorn src.api.main:app --reload

Backend:

http://localhost:8000

Swagger API documentation:

http://localhost:8000/docs

Health check:

http://localhost:8000/health

Start the Frontend

Open another terminal:

cd frontend
eact-app
npm run dev

Frontend:

http://localhost:3000

Frontend environment configuration:

VITE_API_URL=http://127.0.0.1:8000

API Endpoints

Method

Endpoint

Description

GET

/health

Check API and model status

POST

/scan/barcode

Analyze a product using its barcode

POST

/ingredients/batch

Analyze multiple ingredients

GET

/ingredient/{name}

Retrieve information for an ingredient

GET

/profiles

Retrieve available user profiles

GET

/grades

Retrieve grading information

Example Barcode Request

{
  "barcode": "4005800001192",
  "user_profiles": []
}

Example Ingredient Request

[
  "Water",
  "Glycerin",
  "Fragrance",
  "Phenoxyethanol"
]

Data Sources

IngredientIQ uses external product databases when product information is available:

OpenBeautyFacts

OpenFoodFacts

Local reference data:

data/reference/ingredient_safety.parquet
data/reference/inci_synonyms.parquet

Testing

Run the test suite:

pytest tests/ -v

Verify the backend:

python -c "from src.api.main import app; print('IngredientIQ backend loaded successfully')"

Docker

Build the backend image:

docker build -t ingredientiq .

Run the container:

docker run -p 8000:8000 ingredientiq

Limitations

Product information depends on external database availability.

Some barcodes may not return product information.

Ingredient coverage depends on the available reference data.

Safety results depend on the project's model, reference data, and configured rules.

The A–F grade is an informational application-generated assessment and is not a medical or regulatory certification.

The current interface uses manual barcode entry rather than camera-based barcode scanning.

Future Enhancements

Camera-based barcode scanning

Product label image analysis and OCR

Expanded ingredient reference database

Explainable AI for safety classifications

Product comparison

Product history

Mobile application

Additional product data sources

License

MIT License.

This project is developed for educational and demonstration purposes.
