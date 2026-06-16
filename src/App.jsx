import "./App.css";
import { Routes, Route } from "react-router";
// Import pages
import { HomePage } from "./pages/homepage";
import { CheckOut } from "./pages/checkout";
import { Orders } from "./pages/orders";
import { TrackingPage } from "./pages/tracking";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="orders" element={<Orders/>}/>
        <Route path="tracking" element={<TrackingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
