import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card({ item }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const options = item.options && item.options.length > 0 ? item.options[0] : {};
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const finalPrice = qty * parseInt(options[size] || 0);

  const handleAddToCart = async () => {
    const existingItem = data.find(cartItem => cartItem.id === item._id && cartItem.size === size);

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        size: size,
        qty: qty,
        price: finalPrice
      });
    } else {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: item.img
      });
    }
  };

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceRef.current.value);
    }
  }, [priceOptions]);

  return (
    <div className="card m-2" style={{ width: "18rem", maxHeight: "420px" }}>
      {/* Image */}
      <img
        src={item.img}
        className="card-img-top"
        alt={item.name}
        style={{ height: "160px", objectFit: "cover" }}
      />

      {/* Body */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>

        <div className="d-flex align-items-center mb-2">
          {/* Quantity */}
          <select
            className="form-select me-2"
            style={{ width: "60px" }}
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size / Price Options */}
          <select
            className="form-select"
            ref={priceRef}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.length > 0 ? (
              priceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} - ₹{options[opt]}
                </option>
              ))
            ) : (
              <option disabled>No options</option>
            )}
          </select>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fs-5">₹{finalPrice}/-</span>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

