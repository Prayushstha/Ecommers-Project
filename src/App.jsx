import "./App.css";
import { Routes, Route } from "react-router";
// Import pages
import { HomePage } from "./pages/homepage";
import { CheckOut } from "./pages/checkout";
import { Orders } from "./pages/orders";
import { TrackingPage } from "./pages/tracking";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const loadCart = async () => {
    axios
      .get("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      });
  };
  const [cart, setCart] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const response = axios.get(
      "http://localhost:3000/api/orders?expand=products",
    );
    setOrders(response.data);
    console.log(response.data);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} loadCart={loadCart} />}
        />
        <Route path="checkout" element={<CheckOut cart={cart} loadCart={loadCart}/>} />
        <Route path="orders" element={<Orders cart={cart} orders={orders} />} />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} orders={orders} />}
        />
      </Routes>
    </>
  );
}

export default App;
