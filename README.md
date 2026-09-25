IngredientIQ.zip
Zip Archive
ill do these meanwhile you check this
look at the emojis and the home screen 
still says scan 
next page.barcode scanner?

Ahhh, yes — you mean give me the actual README.md file, not another code block. Got you.

I'll make the medium-length version we just agreed on and provide it as a downloadable README.md.

yes 

Done — here’s the actual README.md file:

Download README.md 

README.md
Document
this is fucking huge 

😭 Okay, WAY too huge. I misunderstood “medium.”

You want something closer to a normal GitHub project README — enough to explain the project and show setup/tech stack, but not a documentation manual.

I’d cut it down to roughly 1–2 pages, keeping only:

Project overview
Features
How it works
Tech stack
Project structure
Installation & running
API endpoints
Limitations
Future enhancements
License

No giant architecture explanations, no repeated explanations, no massive diagrams.

If you want, I’ll make the actual README.md file at that size.

yes 

Yep — this is the size you meant. Around 2 pages, proper GitHub README, no unnecessary documentation dump.

Download the shorter README.md 

README.md
Document

README.md
IngredientIQ — Product Safety Intelligence

IngredientIQ is an AI-powered product safety analysis application for beauty and personal care products. It analyzes ingredients, checks selected user profiles, and generates an overall A–F product safety grade.

Features
Manual barcode entry and product lookup
Manual ingredient list analysis
Ingredient safety classification: SAFE, MODERATE, HAZARDOUS
Personalized checks for:
Sensitive Skin
Pregnancy
Diabetic
Vegan
Nut Allergy
Fragrance Allergy
Acne-Prone
Ingredient-level safety information
Safety distribution
Overall A–F product grade
React-based web interface
FastAPI REST backend
How It Works
Barcode / Ingredient Input
          |
          v
Ingredient Processing
          |
          v
Normalization & Reference Lookup
          |
          v
Safety Classification
          |
          v
Profile Matching
          |
          v
Product Scoring
          |
          v
A–F Safety Grade

The project uses a trained safety classifier stored in models/safety_classifier.pkl along with local ingredient reference data.

Technology Stack

Frontend

React
Vite
JavaScript
React Router
Axios
CSS

Backend & ML

Python
FastAPI
Pandas
NumPy
Scikit-learn
XGBoost
Joblib
PyArrow

Tools

Git / GitHub
Docker
Pytest
MLflow
Project Structure
IngredientIQ/
├── data/
│   └── reference/
│       ├── ingredient_safety.parquet
│       └── inci_synonyms.parquet
├── frontend/
│   └── react-app/
├── models/
│   └── safety_classifier.pkl
├── pipeline/
├── src/
│   ├── api/
│   ├── features/
│   ├── ingestion/
│   ├── models/
│   └── preprocessing/
├── tests/
├── requirements.txt
├── Dockerfile
├── .env.example
└── README.md
Installation
Backend
python -m venv venv
.env\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
Frontend
cd frontend
eact-app
npm install
Run the Application
Backend

From the project root:

uvicorn src.api.main:app --reload

Backend:

http://localhost:8000

API documentation:

http://localhost:8000/docs
Frontend

In another terminal:

cd frontend
eact-app
npm run dev

Frontend:

http://localhost:3000

The frontend .env should contain:

VITE_API_URL=http://127.0.0.1:8000
API Endpoints
Method	Endpoint	Purpose
GET	/health	API and model health
POST	/scan/barcode	Analyze a product barcode
POST	/ingredients/batch	Analyze multiple ingredients
GET	/ingredient/{name}	Look up an ingredient
GET	/profiles	Get available profiles
GET	/grades	Get grading information
Data Sources

Product information can be retrieved from:

OpenBeautyFacts
OpenFoodFacts

Local ingredient reference data is stored in:

data/reference/ingredient_safety.parquet
data/reference/inci_synonyms.parquet
Testing
pytest tests/ -v
Limitations
Product information depends on external database availability.
Some barcodes may not return product information.
Ingredient coverage depends on the available reference data.
Safety results are based on the project's model, reference data, and rules.
The A–F grade is an informational application-generated assessment, not a medical or regulatory certification.
The current application uses manual barcode entry; camera-based barcode scanning is not implemented.
Future Enhancements
Camera-based barcode scanning
Product label OCR
Expanded ingredient database
Explainable AI
Product comparison
Product history
Mobile application
Additional product data sources
License

MIT License.

This project is developed for educational and demonstration purposes.