import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice.jsx';
import { useDispatch } from 'react-redux'; // Ensure you are using Redux

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                // other plants...
            ]
        },
        // other categories...
    ];

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Assuming addItem will handle adding the plant to the cart
    };

    return (
        <div>
            <header style={styleObj}>
                <a href="#" onClick={handleHomeClick} style={styleA}>Home</a>
                <div style={styleObjUl}>
                    <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    <button onClick={handleCartClick} style={styleA}>Cart</button>
                </div>
            </header>

            {showCart ? (
                <div className="cart">
                    <h2>Your Cart</h2>
                    {/* Render CartItems dynamically */}
                    <CartItem />
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <div>
                    {showPlants && (
                        <div>
                            {plantsArray.map((category) => (
                                <div key={category.category}>
                                    <h2>{category.category}</h2>
                                    <div className="plants-list">
                                        {category.plants.map((plant) => (
                                            <div key={plant.name} className="plant-item">
                                                <img src={plant.image} alt={plant.name} />
                                                <h3>{plant.name}</h3>
                                                <p>{plant.description}</p>
                                                <p>{plant.cost}</p>
                                                <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
};

const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
};

const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
};

export default ProductList;
