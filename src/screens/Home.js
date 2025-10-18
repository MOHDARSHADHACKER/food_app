import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import FoodService from "../services/FoodService";
import { Modal, Button } from "react-bootstrap";
import MyOrders from "../components/MyOrder"; // 👈 yeh import zaroori hai

function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState(""); 

    // 👇 modal ke liye state
    const [showOrders, setShowOrders] = useState(false);
    const handleShowOrders = () => setShowOrders(true);
    const handleCloseOrders = () => setShowOrders(false);

    useEffect(() => {
        FoodService.getAll()
            .then((res) => {
                setFoodItems(res.data.foodItems);
                setCategories(res.data.categories);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    const filteredFoodItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-black text-white min-h-screen">
            {/* 👇 Navbar me prop bhejna zaroori hai */}
            <Navbar handleShowOrders={handleShowOrders} /> 

            <Carousel setSearch={setSearch} />

            <div className="container mt-4">
                {categories.map((cat) => {
                    const catItems = filteredFoodItems.filter(item => item.CategoryName === cat.CategoryName);

                    if (catItems.length === 0) return null;

                    return (
                        <div key={cat._id} className="mb-4">
                            <h2 className="mt-3">{cat.CategoryName}</h2>
                            <div className="row">
                                {catItems.map((item) => (
                                    <div className="col-12 col-md-6 col-lg-3" key={item._id}>
                                        <Card item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {search && filteredFoodItems.length === 0 && (
                    <p className="text-center mt-4">No results found</p>
                )}
            </div>

            <Footer />

            {/* 👇 Modal */}
            <Modal show={showOrders} onHide={handleCloseOrders} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>My Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyOrders /> {/* pura component render hoga */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrders}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;




