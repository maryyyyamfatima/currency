import logo from "./Images/curr.png";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [exchangerate, setExchangeRate] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRate(response.data.rates);
      })
      .catch((error) => {
        console.error("error fetching echange rates:", error);
      });
    //axios ki help se api call krengy
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangerate && exchangerate[toCurrency]; // Check if exchangerate is defined
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2)); //toFixed to remove point values
    }
  }, [amount, fromCurrency, toCurrency, exchangerate]);

  const handleChange = (e) => {
    const { name, value } = e.target; //destructure kr k grab krna hai

    switch (name) {
      case "amount":
        setAmount(value);
        break;
      case "fromCurrency":
        setFromCurrency(value);
        break;
      case "toCurrency":
        setToCurrency(value);
        break;
    }
  };

  return (
    <div className="card">
      <img src={logo} width="60"></img>
      <h1 className="text-6x1">Currency Convertor</h1>

      <div className="currency_exchange">
        <div className="input_container">
          <label className="input_label">Amount:</label>
          <input
            type="number"
            name="amount"
            value={amount}
            className="input_field"
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label className="input_label">From Currency:</label>
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={handleChange}
            className="input_field"
          >
            {exchangerate &&
              Object.keys(exchangerate).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <div className="input_container">
          <label className="input_label">To Currency:</label>
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={handleChange}
            className="input_field"
          >
            {exchangerate &&
              Object.keys(exchangerate).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="output">
        <h2>
          Converted amount:<b>{convertedAmount}</b>
        </h2>
      </div>
    </div>
  );
}

export default App;
