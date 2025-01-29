A class should have only one reason to change, meaning it should have only one job or responsibility.
class Invoice:
    def __init__(self, amount):
        self.amount = amount

class InvoicePrinter:
    def print_invoice(self, invoice):
        print(f"Invoice amount: {invoice.amount}")
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.
class Bird:
    def fly(self):
        print("Flying")
    
class Duck(Bird):
    def swim(self):
        print("Swimming")

class Ostrich(Bird):
    def fly(self):
        raise NotImplementedError("Ostriches can't fly")
Clients should not be forced to depend on interfaces they do not use.
class Printer:
    def print(self):
        pass

class Scanner:
    def scan(self):
        pass

class MultiFunctionPrinter(Printer, Scanner):
    def print(self):
        print("Printing...")
    
    def scan(self):
        print("Scanning...")
High-level modules should not depend on low-level modules. Both should depend on abstractions. Also, abstractions should not depend on details. Details should depend on abstractions.
class Database:
    def connect(self):
        pass

class User:
    def __init__(self, database: Database):
        self.database = database
    
    def save(self):
        self.database.connect()
        print("Saving user")

SRP: One responsibility per class.
OCP: Classes should be open for extension but closed for modification.
LSP: Subtypes must be substitutable for their base types.
ISP: Avoid forcing a class to implement unnecessary methods.
DIP: High-level modules should depend on abstractions, not concrete classes.






















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
