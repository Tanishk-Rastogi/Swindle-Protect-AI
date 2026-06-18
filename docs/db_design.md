# Database Design

## Users

- id (UUID)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- role (VARCHAR)
- created_at (TIMESTAMP)

## Transactions

- id (UUID)
- user_id (FK)
- amount (DECIMAL)
- merchant (VARCHAR)
- location_id (FK)
- device_id (FK)
- timestamp (TIMESTAMP)
- risk_score (INTEGER)
- is_fraud (BOOLEAN)

## Devices

- id (UUID)
- user_id (FK)
- device_name (VARCHAR)
- device_type (VARCHAR)
- ip_address (VARCHAR)
- last_used (TIMESTAMP)

## Locations

- id (UUID)
- city (VARCHAR)
- state (VARCHAR)
- country (VARCHAR)
- latitude (DECIMAL)
- longitude (DECIMAL)

## Alerts

- id (UUID)
- user_id (FK)
- transaction_id (FK)
- severity (VARCHAR)
- message (TEXT)
- status (VARCHAR)
- created_at (TIMESTAMP)