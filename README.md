# Swindle-Protect AI

An AI-powered fintech fraud detection platform that combines rule-based analysis and machine learning to identify potentially fraudulent transactions, generate alerts, and provide risk analytics.

## Overview

Swindle-Protect AI is a full-stack fraud detection system designed to simulate how modern fintech platforms assess transaction risk. The platform evaluates transactions using a hybrid approach that combines business rules with a machine learning model to produce a final risk score and trigger fraud alerts.

## Features

* JWT-based Authentication & Authorization
* User Registration and Login
* Rule-Based Fraud Detection Engine
* Machine Learning Fraud Prediction (Random Forest)
* Dynamic Risk Scoring System
* Fraud Alert Generation
* Transaction Monitoring
* Analytics Dashboard Support
* PostgreSQL Database Integration
* RESTful API Architecture

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Pydantic

### Machine Learning

* Scikit-learn
* Random Forest Classifier
* Joblib

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* Axios

### Deployment

* Render (Backend)
* Vercel (Frontend)

## System Architecture

Transaction Request

→ Rule-Based Fraud Engine

→ Machine Learning Prediction

→ Risk Scoring Engine

→ Alert Generation

→ PostgreSQL Storage

→ Analytics Dashboard

## API Endpoints

### Authentication

* POST `/auth/register`
* POST `/auth/login`
* GET `/auth/me`

### Transactions

* POST `/transactions`
* GET `/transactions`

### Alerts

* GET `/alerts`

### Analytics

* GET `/analytics`

### System

* GET `/`
* GET `/health`

## Project Structure

```text
backend/
│
├── config/
├── models/
├── routers/
├── schemas/
├── services/
├── utils/
├── ml/
└── main.py

frontend/
│
├── src/
│   ├── pages/
│   ├── services/
│   ├── components/
│   └── layouts/
└── public/
```

## Key Learning Outcomes

* Designing REST APIs using FastAPI
* Implementing JWT Authentication
* Integrating Machine Learning into production APIs
* Working with PostgreSQL and SQLAlchemy ORM
* Deploying full-stack applications using Render and Vercel
* Debugging real-world deployment and database issues
* Building analytics-driven applications

## Future Improvements

* Advanced fraud detection models
* Transaction history filtering
* Email and SMS alert integration
* Role-based access control
* Docker containerization
* Automated testing pipeline

## Author

Tanishk Rastogi
B.Tech CSE (AI & ML)
