import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/companies";

function App() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    sector: "",
  });
  const [editingSymbol, setEditingSymbol] = useState(null);
  const [message, setMessage] = useState("");

  // READ: Get company data from the Node API
  async function getCompanies() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Display only the first 25 companies
      setCompanies(data.slice(0, 25));
    } catch (error) {
      setMessage("Unable to retrieve company data.");
      console.error(error);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // CREATE: Send a POST request to add a company
  async function addCompany(event) {
    event.preventDefault();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage(`${formData.name} was added successfully.`);
      clearForm();
      getCompanies();
    }
  }

  function startEditing(company) {
    setEditingSymbol(company.symbol);

    setFormData({
      symbol: company.symbol,
      name: company.name,
      sector: company.sector,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // UPDATE: Send a PUT request to edit a company
  async function updateCompany(event) {
    event.preventDefault();

    const response = await fetch(
      `${API_URL}/${editingSymbol}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setMessage(`${formData.name} was updated successfully.`);
      clearForm();
      getCompanies();
    }
  }

  // DELETE: Send a DELETE request to remove a company
  async function deleteCompany(symbol, name) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(
      `${API_URL}/${symbol}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setMessage(`${name} was deleted successfully.`);
      getCompanies();
    }
  }

  function clearForm() {
    setFormData({
      symbol: "",
      name: "",
      sector: "",
    });

    setEditingSymbol(null);
  }

  return (
    <main>
      <header>
        <h1>Company Manager</h1>
        <p>
          A React frontend connected to a Node.js CRUD API
        </p>
      </header>

      <section className="form-card">
        <h2>
          {editingSymbol
            ? "Update Company"
            : "Add a Company"}
        </h2>

        <form
          onSubmit={
            editingSymbol
              ? updateCompany
              : addCompany
          }
        >
          <label>
            Stock Symbol
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="Example: MSFT"
              required
            />
          </label>

          <label>
            Company Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Microsoft"
              required
            />
          </label>

          <label>
            Sector
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              placeholder="Example: Information Technology"
              required
            />
          </label>

          <div className="form-buttons">
            <button type="submit">
              {editingSymbol
                ? "Save Changes"
                : "Add Company"}
            </button>

            {editingSymbol && (
              <button
                type="button"
                className="cancel-button"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}
      </section>

      <section className="company-section">
        <div className="company-heading">
          <div>
            <h2>Companies</h2>
            <p>
              Showing the first 25 companies returned
              by the API
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={getCompanies}
          >
            Refresh Companies
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map(company => (
                <tr key={company.symbol}>
                  <td>
                    <strong>
                      {company.symbol}
                    </strong>
                  </td>

                  <td>{company.name}</td>

                  <td>{company.sector}</td>

                  <td className="actions">
                    <button
                      className="edit-button"
                      onClick={() =>
                        startEditing(company)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteCompany(
                          company.symbol,
                          company.name
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;