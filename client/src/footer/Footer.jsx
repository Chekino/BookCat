import "./footer.css";
import icone from "../assets/icone2.png";

const Footer = () => {
  return (
    <footer className="footer bg-white text-black-content p-10">
      <nav>
        <img src={icone} alt="" />
      </nav>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Accueil</a>
        <a className="link link-hover">Catalogue</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover" href="https://dicat.pro" target="_blank">
          Contactez-Nous
        </a>
      </nav>
      <nav>
        <h6 className="">Copyright © 2022 - All right reserved</h6>
        <a
          className="link footer-title"
          href="https://dicat.pro"
          target="_blank"
        >
          Create by: DICAT.PRO
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
