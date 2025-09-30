import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const Footer = () => {
  const { language } = useAppContext();
  const t = getTranslations(language);

  return (
    <footer style={{
      background: 'var(--dark-color)',
      color: 'var(--white)',
      marginTop: '50px'
    }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-20" style={{ padding: '40px 0' }}>
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-20" style={{ color: 'var(--primary-color)' }}>
              {t.appName}
            </h3>
            <p style={{ color: 'var(--light-color)', lineHeight: '1.6' }}>
              Your trusted platform for sharing and renting equipment. 
              Connect with equipment owners in your area and get the tools you need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-20">Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#home" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  {t.home}
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#products" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  {t.allProducts}
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#about" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#contact" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-20">Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#power-tools" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  Power Tools
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#garden-tools" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  Garden Tools
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#cleaning-tools" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  Cleaning Tools
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#access-tools" style={{ color: 'var(--light-color)', textDecoration: 'none' }}>
                  Access Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-20">Contact Info</h4>
            <div style={{ color: 'var(--light-color)' }}>
              <p style={{ marginBottom: '10px' }}>
                📧 support@equishare.com
              </p>
              <p style={{ marginBottom: '10px' }}>
                📞 +91 9876543210
              </p>
              <p style={{ marginBottom: '10px' }}>
                📍 Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid var(--secondary-color)',
          padding: '20px 0',
          textAlign: 'center',
          color: 'var(--light-color)'
        }}>
          <p>&copy; 2024 {t.appName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;