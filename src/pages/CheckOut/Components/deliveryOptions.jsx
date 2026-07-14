import { formatcurrency } from "../../../utils/price";
import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOptions({deliveryOptions, loadCart, cartItem}){
    return (
        <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  {deliveryOptions.map((deliveryOption) => {
                    let priceString = "Free Shipping";
                    if (deliveryOption.priceCents > 0) {
                      priceString = `${formatcurrency(deliveryOption.priceCents)} - Shipping`;
                    }
                    return (
                      <div key={deliveryOption.id} className="delivery-option">
                        <input
                          type="radio"
                          checked={
                            deliveryOption.id === cartItem.deliveryOptionId
                          }
                          onChange={async () => {
                            await axios.put(
                              `/api/cart-items/${cartItem.productId}`,
                              {
                                 deliveryOptionId: deliveryOption.id
                              },
                            );
                            await loadCart();
                          }}
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.product.id}`}
                        />
                        <div>
                          <div className="delivery-option-date">
                            {dayjs(
                              deliveryOption.estimatedDeliveryTimeMs,
                            ).format("dddd, MMMM D")}
                          </div>
                          <div className="delivery-option-price">
                            {priceString}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
    )
}