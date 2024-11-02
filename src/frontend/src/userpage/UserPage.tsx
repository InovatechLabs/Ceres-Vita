import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../userpage/Button";
import { Input } from "../userpage/Input";
import { Select } from "../userpage/Select";
import { Error } from "../userpage/Error";
import PopupMessage from "../userpage/PopupMessage";
import { calculateAge, dateFormat } from "../calculate/date";
import InputDatePicker from "./InputDatePicker";
import './UserPage.css'; 
import { AuthContext } from "../components/contexts/AuthContext";

export default function UserPage() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout();
      navigate("/home");
    }
  };

  const [profile, setProfile] = useState<any>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");
  const [userInfo, setUserInfo] = useState<{ username: string, email: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Funçao para verificar o token no sessionStorage
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem('token'); 
      if (token) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus(); 
  }, []);

  const options = [
    { value: "female", label: "Feminino" },
    { value: "male", label: "Masculino" },
  ];

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/home'); 
  };

  const handleFoodClick = () => {
    navigate('/food-register');
  }

  

  const fetchUserInfo = async () => {
    const storedUserId = sessionStorage.getItem("id");
    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      try {
        const response = await fetch("http://localhost:3030/api/user/verify-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!response.ok) {
          console.log("Erro ao buscar dados do usuário");
        }

        const data = await response.json();

        console.log(data);
        setUserInfo(data.userinfo);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem("userProfile");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      setBirthDate(new Date(`${parsedProfile.birth_date} 00:00:00`));
      setWeight(parsedProfile.weight);
      setHeight(parsedProfile.height);
      setSex(parsedProfile.sex);
    }
  }, []); 

  const saveProfileToSession = (profileData: any) => {
    sessionStorage.setItem("userProfile", JSON.stringify(profileData));
  };

  const handleSave = async () => {
    if (!birthDate) {
      setError("Forneça a data de nascimento");
    } else if (calculateAge(birthDate) < 1) {
      setError("É necessário idade mínima de 1 ano");
    } else if (!weight) {
      setError("Forneça o peso");
    } else if (!height) {
      setError("Forneça a altura");
    } else if (!sex) {
      setError("Forneça o sexo");
    } else {
      const formattedDate = dateFormat(birthDate);
      const updatedProfile = { birth_date: formattedDate, weight, height, sex };
      saveProfileToSession(updatedProfile);
      setProfile(updatedProfile);
      setMessagePopup("Perfil salvo com sucesso");
      setShowPopup(true);
  
      const storedUser = sessionStorage.getItem("id");
      if (storedUser) {
        const userId = parseInt(storedUser, 10);
  
        try {
          const response = await fetch("http://localhost:3030/api/user/save-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...updatedProfile, userId }),
          });
  
          const result = await response.json();
          if (response.ok) {
            console.log("Perfil salvo com sucesso no banco:", result);
          } else {
            console.error("Erro ao salvar perfil:", result.message);
            setError("Erro ao salvar o perfil no servidor");
          }
        } catch (error) {
          console.error("Erro de conexão com o servidor:", error);
          setError("Erro ao se conectar com o servidor");
        }
      } else {
        setError("Usuário não encontrado. Faça login novamente.");
      }
    }
  };

  const handleDelete = async () => {
    sessionStorage.removeItem("userProfile");
    setProfile(null);
    setBirthDate(null);
    setWeight("");
    setHeight("");
    setSex("");
    setMessagePopup("Perfil excluído com sucesso");
    setShowPopup(true);
  };


  return (
    <>
      <div className="wrapper">
        {/* Aqui você adiciona o nav */}
        <nav>
          <div className="logo">Ceres Vita</div>
          <ul>
            <li onClick={handleRegisterClick}>Home</li>
            <li onClick={handleFoodClick}>Registro de Consumo</li>
            <button id="logout-nav" onClick={handleLogout}>Sair</button>
          </ul>
        </nav>

        {error && <Error>{error}</Error>}
        {showPopup && (
          <PopupMessage message={messagePopup} setShowPopup={setShowPopup} />
        )}
        <div className="container">
          {/* Lado Esquerdo - Perfil */}
          <div className="container-left">
            <h3>Perfil</h3>
            <img src="https://avatars.githubusercontent.com/u/19499228?v=4" alt="Foto do usuário" id="profile-pic"/>
            {/* Exibir nome de usuário e e-mail */}
            {userInfo && (
              <>
                <h1 id="user-username">{userInfo.username}</h1>
                <h2 id="user-email">{userInfo.email}</h2>
              </>
            )}
          </div>

          {/* Lado Direito - Inputs do Formulário */}
          <div className="container-right">
            <InputDatePicker
              label="Data de nascimento"
              value={birthDate}
              setValue={setBirthDate}
            />
            <Input
              type="number"
              id="weight"
              label="Peso"
              value={weight}
              setValue={setWeight}
            />
            <Input
              type="number"
              id="height"
              label="Altura (cm)"
              value={height}
              setValue={setHeight}
            />
            <Select
              id="sex"
              label="Sexo"
              value={sex}
              setValue={setSex}
              options={options}
            />
          </div>
        </div>
        <div className="lineSld">
          <Button label="Salvar" click={handleSave} />
          {profile && <Button label="Excluir" click={handleDelete} />}
        </div>
      </div>
    </>
  );
}