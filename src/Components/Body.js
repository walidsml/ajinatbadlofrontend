import "../Assets/Styles/Body.css";
import CategoryPick from "./BodyChildren/CategoryPick";
import PremiumItems from "./BodyChildren/PremiumItems";

export function Body() {


    return (
        <div>
            <CategoryPick />
            <PremiumItems />
        </div>
    );
}
