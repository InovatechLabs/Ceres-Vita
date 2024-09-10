import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/Home.css';
import logo from '../logo.jpg';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../service/index.service';


function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // redireciona para a rota /register
  };
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // alterna o estado da senha visível/invisível
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Chama o serviço de login
      const response = await loginUser({ email, password });
      console.log(response);
  
      if (response.token) {
        sessionStorage.setItem('authToken', response.token);
        navigate('/home'); 
      } else {
        setErrorMessage('Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro no login.');
    }
  };
  
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
          <div className='banner-div'>
        <img src={logo} className='imagem'></img>  
        <div className='presentation-text-container'>
        <div className='presentation-text'>
          <h1 className='banner-title'>Ceres Vita: Seu corpo merece o melhor</h1>
          <p className='banner-info'>Uma boa alimentação é a base de uma vida equilibrada e cheia de energia.
            Com auxílio da Ceres Vita, faça escolhas que valorizem seu bem-estar!
          </p>
          </div> 
          <div className='buttons-div'>
            <p id='register-text'>Não possui uma conta?</p>
            <button className='register-btn' onClick={handleRegisterClick}>Registre-se</button>
            </div>
            <div className='buttons-logged-text'>
            <p id='register-text'>Ou, se você já possui...</p>
            <div className='buttons-logged-div'>
            <button className='logged-buttons'>Meu perfil</button>
            <button className='logged-buttons'>Histórico de ingestão</button>
            <button className='logged-buttons'>Dietas</button>
            </div>
            </div>
          </div>
        </div>
       
          <div className='login-div'>
          <form onSubmit={handleLogin}>
            <input type='email' name='email' placeholder='e-mail' className='emailinput' value={email } onChange={(e) => setEmail(e.target.value)}/>
            <div className='password-container'>
            <input
            type={passwordVisible ? 'text' : 'password'}
            name='password'
            placeholder='senha'
            className='input-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className='toggle-password' 
            onClick={togglePasswordVisibility} 
            type="button"
          >
            {passwordVisible ? '🙈' : '👁️'}
          </button>
        </div>
            <button className='login-btn' type='submit'>Entrar</button>
            </form>
          </div>
        </div>
        <section className='midsection'>
         <div className='title'>
          <h1>Veja como podemos lhe ajudar!</h1>
         </div>
         <div className="grid-container">
      <div className="card">
        <h1>Registre sua alimentação diária com facilidade</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores quas eius natus nihil dignissimos ratione magnam non sapiente consequatur cupiditate dolore adipisci ducimus odit, sequi odio quaerat nesciunt aspernatur eum.</p>
      </div>
      <div className="card">
        <h1>Cálculo Automático de Nutrientes</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iste rem quisquam maxime eaque aliquid asperiores! Debitis culpa asperiores sint, molestiae, sunt iste ut vitae omnis, libero ullam incidunt ratione.</p>
      </div>

      <div className="card">
        <h1>Acesse Seu Histórico Alimentar Completo</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro voluptates exercitationem odio, adipisci sequi labore ad pariatur optio incidunt similique deserunt in, itaque quasi, obcaecati nesciunt suscipit quia cumque!</p>
      </div>
      <div className="card">
        <h1>Acesse Seu Histórico Alimentar Completo</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro voluptates exercitationem odio, adipisci sequi labore ad pariatur optio incidunt similique deserunt in, itaque quasi, obcaecati nesciunt suscipit quia cumque!</p>
      </div>
      <div className="card">
      <h1>Suporte a Dietas Específicas</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro voluptates exercitationem odio, adipisci sequi labore ad pariatur optio incidunt similique deserunt in, itaque quasi, obcaecati nesciunt suscipit quia cumque!</p>
    </div>
  
  </div>
        </section>
     
      </>
    )
  }
  
  export default Home;
  