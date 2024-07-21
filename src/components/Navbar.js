import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import { useState } from "react";

function Navbar(props) {
    const [colorChange, setColorChange] = useState(false)

    window.addEventListener("scroll", () => {
        if (window.scrollY <= 10) {
            setColorChange(false)
        } else {
            setColorChange(true)
        }
    })

    return (
        <div className="d-flex align-items-center position-sticky top-0 padded z-3" style={{backgroundColor: colorChange ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)", transition: "0.5s all ease"}}>
            <Link style={{
                fontFamily: "Inter",
                fontSize: "25px",
                fontWeight: "750"
            }} className="link-dark link-underline-opacity-0 me-auto" to="/">iFLY</Link>
            <Navlinks />
        </div>
    );
}

export default Navbar