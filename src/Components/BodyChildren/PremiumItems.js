//
// import React, { useEffect } from "react";
// import testimg from "../../Assets/Images/Headset.jpg";
// import Star from "../../Assets/Icons/star.png";
// import "../../Assets/Styles/Post.css";
// import UserService from "../../services/UserService"; // Assuming this is where you have the UserService
//
// export default function PremiumItems() {
//     useEffect(() => {
//         // Get the token from the UserService
//         const token = UserService.getToken();
//
//         if (token) {
//             // Send the GET request to fetch items
//             fetch("http://localhost:8080/api/items", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     console.log("Items data:", data); // Log the data for now
//                 })
//                 .catch((error) => console.error("Error fetching items:", error));
//         } else {
//             console.error("No token found. User is not authenticated.");
//         }
//     }, []);
//
//     return (
//         <div>
//             <div className="hero-header">
//                 <h2>Premium Items?</h2>
//             </div>
//             <div className="Item-List">
//                 <div className="Item">
//                     <img className="item-image" src={testimg} alt="testimg" />
//                     <h3 className="title">Casque gaming jdid</h3>
//                     <div className="item-author-info">
//                         <h6>Amin Zerouali</h6>
//                         <img alt="star" className="Star-rate" src={Star} />
//                         <h4 className="star-count">(5)</h4>
//                     </div>
//                     <h6 className="date-posted">Posted 6 days ago</h6>
//                     <div className="mustButtons">
//                         <button className="SendRequest-btn">Send Request</button>
//                         <button className="Favorite-btn">Favorite</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import Star from "../../Assets/Icons/star.png";
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
                    // Ensure data is an array
                    const itemsArray = Array.isArray(data) ? data : [];
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
                    setItems([]); // Set to empty array on error
                });
        } else {
            console.error("No token found. User is not authenticated.");
            setItems([]); // Set to empty array if no token
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
            const currentIndex = prev[itemId];
            const itemImages = items.find(item => item.id === itemId)?.pictureUrls || [];
            const newIndex = direction === 'next'
                ? (currentIndex + 1) % itemImages.length
                : (currentIndex - 1 + itemImages.length) % itemImages.length;
            return { ...prev, [itemId]: newIndex };
        });
    };

    return (
        <div>
            <div className="hero-header">
                <h2>Premium Items</h2>
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
                                src={item.pictureUrls[currentImageIndices[item.id]]}
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
                        <h3 className="title">{item.title}</h3>
                        <div className="item-author-info">
                            <h6>{UserService.getName()}</h6>
                            <img alt="star" className="Star-rate" src={Star} />
                            <h4 className="star-count">(5)</h4>
                        </div>
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