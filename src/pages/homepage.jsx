import { NavBar } from "../components/navbar.jsx";
import "../styles/homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../components/Product.jsx";
export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <NavBar cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
             <Product key={product.id} product={product} loadCart={loadCart}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
