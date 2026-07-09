# Project 2 - Full Stack CRUD Application

## Project Description

This project connects a React frontend to a Node.js and Express backend API. The application uses company information stored in a JSON file and allows the user to create, read, update, and delete company records.

The frontend communicates with the backend using HTTP requests:

- POST requests create new company records.
- GET requests retrieve and display company records.
- PUT requests update existing company records.
- DELETE requests remove company records.

## Project Structure

- `frontend` contains the React application.
- `backend` contains the Node.js and Express API.
- `backend/static/companies-data.json` stores the company information.

## Running the Project

### Start the Backend

Open a terminal and enter:

```bash
cd backend
npm install
node server.js
```

The backend API runs at:

```text
http://localhost:3000
```

### Start the Frontend

Open a second terminal and enter:

```bash
cd frontend
npm install
npm run dev
```

Open the local address provided by Vite in a web browser.

## CRUD Operations

| Operation | HTTP Method | API Endpoint |
| --- | --- | --- |
| Create a company | POST | `/api/companies` |
| Read all companies | GET | `/api/companies` |
| Read one company | GET | `/api/companies/:symbol` |
| Update a company | PUT | `/api/companies/:symbol` |
| Delete a company | DELETE | `/api/companies/:symbol` |

## Self-Assessment

| Rubric Criterion | Score | Assessment |
| --- | ---: | --- |
| Frontend interacts with Create endpoint using POST requests | 3/3 | The React form sends a POST request to the Node.js API and successfully adds a new company to the JSON data. |
| Frontend interacts with Read endpoint using GET requests | 3/3 | The React frontend sends a GET request and displays company information returned by the API. |
| Frontend interacts with Update endpoint using PUT requests | 3/3 | The Edit feature loads a company's information into the form and sends a PUT request to save the changes. |
| Frontend interacts with Delete endpoint using DELETE requests | 3/3 | The Delete button asks the user for confirmation and sends a DELETE request that removes the selected company. |
| Backend in Node.js | 3/3 | The backend was created using Node.js and Express and reads and writes company information in a JSON file. |
| **Total** | **15/15** | All required CRUD operations were implemented and tested successfully. |

## Technologies Used

- React
- Vite
- JavaScript
- Node.js
- Express
- HTML
- CSS
- JSON