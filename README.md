# M-one

## Architecture Overview
The application follows a RESTful architecture․

Technologies Used
Swagger: Implemented to document and visualize the API endpoints. Accessible at http://localhost:3000/api.
Passport.js: Used for implementing authentication, with passport-local for local login and passport-jwt for handling JWT tokens.
bcrypt: Used for securely hashing and storing passwords.
Joi: Used for input validation to ensure the integrity of the data being submitted.
Database
The application uses PostgreSQL, and all database queries are written using raw SQL instead of an ORM, as instructed.

## PostgreSQL tables

```bash

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INT
);

CREATE TABLE friend_request (
  id SERIAL PRIMARY KEY,
  from_id INT NOT NULL, //The user who is sending the request
  to_id INT NOT NULL, //The user who is receiving the request 
  FOREIGN KEY (from_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (to_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE friends (
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  PRIMARY KEY (from_id, to_id),
  FOREIGN KEY (from_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_id) REFERENCES users(id) ON DELETE CASCADE
);

```