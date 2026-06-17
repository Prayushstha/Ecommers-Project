import "../styles/navbar.css";
import "../styles/tracking.css";
import { NavBar } from "../components/navbar.jsx";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import axios from "axios";

export function TrackingPage({ orders }) {
  const {orderId,productId} = useParams();
  const [trackingOrder,setTrackingOrder] = useState(null);
  
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/orders/${orderId}?expand=products`).then((response)=>{
      setTrackingOrder(response.data);
      console.log(response.data)
    })
  },[orderId])
  if(!trackingOrder) return null;
  return (
    <>
      <title>Checkout</title>
    <NavBar/>
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="orders">
            View all orders
          </a>
          {
         
            trackingOrder.find((item) => {
              return (
                <Fragment key={item.productId}>
                  <div className="delivery-date">
                    {dayjs(item.estimatedDeliveryTimeMs).format('MMMM D')}
                  </div>
                  <div className="product-info">{item.product.name}</div>
                  <div className="product-info">Quantity: {item.quantity}</div>
                  <img
                    className="product-image"
                    src={item.product.image}
                  />

                  <div className="progress-labels-container">
                    <div className="progress-label">Preparing</div>
                    <div className="progress-label current-status">Shipped</div>
                    <div className="progress-label">Delivered</div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                  </div>
                </Fragment>
              )
            )
          }
        </div>
      </div>
    </>
  );
}
