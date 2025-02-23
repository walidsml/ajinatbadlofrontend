import logo from "../../Assets/AjiNatbadlo-Logo.png"
import "../../Assets/Styles/footer.css"

function Footer() {
    return(
        <div className="footer">
            <div className="footer-wrapper">
                <div className="footer-id">
                    <img className="footer-logo" src={logo} alt=""/>
                    <h3>Aji Natbadlo</h3>
                </div>
                <div className="footer-el-1">
                    <h5 className="foot-element">Contact</h5>
                    <h5 className="foot-element">Pricing</h5>
                    <h5 className="foot-element">About Us</h5>
                    <h5 className="foot-element">Live Chat</h5>
                    <h5 className="foot-element">Support</h5>

                </div>
                <div className="footer-el-2">
                    <h5 className="foot-element">Profile</h5>
                    <h5 className="foot-element">Create Item</h5>
                    <h5 className="foot-element">Request</h5>
                    <h5 className="foot-element">Terms & Conditions</h5>
                    <h5 className="foot-element">Reglementation</h5>
                </div>
            </div>
        </div>


    );
}

export default Footer;