import "./App.css";
import { Routes, Route } from "react-router";
// Import pages
import { HomePage } from "./pages/Homepage/homepage";
import { CheckOut } from "./pages/CheckOut/checkout";
import { Orders } from "./pages/orders";
import { TrackingPage } from "./pages/tracking";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";
function App() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [quantity, setQuantity] = useState(1);
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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(search? `http://localhost:3000/api/products?search=${search}`: `http://localhost:3000/api/products`).then((response) => {
      setProducts(response.data);
    });
  }, [search]);

  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/orders?expand=products",
    );
    setOrders(response.data);
  };
  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              products={products}
              loadCart={loadCart}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <CheckOut
              cart={cart}
              quantity={quantity}
              setQuantity={setQuantity}
              products={products}
              loadCart={loadCart}
            />
          }
        />
        <Route
          path="orders"
          element={
            <Orders
              cart={cart}
              products={products}
              orders={orders}
              loadCart={loadCart}
            />
          }
        />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} orders={orders} />}
        />
      </Routes>
    </>
  );
}

export default App;
