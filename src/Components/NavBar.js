
import { Link } from 'react-router-dom';
import Logo from '../Assets/AjiNatbadlo-Logo.png';
import '../Assets/Styles/NavBar.css';
import searchIcon from '../Assets/Icons/search-icon.png';
import UserService from "../services/UserService";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";

export function NavBar() {
    return (
        <nav className="Nav">
            <div className="nav-pri">
                <img src={Logo} alt="logo" className="logo-image" />
                <h3 className="text-logo">AjiNatbadlo</h3>
            </div>
            <div className="nav-mid">
                <input type="text" placeholder="Search Here..." className="input-fld" />
                <button className="search-btn">
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </button>
            </div>
            <RenderOnAnonymous>
                <div className="nav-sec">
                    <Link to="/pricing"><h5>Pricing</h5></Link>
                    <Link to="/about"><h5>About</h5></Link>
                    <Link to="/contact"><h5>Contact</h5></Link>
                    <button className="button">Join Us</button>
                </div>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
                <div className="nav-sec">
                    <Link className="nav-sec-element" to="/Create"><h5>Create</h5></Link>
                    <Link className="nav-sec-element" to="/requests"><h5>Requests</h5></Link>
                    <Link className="nav-sec-element" to="/Profile"><h5>Profile</h5></Link>
                    <button className="logout-btn" onClick={UserService.doLogout}>Logout</button>
                </div>
            </RenderOnAuthenticated>
        </nav>
    );
}
