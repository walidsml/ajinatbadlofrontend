import Logo from '../Assets/AjiNatbadlo-Logo.png'
import '../Assets/Styles/NavBar.css'
import searchIcon from '../Assets/Icons/search-icon.png';
import UserService from "../services/UserService";
export function NavBar() {
    return (
        <nav className="Nav">
            <div className="nav-pri">
                <img src={Logo} alt={"logo"} className="logo-image"/>
                <h3 className="text-logo">AjiNatbadlo</h3>
            </div>
            <div className="nav-mid">
                <input type="text" placeholder="Search" className="input-fld"/>
                <button className="search-btn">
                    <img src={searchIcon} alt="Search" className="search-icon"/>
                </button>
            </div>
            <div className="nav-sec">
                <h5>Pricing</h5>
                <h5>About</h5>
                <h5>Contact</h5>
                <button className="button">Join Us</button>
            </div>
            <button onClick={UserService.doLogout}>logout</button>

        </nav>

    )
}