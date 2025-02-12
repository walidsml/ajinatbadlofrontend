
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import "../Assets/Styles/Body.css";
import CategoryPick from "./BodyChildren/CategoryPick";
import PremiumItems from "./BodyChildren/PremiumItems";

export function Body() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (UserService.isLoggedIn()) {
            setUsername(UserService.getName());
        }else {setUsername("not logged in");}
    }, []);

    return (
        <div>
            <h2>Welcome, {username || "Guest"}!</h2>
            <CategoryPick />
            <PremiumItems />
        </div>
    );
}
