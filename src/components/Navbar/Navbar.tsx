import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        {/* <NavLink to="/" className="nav-logo">
          PROXII
        </NavLink> */}
        <div
          className={`nav-menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/booking"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                bo0K1ng
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeMenuOnMobile}>
                h0m3
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/gallery"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                g4113rY
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/info"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                1nf0
              </NavLink>
            </li>
          </ul>
          <div className="nav-close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>
        <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
