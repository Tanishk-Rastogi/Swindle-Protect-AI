# Swindle-Protect AI

AI-powered fintech fraud detection platform.

## Features

- JWT Authentication
- Rule-based Fraud Detection
- Random Forest ML Fraud Prediction
- Dynamic Risk Scoring
- Alert Generation
- Analytics
- PostgreSQL Persistence

## Tech Stack

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL

Machine Learning:
- Random Forest
- joblib

Frontend (Upcoming):
- React
- Tailwind CSS
- Recharts

## API Endpoints

Authentication

POST /auth/register

POST /auth/login

GET /auth/me

Transactions

POST /transactions

GET /transactions

Alerts

GET /alerts

Analytics

GET /analytics

System

GET /

GET /health

## Fraud Detection Pipeline

Transaction

↓

Rule Engine

↓

ML Prediction

↓

Risk Engine

↓

Alert Engine

↓

PostgreSQL

↓

Analytics

## Project Structure

backend/

app/

config/

models/

routers/

schemas/

services/

utils/

ml/

main.py