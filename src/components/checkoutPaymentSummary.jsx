import { formatcurrency } from "../utils/price";

export function PaymentSummary({ paymentSummary, cart }) {
  let totalQuantity = 0;
  cart.forEach((element) => {
    totalQuantity += element.quantity;
  });
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({totalQuantity}):</div>
            <div className="payment-summary-money">
              ${formatcurrency(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              ${formatcurrency(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              ${formatcurrency(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              ${formatcurrency(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              ${formatcurrency(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary">
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
