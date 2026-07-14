import "../styles/navbar.css";
import "../styles/tracking.css";
import { NavBar } from "../components/navbar.jsx";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import axios from "axios";

export function TrackingPage() {
  const { orderId, productId } = useParams();
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`).then((response) => {
      setTrackingOrder(response.data);
    })
  }, [orderId]);

  if (!trackingOrder) return null;

  const orderProduct = trackingOrder.products.find(p => p.productId === productId);

  if (!orderProduct) return null;


  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - trackingOrder.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - trackingOrder.orderTimeMs;
  const deliveryPercent = Math.min((timePassedMs / totalDeliveryTimeMs) * 100, 100);

  return (
    <>
      <title>Checkout</title>
      <NavBar />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="orders">
            View all orders
          </a>
          <Fragment key={orderProduct.productId}>
            <div className="delivery-date">
              {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
            </div>
            <div className="product-info">{orderProduct.product.name}</div>
            <div className="product-info">Quantity: {orderProduct.quantity}</div>
            <img className="product-image" src={orderProduct.product.image} />
            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
}
