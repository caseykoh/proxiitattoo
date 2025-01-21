import { NavLink } from "react-router-dom";
import "./Navbar.css";
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
    <header className="fixed w-full top-0 left-0 z-50">
      <nav className="flex items-center justify-end md:justify-between relative h-14 m-4">
        <div className="nav-logo-container hidden md:block">
          <NavLink to="/" className="nav-logo">
            proxiiworld
          </NavLink>
        </div>
        <div
          className={`nav-menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav-list">
            <li className="nav-item md:hidden">
              <NavLink
                to="/"
                className="nav-link home-link"
                onClick={closeMenuOnMobile}
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/booking"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/gallery"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                select work
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/flash"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                flash
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/info"
                className="nav-link"
                onClick={closeMenuOnMobile}
              >
                info
              </NavLink>
            </li>
          </ul>
          <div className="nav-close" id="nav-close" onClick={toggleMenu}>
            <p>close</p>
          </div>
        </div>
        <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
          <p>menu</p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
