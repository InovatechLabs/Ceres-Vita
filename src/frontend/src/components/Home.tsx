import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/Home.css';
import logo from '../logo.jpg';

function Home() {
  
    return (
      <>

        <div className='topGreenContainer'></div>
        <nav>

        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
        <FontAwesomeIcon icon={faBars} className='fas fa-bars' />
        </label>
        <label className="logo">Ceres Vita</label>
        <ul>
            <li>Home</li>
            <li>Missão</li>
            <li>Planos</li>
            <li>Receitas</li>
            <li>Contatos</li>
            
        </ul>

        </nav>
        <div className='website-development'>
        <img src={logo} className='imagem'></img>     
          <div className='login-div'>
            <input type='email' name='email' placeholder='e-mail'/>
            <input type='password' name='password' placeholder='senha'/>
            <button className='login-btn'>Entrar</button>
          </div>
        </div>
     
      </>
    )
  }
  
  export default Home;
  