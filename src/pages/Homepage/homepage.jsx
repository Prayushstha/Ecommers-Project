import { NavBar } from "../../components/navbar.jsx";
import "../../styles/homepage.css";
import { Product } from "./Components/Product.jsx";

export function HomePage({ cart, products, loadCart,quantity,setQuantity }) {
  return (
    <>
      <NavBar cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
             <Product key={product.id} product={product} 
             quantity={quantity} setQuantity={setQuantity}
             loadCart={loadCart}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
