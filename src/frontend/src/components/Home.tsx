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
      <img src='https://i.imgur.com/6H0YmaM.png' className='img1'/>
        <h1>Ingestão de Calorias</h1>
        <p>
        Registre os alimentos consumidos diariamente e acompanhe o seu progresso na dieta escolhida.</p>
      </div>
      <div className="card">
      <img src='https://iili.io/drHgwtR.png' className='img1' />
        <h1>Cálculo de Nutrientes</h1>    
        <p>
        Calcule automaticamente a quantidade de calorias, proteínas e nutrientes de um alimento.</p>
      </div>

      <div className="card">
        <img src='https://iili.io/drHghAJ.png' className='img1' />
        <h1>Histórico de Consumo</h1>
        <p>Consulte seu histórico de consumo em qualquer hora ou lugar e acompanhe sua trajetória.</p>
      </div>
      <div className="card">
        <img src='https://iili.io/drHgX9a.png' className='img1' />
        <h1>Relatórios e Gráficos</h1>
        <p>Gere relatórios gráficos para visualizar seu consumo total de calorias e nutrientes.</p>
      </div>
      <div className="card">
        <img src='https://iili.io/drHgGF1.png' className='img1' />
      <h1>Dietas Específicas</h1>
      <p>Escolha um plano alimentar dentre inúmeras opções disponibilizadas em nosso aplicativo.</p>
    </div>
  
  </div>
        </section>
     
      </>
    )
  }
  
  export default Home;
  