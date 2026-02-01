import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("https://food-backend-app-pvw1.onrender.com/api/myOrderData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        setOrders(data.orderData || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, [email]);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="card my-3 shadow-sm">
            <div className="card-header">
              <strong>Date:</strong> {new Date(order.order_date).toLocaleString()}
            </div>
            <ul className="list-group list-group-flush">
              {order.items.map((item, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between">
                  <span>
                    {item.name} (x{item.qty}) - {item.size}
                  </span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}



