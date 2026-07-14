import { DeliveryOptions } from "./deliveryOptions.jsx";
import { useState } from "react";
import { formatcurrency } from "../../../utils/price.js";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart, deliveryOptions }) {
  const updateCart = async (userInput) => {
    if (updateInput) {
      await axios.put(
        `http://localhost:3000/api/cart-items/${cartItem.productId}`, {
      
      quantity: userInput,
    });
    }
    await loadCart();
    setUpdateInput(!updateInput);
  };

  const deleteCartItem = async () => {
    await axios.delete(
      `http://localhost:3000/api/cart-items/${cartItem.productId}`
    );
    await loadCart();
  };
  const [updateInput, setUpdateInput] = useState(false);

  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          ${formatcurrency(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <input
            type="text"
            value={quantity}
            onChange={(e) => {
              const userInput = Number(e.target.value);
              setQuantity(userInput);
              console.log(userInput);
            }}
            className={
              updateInput
                ? "update-quantity-input-after"
                : "update-quantity-input"
            }
          />
          <span
            className="update-quantity-link link-primary"
            onClick={()=>updateCart(quantity)}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
        cartItem={cartItem}
      />
    </div>
  );
}
