import './App.css';
import {NavBar} from "./Components/NavBar";
import {Body} from "./Components/Body";
import {Route, Routes} from "react-router-dom";
import Contact from "./Components/Static/Contact";
import Pricing from "./Components/Static/Pricing";
import Requests from "./Components/Requests";
import Profile from "./Components/Profile";
import Support from "./Components/Static/Support";
import Create from "./Components/Create";
import Footer from "./Components/Static/Footer";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/support" element={<Support />} />
                <Route path="/Create" element={<Create />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;


