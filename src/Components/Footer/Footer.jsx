import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="menuItems">
        <li className="menuItem">Company</li>
        <li className="menuItem">Products</li>
        <li className="menuItem">About</li>
        <li className="menuItem">Contact</li>
        <li className="menuItem">FAQ</li>
      </ul>
      <div className="socialIcons">
        <span className="icon">
          <FaFacebookF />
        </span>
        <span className="icon">
          <FaInstagram />
        </span>
        <span className="icon">
          <FaTwitter />
        </span>
        <span className="icon">
          <FaLinkedin />
        </span>
      </div>
      <hr />
      <div className="infoText">Copyright @2023-All Right Reserved</div>
    </footer>
  );
};

export default Footer;
