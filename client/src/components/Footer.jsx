import React from 'react';

const Footer = () => {
    return (
        <footer style={{padding: '1rem', background: '#f5f5f5', textAlign: 'center'}}>
            <p>&copy; {new Date().getFullYear()} PharmEasy Clone. All rights reserved.</p>
        </footer>
    );
};

export default Footer;