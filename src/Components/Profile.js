// import "../Assets/Styles/profile.css"
// import profile from '../Assets/Images/profilepic.jpeg';
// import UserService from "../services/UserService";
//
//
// function Profile() {
//     return (
//         <section className="proffff">
//
//             <div className="profile-container">
//                 <div className="profile-profile">
//
//                     <div>
//                         <img className="profile-pic" src={profile} alt="profile-pic"/>
//                         <h3>{UserService.getName()}</h3>
//                         <hr/>
//                     </div>
//
//                     <div>
//                     <h6 className="item-profile">Date joined : 12/04/2024</h6>
//                         <h6 className="item-profile">items : 3</h6>
//                         <h6 className="item-profile">Active Requests : 3</h6>
//                         <h6 className="item-profile">Total requests :  25</h6>
//
//                     </div>
//                 </div>
//
//                 <div className="profile-items">
//                 <h1>My Items</h1>
//                 </div>
//             </div>
//         </section>
// );
// }
//
// export default Profile;


import React, { useState, useEffect } from "react";
import "../Assets/Styles/profile.css";

import profile from "../Assets/Images/profilepic.jpeg";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";


function Profile() {
    const [items, setItems] = useState([]); // Store user's items

    useEffect(() => {
        const userId = UserService.getUserId(); // Get userId from UserService
        const token = UserService.getToken();   // Get JWT token for authentication

        if (userId && token) {
            fetch(`http://localhost:8080/api/items/user/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("User Items:", data);
                    setItems(data); // Store the fetched items
                })
                .catch(error => console.error("Error fetching user items:", error));
        } else {
            console.error("No user ID or token found.");
        }
    }, []);

    return (
        <section className="proffff">

            <div className="profile-container">

                <div className="profile-profile">
                    <div>
                        <img className="profile-pic" src={profile} alt="profile-pic" />
                        <h3>{UserService.getName()}</h3>
                        <hr />
                    </div>

                    <div>
                        <h6 className="item-profile">Date joined: 12/04/2024</h6>
                        <h6 className="item-profile">Items: {items.length}</h6>
                        <h6 className="item-profile">Active Requests: 3</h6>
                        <h6 className="item-profile">Total Requests: 25</h6>
                    </div>

                    <div className="pf-btn">
                        <button className="pf-btn-edit">Edit Profile</button>
                        <button className="pf-btn-view"><Link to="/requests">View Requests</Link></button>
                        <button className="pf-btn-logout" onClick={UserService.doLogout}>Logout</button>
                    </div>
                </div>


                {/* Display User Items */}
                <div className="profile-items-profile">
                    <h1>My Items</h1>
                    <div className="Item-List-profile">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item.id} className="profile-real-item-container">
                                    <h3 className="profile-item-title">{item.title}</h3>
                                    <hr/>
                                    <p className="profile-item-description"><span className="abrbr">Description : </span>{item.description}</p>
                                    <hr/>
                                    <p className="profile-item-Category"><span className="abrbr">Category : </span>{item.category}</p>
                                    <hr/>
                                    <p className="profile-item-Preferences"><span className="abrbr">Preference : </span>{item.preferences}</p>
                                    <hr/>
                                    <div className="profile-image-container">
                                        {item.pictures && item.pictures.length > 0 && (
                                            <img className="profile-item-image" src={item.pictures[0].url} alt={item.title}/>
                                        )}
                                    </div>
                                    <hr/>
                                    <div className="profile-item-btn">
                                        <button className="edit-btn">Edit Item</button>
                                        <button className="delete-btn">Delete Item</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No items found.</p>
                        )}
                    </div>
                </div>
            </div>


        </section>
    );
}

export default Profile;
