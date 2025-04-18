import React from 'react'
import './App.css'
import { useState } from "react";
import FoodOrderForm from './components/OrderForm'
import Invoice from "./components/Invoice";

function App(){
    const [orderData, setOrderData] = useState(null);

const handleOrderSubmit = (data) => {
  setOrderData(data);
};

const resetForm = () => {
  setOrderData(null);
};

return (
  <div className="App">
    <h1 className="text-center text-4xl mb-11">🍔 سیستم سفارش غذا</h1>
    {!orderData ? (
      <FoodOrderForm onSubmitOrder={handleOrderSubmit} />
    ) : (
      <Invoice data={orderData} onReset={resetForm} />
    )}
  </div>
);
}

export default App;
