import React, { useState, useEffect } from "react";
import "../../Assets/Styles/Post.css";
import UserService from "../../services/UserService";

const PremiumItems = () => {
    const [items, setItems] = useState([]);  // Initialize as empty array
    const [currentImageIndices, setCurrentImageIndices] = useState({});

    useEffect(() => {
        const token = UserService.getToken();
        if (token) {
            fetch("http://localhost:8080/api/items", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fetched Items:", data);
                    // Ensure each item has a `pictureUrls` array
                    const itemsArray = Array.isArray(data)
                        ? data.map(item => ({
                            ...item,
                            pictureUrls: item.pictures ? item.pictures.map(pic => pic.url) : [],
                        }))
                        : [];
                    setItems(itemsArray);

                    // Initialize current image index for each item
                    const indices = {};
                    itemsArray.forEach(item => {
                        indices[item.id] = 0;
                    });
                    setCurrentImageIndices(indices);
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                    setItems([]);
                });
        } else {
            console.error("No token found. User is not authenticated.");
            setItems([]);
        }
    }, []);


    const calculateDaysAgo = (createdAt) => {
        const created = new Date(createdAt);
        const today = new Date();
        const diffTime = Math.abs(today - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const navigateImage = (itemId, direction) => {
        setCurrentImageIndices(prev => {
            const currentIndex = prev[itemId] || 0;  // Ensure default value
            const itemImages = items.find(item => item.id === itemId)?.pictureUrls || [];

            if (itemImages.length === 0) return prev; // Avoid errors

            const newIndex = direction === 'next'
                ? (currentIndex + 1) % itemImages.length
                : (currentIndex - 1 + itemImages.length) % itemImages.length;

            return { ...prev, [itemId]: newIndex };
        });
    };







    return (


        <div>
            <div className="hero-header">
                <h2>All items</h2>
            </div>

            <div className="Item-List">

                {Array.isArray(items) && items.map((item) => (
                    <div key={item.id} className="Item">

                        <div className="image-carousel">
                            <button
                                className="carousel-btn prev"
                                onClick={() => navigateImage(item.id, 'prev')}
                            >
                                &#8249;
                            </button>
                            <img
                                className="item-image"
                                src={item.pictureUrls?.[currentImageIndices[item.id]] || "default-image-url.jpg"}
                                alt={item.title}
                            />
                            <button
                                className="carousel-btn next"
                                onClick={() => navigateImage(item.id, 'next')}
                            >
                                &#8250;
                            </button>
                            <div className="image-indicator">
                                {item.pictureUrls.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentImageIndices[item.id] ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <h3 className="title">{item.title}
                            <hr/>
                        </h3>
                        <p className="description-item">{item.description}</p>

                        <h6 className="date-posted">Posted {calculateDaysAgo(item.createdAt)} days ago</h6>

                        <div className="mustButtons">
                            <button className="SendRequest-btn">Send Request</button>
                            <button className="Favorite-btn">Favorite</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumItems;