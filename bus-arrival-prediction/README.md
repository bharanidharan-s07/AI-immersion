# BUS ARRIVAL TIME PREDICTION SYSTEM

A Full Stack Web Application utilizing **React.js**, **Node.js & Express.js**, **Python Machine Learning (Random Forest Regression)**, and **MongoDB** to accurately predict public bus arrival times.

---

## Table of Contents
1. [Project Introduction](#1-project-introduction)
2. [Problem Statement](#2-problem-statement)
3. [Objectives](#3-objectives)
4. [Existing System](#4-existing-system)
5. [Proposed System](#5-proposed-system)
6. [Technologies Used](#6-technologies-used)
7. [Machine Learning Algorithm](#7-machine-learning-algorithm)
8. [Dataset Description](#8-dataset-description)
9. [System Architecture](#9-system-architecture)
10. [Folder Structure](#10-folder-structure)
11. [Installation Steps](#11-installation-steps)
12. [How to Run Frontend](#12-how-to-run-frontend)
13. [How to Run Backend](#13-how-to-run-backend)
14. [How to Train ML Model](#14-how-to-train-ml-model)
15. [How Prediction Works](#15-how-prediction-works)
16. [API Documentation](#16-api-documentation)
17. [Future Enhancements](#17-future-enhancements)
18. [Conclusion](#18-conclusion)

---

## 1. Project Introduction
Public transit reliability is a cornerstone of smart cities and urban transportation. Unpredictable bus arrival times caused by fluctuating traffic, varying route lengths, peak-hour bottlenecks, and dispatch headway intervals lead to extended commuter wait times and diminished transit adoption. 

The **Bus Arrival Time Prediction System** is a production-grade, end-to-end full stack web application designed to forecast bus arrival durations with high accuracy. By combining an intuitive React frontend, a resilient Node.js/Express API layer, an ensemble Random Forest regression model in Python, and persistent MongoDB storage, the system provides real-time, data-driven arrival estimates.

---

## 2. Problem Statement
Traditional transit systems rely on static timetable schedules that fail to account for dynamic road conditions. Passengers face:
- Prolonged, stressful waiting times at bus stops.
- Inability to plan multimodal connections reliably.
- Increased peak-hour congestion at stations.
- Lack of centralized historical journey tracking.

There is a critical need for an intelligent predictive system that consumes dynamic spatial and temporal factors to calculate accurate estimated arrival times (ETAs).

---

## 3. Objectives
- **Accurate Arrival Forecasting**: Predict the arrival time (in minutes) based on route distance, real-time traffic levels, departure hour, and bus headway frequencies.
- **Modern Full Stack Architecture**: Implement a decoupled, modular architecture adhering to modern industry standards.
- **Machine Learning Integration**: Employ Random Forest Regression to model non-linear traffic and congestion patterns.
- **Historical Record Persistence**: Store every prediction run in a MongoDB database with timestamps and route information.
- **Beginner-Friendly Deployment**: Ensure students, researchers, and developers can execute the complete pipeline locally in VS Code with minimal configuration.

---

## 4. Existing System
- Relies on static timetable schedules printed on boards or fixed PDF charts.
- Ignores real-time traffic density (rush hour spikes, congestion bottlenecks).
- Does not correlate bus dispatch frequencies with passenger wait times.
- Possesses no predictive machine learning capabilities.
- Lack of automated historical tracking or performance evaluation.

---

## 5. Proposed System
- **Dynamic Feature Ingestion**: Accepts bus identifier, origin, destination, distance (km), traffic status (Low, Medium, High), current time, and frequency.
- **Ensemble Machine Learning**: Utilizes Scikit-learn's `RandomForestRegressor` trained on transit telemetry data to deliver robust non-linear regression predictions.
- **Sub-process Interoperability**: Node.js backend seamlessly coordinates with the Python inference engine via child processes.
- **MongoDB Data Retention**: Persists each prediction into a Mongoose-managed document collection for retrospective review.
- **Responsive User Interface**: Built with React, featuring field validation, clear error boundaries, dynamic ETA clock calculations, and history logs.

---

## 6. Technologies Used

### Frontend
- **React.js**: Declarative UI component library.
- **JavaScript (ES6+)**: Core frontend scripting language.
- **React Router (v6)**: Client-side routing across Home, Prediction, Result, and History pages.
- **Axios**: Promise-based HTTP client for API communications.
- **Lucide Icons**: Clean, modern iconography.
- **CSS3 / Tailwind**: Responsive styling with responsive mobile-friendly layouts.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: RESTful web application framework.
- **CORS**: Cross-Origin Resource Sharing middleware.
- **Dotenv**: Environment variable configuration management.
- **Child Process (`spawn`)**: Inter-process communication to invoke Python ML scripts.

### Machine Learning
- **Python 3**: Core language for data science and ML.
- **Pandas**: Tabular data manipulation and CSV processing.
- **NumPy**: Numerical computation array support.
- **Scikit-learn**: Random Forest Regression implementation and evaluation metrics.
- **Joblib**: Model serialization and deserialization (`.pkl`).

### Database
- **MongoDB**: NoSQL document database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB validation and schemas.

---

## 7. Machine Learning Algorithm: Random Forest Regression

### Concept
Random Forest is an ensemble learning algorithm that constructs a multitude of decision trees during training. For regression tasks, the output is the mean prediction of the individual trees:

$$\hat{y} = \frac{1}{N} \sum_{i=1}^{N} T_i(x)$$

### Advantages for Transit Prediction
1. **Handles Non-Linearity**: Non-linear relationships between traffic congestion, time of day (rush hours), and travel duration are modeled naturally without overfitting.
2. **Feature Robustness**: Resilient to outliers and variance across different distance brackets.
3. **High Explainability**: Enables computation of Mean Absolute Error (MAE) and Coefficient of Determination ($R^2$).

### Model Parameters
- Number of Trees (`n_estimators`): 100
- Maximum Tree Depth (`max_depth`): 10
- Splitting Criterion: Squared Error
- Train/Test Split: 80% / 20%
- Target Metric: $R^2 \ge 0.92$, $\text{MAE} \approx 2.1\text{ mins}$

---

## 8. Dataset Description
The dataset (`ml/dataset/bus_data.csv`) contains historical transit runs with the following schema:

| Column Name | Data Type | Description | Example Values |
| :--- | :--- | :--- | :--- |
| `distance` | Float | Route distance in kilometers | `5.2`, `14.8`, `28.0` |
| `traffic` | Categorical / Int | Traffic condition (Low=1, Medium=2, High=3) | `1`, `2`, `3` |
| `time` | Float | Departure time in decimal hours (e.g., 8.5 = 08:30) | `8.0`, `8.5`, `17.5` |
| `bus_frequency` | Int / Float | Interval between consecutive buses in minutes | `5`, `12`, `20` |
| **`arrival_time`** | Float | **Target**: Actual observed arrival time in minutes | `14.5`, `36.5`, `82.6` |

---

## 9. System Architecture

```
+-------------------------------------------------------------+
|                      React Frontend                         |
|   (Home, PredictionForm, PredictionCard, History Table)     |
+-------------------------------------------------------------+
                              |
                     Axios HTTP Request
                              v
+-------------------------------------------------------------+
|                Node.js + Express Backend                    |
|   - Express Routing (/api/predict, /api/history)            |
|   - Request Body Validation                                 |
|   - Child Process Spawning                                  |
+-------------------------------------------------------------+
         |                                           |
    Spawn Python                                Mongoose ODM
         v                                           v
+-----------------------------+             +-----------------+
|      Python ML Engine       |             |     MongoDB     |
| - Loads bus_model.pkl       |             |  Stores journey |
| - Random Forest Regressor   |             |  & ETA history  |
| - Returns JSON Prediction   |             +-----------------+
+-----------------------------+
```

---

## 10. Folder Structure

```
bus-arrival-prediction/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   └── PredictionCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Prediction.jsx
│   │   │   ├── Result.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── predictionRoutes.js
│   ├── controllers/
│   │   └── predictionController.js
│   ├── models/
│   │   └── Prediction.js
│   ├── package.json
│   └── .env
│
├── ml/
│   ├── train_model.py
│   ├── predict.py
│   ├── requirements.txt
│   ├── dataset/
│   │   └── bus_data.csv
│   └── model/
│       └── bus_model.pkl
│
├── .gitignore
└── README.md
```

---

## 11. Installation Steps

### Prerequisites
1. **Node.js**: Version 18.x or higher (`node -v`)
2. **Python**: Version 3.8 or higher (`python3 --version` or `python --version`)
3. **MongoDB**: Local Community Edition running or MongoDB Atlas cloud connection URI.

---

## 12. How to Run Frontend

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd bus-arrival-prediction/frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web interface at `http://localhost:5173`.

---

## 13. How to Run Backend

1. Open a separate terminal and navigate to the backend folder:
   ```bash
   cd bus-arrival-prediction/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (optional, defaults provided):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/bus_prediction_db
   PYTHON_PATH=python3
   ```
4. Start the server:
   ```bash
   npm start
   # or with live reloading:
   npm run dev
   ```
5. The API will listen on `http://localhost:5000`.

---

## 14. How to Train ML Model

1. Navigate to the `ml/` directory:
   ```bash
   cd bus-arrival-prediction/ml
   ```
2. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the training script:
   ```bash
   python train_model.py
   # On macOS/Linux:
   python3 train_model.py
   ```
4. Output will show:
   - Dataset shape and sample count
   - Train/Test distribution
   - **Mean Absolute Error (MAE)**
   - **R² Accuracy Score**
   - Confirmation of model saved to `ml/model/bus_model.pkl`.

---

## 15. How Prediction Works
1. The user inputs journey metrics in `PredictionForm.jsx`.
2. The form validates that numeric values (distance, frequency) are positive.
3. Axios sends an asynchronous `POST` to `/api/predict`.
4. `predictionController.js` validates payload fields and invokes `python3 ml/predict.py <input_payload>` via `child_process.spawn`.
5. `predict.py` executes the Random Forest regression algorithm and returns JSON to stdout.
6. The controller captures the result, saves the record to MongoDB via Mongoose, and responds with HTTP 201.
7. React receives the payload and redirects to `Result.jsx`, displaying the arrival time and calculated clock ETA.

---

## 16. API Documentation

### 1. Predict Bus Arrival Time
- **Endpoint**: `POST /api/predict`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "busNumber": "Route 101 - Express",
    "source": "Downtown Terminal",
    "destination": "Science City",
    "distance": 14.5,
    "traffic": "Medium",
    "time": "08:45",
    "busFrequency": 15
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Bus arrival time predicted successfully",
    "data": {
      "_id": "664c1234567890abcdef1234",
      "busNumber": "Route 101 - Express",
      "source": "Downtown Terminal",
      "destination": "Science City",
      "distance": 14.5,
      "traffic": "Medium",
      "time": "08:45",
      "busFrequency": 15,
      "predictedArrival": 36.8,
      "createdAt": "2026-09-18T04:30:00.000Z"
    }
  }
  ```

### 2. Get Prediction History
- **Endpoint**: `GET /api/history`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 12,
    "data": [
      {
        "_id": "664c1234567890abcdef1234",
        "busNumber": "Route 101 - Express",
        "source": "Downtown Terminal",
        "destination": "Science City",
        "distance": 14.5,
        "traffic": "Medium",
        "time": "08:45",
        "busFrequency": 15,
        "predictedArrival": 36.8,
        "createdAt": "2026-09-18T04:30:00.000Z"
      }
    ]
  }
  ```

### 3. Clear Prediction History
- **Endpoint**: `DELETE /api/history`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Prediction history cleared successfully"
  }
  ```

---

## 17. Future Enhancements
- **GPS Telemetry Ingestion**: Direct integration with onboard IoT GPS trackers on transit fleets.
- **Weather Factor Integration**: Incorporate rainfall, snow, and road visibility data.
- **Passenger Crowdsourcing**: Allow passengers at bus stops to submit live congestion feedback.
- **Multi-Route Transfer Suggestions**: Recommend alternative transfer connections when a route experiences heavy delays.

---

## 18. Conclusion
The **Bus Arrival Time Prediction System** delivers a robust, accessible, and scientifically grounded solution to public transit scheduling uncertainty. By integrating modern frontend ergonomics, resilient backend processing, ensemble machine learning, and scalable database persistence, this project stands as a comprehensive, production-ready college capstone implementation.
