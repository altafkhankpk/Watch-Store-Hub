"use client"
import React, { useState, useEffect } from 'react';
import "./header.css"

export default function Header() {


  const [visibleDiv, setVisibleDiv] = useState(0);

  // Cycle through the divs every 2 seconds   
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleDiv((prevVisibleDiv) => (prevVisibleDiv + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="d-flex bg-black p-1 text-white justify-content-around text-center header-container" style={{ fontSize: '12px' }}>
        <div className={`header-div ${visibleDiv === 0 ? 'visible' : ''}`}>
          <div><span>icon</span></div>
          <div><span><b>18 Million satisfied customers</b></span></div>
        </div>
        <div className={`header-div ${visibleDiv === 1 ? 'visible' : ''}`}>
          <div><span>30 Days Hassle-free returns</span></div>
          <div><span><b>Easy Refund & Exchange</b></span></div>
        </div>
        <div className={`header-div ${visibleDiv === 2 ? 'visible' : ''}`}>
          <div><span><b>1 YEAR</b></span></div>
          <div><span><b>INTERNATIONAL WARRANTY</b></span></div>
        </div>
      </div>
    </div>
  );
}
