import React from 'react';
import './HomeReceipts.css';

const HomeReceipts: React.FC = () => {
  return (
    <div className="grid-container-receipts">
      <div className="large-image">
        <img src="https://i.imgur.com/Jr8bav0.png" alt="Pizza Fit de Frigideira" />
        <p>Pizza Fit de Frigideira</p>
      </div>
      <div className="small-images">
        <div className="small-image">
          <img src="https://i.imgur.com/Rim7Dib.png" alt="Guacamole" />
          <p>Guacamole</p>
        </div>
        <div className="small-image">
          <img src="https://i.imgur.com/Hl8vEQ6.png" alt="Shakshuka" />
          <p>Shakshuka</p>
        </div>
        <div className="small-image">
          <img src="https://i.imgur.com/L9jEXcN.png" alt="Macarrão de Abobrinha" />
          <p>Macarrão de Abobrinha</p>
        </div>
        <div className="small-image">
          <img src="https://i.imgur.com/tXaWLCf.png" alt="Ratatouille" />
          <p>Ratatouille</p>
        </div>
      </div>
    </div>
  );
};

export default HomeReceipts;