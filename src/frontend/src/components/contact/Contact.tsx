import React from 'react';
import './Contact.css'; 
import ContactMap from './Map/ContactMap';

interface InfoItemProps {
  iconSrc: string;
  text: string;
  altText: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ iconSrc, text, altText }) => (
  <div className="info-item">
    <img src={iconSrc} alt={altText} className="icon" />
    <p>{text}</p>
  </div>
);

const Contact: React.FC = () => {
  return (
    <>
    <div className='main-contact'>
    <div className='contact-title'>
        <h1>Contatos</h1>
    </div>
    <div className="info-container">
      <InfoItem iconSrc="https://img.icons8.com/?size=512&id=16466&format=png" text="(12) 3953-7926" altText="Phone Icon" />
      <InfoItem iconSrc="https://cdn0.iconfinder.com/data/icons/line-action-bar/48/email-512.png" text="contato@ceresvita.com.br" altText="Email Icon" />
      <InfoItem iconSrc="https://cdn4.iconfinder.com/data/icons/icon-flat-icon-set/50/localization-512.png" text="R. Faria Lima, 155 - Jardim Santa Maria, Jacareí - SP, 12328-070" altText="Address Icon" />
    </div>
    <div className="container1">
            <div className="left-section">
                 <ContactMap />
            </div>
            <div className="right-section">
                <input type="text" placeholder="Nome" className="input-text" required/>
                <input type="email" placeholder="E-mail" className="input-text" />
                <textarea placeholder="Deixe aqui sua dúvida ou sugestão" className="textarea"></textarea>
                <button className="save-btn">Salvar</button>
            </div>
        </div>
    </div>
    </>
  );
};

export default Contact;