import CarIcon from "../../Assets/Icons/car-icon.png";
import BikeIcon from "../../Assets/Icons/motorcycle-icon.png";
import HouseIcon from "../../Assets/Icons/house-icon.png";
import PcIcon from "../../Assets/Icons/pc-icon.png";

export default function CategoryPick() {
    return (
        <div>
            <div className="hero-header">
                <h2>Que cherchez-vous?</h2>
            </div>

            <div className="Categories">
                <div className="Categories-item">
                    <img className="cat-icon" src={CarIcon} alt=""/>
                    <h3>Voitures</h3>
                </div>
                <div className="Categories-item">
                    <img className="cat-icon" src={BikeIcon} alt=""/>
                    <h3>Motos</h3>
                </div>
                <div className="Categories-item">
                    <img className="cat-icon" src={HouseIcon} alt=""/>
                    <h3>Maison et Jardin</h3>
                </div>
                <div className="Categories-item">
                    <img className="cat-icon" src={PcIcon} alt=""/>
                    <h3>Informatique</h3>
                </div>
            </div>
        </div>
    )
}