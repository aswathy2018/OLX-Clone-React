import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h4>POPULAR LOCATIONS</h4>
        <ul>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>TRENDING LOCATIONS</h4>
        <ul>
          <li>Bhubaneshwar</li>
          <li>Hyderabad</li>
          <li>Chandigarh</li>
          <li>Nashik</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>ABOUT US</h4>
        <ul>
          <li>Contact Us</li>
          <li>Careers</li>
          <li>OLX People</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
