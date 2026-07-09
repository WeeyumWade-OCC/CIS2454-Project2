const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Location of the company data
const dataFile = path.join(__dirname, "static", "companies-data.json");

// Read companies from the JSON file
function getCompanies() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

// Save companies to the JSON file
function saveCompanies(companies) {
    fs.writeFileSync(dataFile, JSON.stringify(companies, null, 2));
}

// READ: Get all companies
app.get("/api/companies", (req, res) => {
    const companies = getCompanies();
    res.json(companies);
});

// READ: Get one company by its symbol
app.get("/api/companies/:symbol", (req, res) => {
    const companies = getCompanies();

    const company = companies.find(
        company =>
            company.symbol.toLowerCase() ===
            req.params.symbol.toLowerCase()
    );

    if (!company) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    res.json(company);
});

// CREATE: Add a new company
app.post("/api/companies", (req, res) => {
    const companies = getCompanies();

    const newCompany = {
        symbol: req.body.symbol,
        name: req.body.name,
        sector: req.body.sector
    };

    companies.push(newCompany);
    saveCompanies(companies);

    res.status(201).json(newCompany);
});

// UPDATE: Edit an existing company
app.put("/api/companies/:symbol", (req, res) => {
    const companies = getCompanies();

    const companyIndex = companies.findIndex(
        company =>
            company.symbol.toLowerCase() ===
            req.params.symbol.toLowerCase()
    );

    if (companyIndex === -1) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    companies[companyIndex] = {
        ...companies[companyIndex],
        ...req.body
    };

    saveCompanies(companies);

    res.json(companies[companyIndex]);
});

// DELETE: Remove an existing company
app.delete("/api/companies/:symbol", (req, res) => {
    const companies = getCompanies();

    const companyIndex = companies.findIndex(
        company =>
            company.symbol.toLowerCase() ===
            req.params.symbol.toLowerCase()
    );

    if (companyIndex === -1) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    const deletedCompany = companies.splice(companyIndex, 1);

    saveCompanies(companies);

    res.json({
        message: "Company deleted",
        company: deletedCompany[0]
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(
        `Company API is running at http://localhost:${PORT}`
    );
});