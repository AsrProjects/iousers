import React, { useState } from "react";
import axios from "axios";

const LoanForm = () => {
  const [name, setName] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setResult(null);

      const response = await axios.post("http://localhost:8080/api/loans/check", {
        name,
        creditScore: parseInt(creditScore),
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while checking loan eligibility.");
    }
  };

  return (
    <div>
      <h1>Loan Eligibility Check</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Credit Score"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          required
        />
        <button type="submit">Check Eligibility</button>
      </form>
      {result && (
        <div>
          <h3>Result</h3>
          <p>Eligible: {result.eligible ? "Yes" : "No"}</p>
          <p>Message: {result.message}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoanForm;
