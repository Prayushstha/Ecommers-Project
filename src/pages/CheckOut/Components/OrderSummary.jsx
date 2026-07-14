import dayjs from "dayjs";
import { CartItemDetails } from "../../../components/cartitemdetails.jsx";
export function OrderSummary({ deliveryOptions,products, loadCart, cart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.id} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

             <CartItemDetails cartItem={cartItem} loadCart={loadCart} product={products}  deliveryOptions={deliveryOptions}/>
            </div>
          );
        })}
    </div>
  );
}
