IngredientIQ

Product Safety Intelligence

IngredientIQ is a web application that analyzes cosmetic and personal-care product ingredients and presents safety information, profile-based warnings, and product grading.

Features

1. Manual barcode entry

2. Ingredient-list analysis

3. Ingredient normalization

4. Safety classification

5. Profile-based warnings

6. Product safety score and A–F grade

7. Ingredient-level details and safety distribution

Architecture

                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
     ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
     │ Product Lookup │    │ Ingredient     │    │ Profile        │
     │                │    │ Processing     │    │ Matcher        │
     └───────┬────────┘    └───────┬────────┘    └───────┬────────┘
             │                     │                     │
             ▼                     ▼                     │
     ┌────────────────┐    ┌────────────────┐             │
     │ OpenBeautyFacts│    │ Reference Data │             │
     │ OpenFoodFacts  │    │ Safety Model   │             │
     └────────────────┘    └───────┬────────┘             │
                                   │                      │
                                   └──────────┬───────────┘
                                              ▼
                                   ┌─────────────────────┐
                                   │   Product Scorer    │
                                   └──────────┬──────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │   Analysis Results  │
                                   │ Details / Warnings  │
                                   │ Distribution / Grade│
                                   └─────────────────────┘

How It Works

Enter a product barcode or ingredient list.

Retrieve or process the ingredient data.

Normalize and classify the ingredients.

Check selected profiles for relevant warnings.

Generate the product score, grade, and analysis results.

Tech Stack

Frontend

React

Vite

Axios

Backend

Python

FastAPI

Pandas

NumPy

Scikit-learn

Data

Parquet reference datasets

OpenBeautyFacts API

OpenFoodFacts API

Trained safety classification model

Project Structure

## Project Structure

```text
┌──────────────────────────────────────────────┐
│              IngredientIQ/                  │
├──────────────────────────────────────────────┤
│ 1. data/                                    │
│    └── reference/                           │
│        ├── ingredient_safety.parquet        │
│        └── inci_synonyms.parquet            │
│                                              │
│ 2. frontend/                                │
│    └── react-app/                           │
│        ├── src/                             │
│        ├── package.json                     │
│        └── package-lock.json                │
│                                              │
│ 3. models/                                  │
│    └── safety_classifier.pkl                │
│                                              │
│ 4. pipeline/                                │
│ 5. src/                                     │
│    └── api/                                 │
│ 6. tests/                                   │
│ 7. .env.example                             │
│ 8. .gitignore                               │
│ 9. Dockerfile                               │
│10. render.yaml                              │
│11. requirements.txt                          │
│12. run_pipeline.py                           │
│13. README.md                                │
└──────────────────────────────────────────────┘
```

Setup

Backend

Clone the repository.

git clone <repository-url>
cd IngredientIQ

Create and activate a virtual environment.

python -m venv venv
venv\Scripts\activate

Install dependencies.

pip install -r requirements.txt

Start the API.

uvicorn src.api.main:app --reload

Backend: http://localhost:8000

Frontend

Open the frontend directory.

cd frontend/react-app

Install dependencies.

npm install

Start the development server.

npm run dev

Frontend: http://localhost:3000

Create frontend/react-app/.env.

VITE_API_URL=http://127.0.0.1:8000

API

Method

Endpoint

Purpose

GET

/health

Health check

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

Get supported profiles

GET

/grades

Get grading information

API documentation: http://localhost:8000/docs

Data and Model

ingredient_safety.parquet — ingredient safety reference data

inci_synonyms.parquet — ingredient name normalization

safety_classifier.pkl — safety classification model

OpenBeautyFacts and OpenFoodFacts — external product information

Current Scope

Manual barcode entry is supported.

Ingredient-list analysis is supported.

Camera-based barcode scanning is not part of the current implementation.

OCR-based ingredient extraction is not part of the current implementation.

Results are informational and should not replace professional medical or dietary advice.

Deployment

Dockerfile — container configuration

render.yaml — Render deployment configuration

Future Enhancements

Camera-based barcode scanning

OCR-based ingredient extraction

Expanded ingredient reference data

Additional personalization profiles

Improved product coverage

License

This project is provided for educational and research purposes.
