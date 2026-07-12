import { useState,useRef } from "react";
import { formatcurrency } from "../utils/price.js";
import axios from "axios";

export function Product({ product, loadCart }) {
  const [addedToCart,setAddedToCart] = useState(false);
  const addedRef = useRef();

  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    console.log("sending productID", product.id);
    await axios.post("http://localhost:3000/api/cart-items", {
      productId: product.id,
      quantity
    });
    await loadCart();
    setAddedToCart(!addedToCart)
  };

  const quantitySelector = (e) => {
    const quantitySelected = Number(e.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div key={product.id} className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>
      <div className="product-name limit-text-to-2-lines">{product.name}</div>
      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>
      <div className="product-price">${formatcurrency(product.priceCents)}</div>
      <div className="product-quantity-container">
        <select value={quantity} onChange={quantitySelector}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="product-spacer"></div>
      <div className="added-to-cart" ref={addedRef} style={addedToCart? {opacity: 1} : {}}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>
      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
