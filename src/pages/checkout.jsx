import "../styles/checkout.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "../components/checkoutOrderSummary";
import { PaymentSummary } from "../components/checkoutPaymentSummary";
import { CheckOutHeader } from "../components/checkoutHeader";
export function CheckOut({ cart,products, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime",
      )
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);
  useEffect(()=>{
     axios.get("http://localhost:3000/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  },[cart])


  return (
    <>
      <title>Checkout</title>
      <CheckOutHeader cart={cart}/>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
            cart={cart}
            products={products}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} cart={cart}/>
        </div>
      </div>
    </>
  );
}
