import React from 'react';
import BurgurImg from '../assets/images/pexels-valeriya-1639562.jpg';
import PizzaImg from '../assets/images/image.png';
import PasteryImg from '../assets/images/image1.png';

export default function Carousel({ setSearch }) {
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: '10' }}>
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

          <div className="carousel-item active">
            <img src={BurgurImg} className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="burger" />
          </div>
          <div className="carousel-item">
            <img src={PizzaImg} className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src={PasteryImg} className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="Pastery" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

