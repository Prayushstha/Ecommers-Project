import { NavBar } from "../components/navbar.jsx";
import "../styles/homepage.css";
import { Product } from "../components/Product.jsx";
export function HomePage({ cart, products, loadCart }) {

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
