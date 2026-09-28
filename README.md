# CrisisPilot

AI-Powered Supply Chain Crisis Intelligence Platform

## Overview

CrisisPilot is an AI-driven operational intelligence platform designed to help enterprises, logistics operators, and government organizations understand, assess, and respond to global disruption events.

The system continuously ingests live news feeds, identifies potential supply chain disruptions, evaluates operational risks, and recommends actionable response strategies.

Unlike traditional news monitoring tools, CrisisPilot focuses on operational decision support rather than information aggregation.

## Setup and Running (Windows)

### Requirements

- Node.js LTS and npm
- Python 3.11 or later
- Docker Desktop (for MongoDB and Elasticsearch), or accessible installations of these services
- A Gemini API key (for AI analysis and simulation requests)

### 1. Start MongoDB and Elasticsearch

With Docker Desktop running, execute these commands once in PowerShell:

```powershell
docker run -d --name crisispilot-mongo -p 27017:27017 mongo:7
docker run -d --name crisispilot-es -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.15.0
```

On subsequent runs, start the existing containers with:

```powershell
docker start crisispilot-mongo crisispilot-es
```

### 2. Set up and start the backend

In a new PowerShell terminal:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt pymongo "elasticsearch<9"
```

Create `backend/.env` and enter your Gemini API key:

```dotenv
GEMINI_API_KEY=buraya_gemini_api_anahtariniz
MONGODB_URI=mongodb://localhost:27017
```

Then, still from the `backend` directory, start the API:

```powershell
uvicorn app.main:app --reload --port 8000
```

Elasticsearch must be reachable for the backend to start. `GEMINI_API_KEY` is required for analysis and simulation requests. If you use MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 3. Set up and start the frontend

In a second PowerShell terminal:

```powershell
cd frontend
npm ci
npm run dev
```

The app is available at `http://localhost:3000`. Vite proxies `/api` requests to the backend at `http://localhost:8000`. The backend health check is at `http://localhost:8000/`, and the API documentation is at `http://localhost:8000/docs`.

The frontend does not require a `.env.local` file. Do not put secrets in the frontend; Git ignores `backend/.env`.

---

# Problem

Global supply chains are increasingly exposed to:

* Geopolitical conflicts
* Port closures
* Maritime disruptions
* Extreme weather events
* Trade restrictions
* Energy crises
* Transportation bottlenecks

Decision makers often receive fragmented information from multiple sources and lack a centralized system capable of translating events into operational actions.

CrisisPilot addresses this challenge by transforming raw disruption events into actionable intelligence.

---

# Key Features

## Live Event Monitoring

Continuously ingests global disruption news from RSS sources.

Examples:

* Geopolitical conflicts
* Port congestion
* Maritime incidents
* Trade sanctions
* Transportation disruptions

---

## AI Crisis Analysis

Each disruption event is analyzed using Gemini AI.

Generated insights include:

* Crisis severity
* Executive summary
* Recommended response strategy
* Supply chain impact
* Risk assessment
* Alternative logistics hubs
* Priority actions

---

## Historical Similarity Search

Before generating recommendations, CrisisPilot retrieves historically similar disruption events.

This improves:

* Recommendation quality
* Decision consistency
* Context awareness

---

## Impact Analysis

Visualizes how disruptions propagate through:

* Supply chains
* Industries
* Regions
* Economies

Provides:

* Dependency mapping
* Logistics impact
* Industry exposure
* Scenario simulations

---

## Response Planning

Generates operational recommendations including:

* Alternative routing strategies
* Mitigation actions
* Resource prioritization
* Risk reduction approaches

---

## Quantum Optimization Layer (In Progress)

Experimental optimization engine designed to evaluate alternative supply chain routes.

Future objectives:

* Route optimization
* Delay minimization
* Cost reduction
* Resource allocation

---

# System Architecture

```text
                ┌─────────────────┐
                │   RSS Sources   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ News Ingestion  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ MongoDB Storage │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Elasticsearch   │
                │ Similar Search  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Gemini Analysis │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Analysis Result │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ FastAPI Backend │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ React Frontend  │
                └─────────────────┘
```

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TanStack Query
* TailwindCSS

---

## Backend

* FastAPI
* Python

---

## Databases

### MongoDB

Stores:

* Events
* AI analyses
* Historical records

### Elasticsearch

Provides:

* Similar event retrieval
* Historical matching
* Semantic search

---

## AI Layer

### Gemini 2.5 Flash

Used for:

* Crisis classification
* Impact estimation
* Strategy generation
* Risk assessment

---

# Data Flow

## Step 1

RSS feeds are periodically fetched.

```text
RSS Feed
    ↓
News Event
```

---

## Step 2

Event is stored in MongoDB.

```text
News Event
    ↓
MongoDB
```

---

## Step 3

Event is indexed in Elasticsearch.

```text
MongoDB
    ↓
Elasticsearch
```

---

## Step 4

Historical similar events are retrieved.

```text
Current Event
      +
Historical Matches
```

---

## Step 5

Gemini generates operational analysis.

```text
Event
 +
Historical Context
      ↓
Gemini
      ↓
Analysis
```

---

## Step 6

Frontend consumes analysis through FastAPI.

```text
Analysis
    ↓
REST API
    ↓
Dashboard
```

---

# Database Schema

## Event

```json
{
  "_id": "...",

  "event_text": "...",

  "response": {
    "crisis_level": "...",

    "executive_summary": "...",

    "recommended_strategy": {
      "name": "...",
      "reason": "..."
    },

    "expected_outcome": {
      "delay_reduction_percent": 0,
      "cost_saving_percent": 0,
      "risk_reduction_percent": 0
    },

    "top_actions": [],

    "supply_chain_impact": {
      "delay_days": 0,
      "cost_increase_percent": 0
    },

    "recommended_hubs": [],

    "secondary_risks": [],

    "confidence_score": 0
  },

  "created_at": "..."
}
```

---

# API Endpoints

## Events

```http
GET /events
```

Returns all analyzed events.

---

## Event Detail

```http
GET /events/{id}
```

Returns detailed event information.

---

## Search

```http
GET /events/search?q=
```

Searches stored events.

---

## Ingestion

```http
GET /analysis/ingest
```

Triggers RSS ingestion pipeline.

---

# Impact Analysis Module

The Impact Analysis page visualizes:

## Industry Impact

* Manufacturing
* Retail
* Energy

---

## Logistics Routing

Alternative hubs:

* Dubai
* Singapore
* Rotterdam
* Others

---

## Cascading Dependency Map

```text
Source Event
      ↓
Supply Chain
      ↓
Industries
      ↓
Regions
      ↓
Economic Impact
```

---

## AI Reasoning Log

Displays:

* Executive summary
* Strategy reasoning
* Risk explanations

---

## What-if Simulations

Future capability:

```text
Port Closure
      ↓
Delay Projection
      ↓
Cost Projection
      ↓
Mitigation Recommendation
```

---

# Reliability Strategy

Gemini failures are handled through fallback responses.

If Gemini becomes unavailable:

```text
Gemini Failure
      ↓
Fallback Strategy
      ↓
Application Continues
```

This prevents platform downtime during API outages.

---

# Team

CrisisPilot was developed as an intelligent crisis response platform focused on operational resilience, supply chain continuity, and AI-assisted decision making.


