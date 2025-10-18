
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-light">
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
          <h5 className="text-dark">FoodApp</h5>
        </Link>
        <span className="text-muted fw-bold">© 2025 FoodApp, Inc</span>
      </div>

     
    </footer>
  );
}

