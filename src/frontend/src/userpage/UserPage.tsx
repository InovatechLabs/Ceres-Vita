import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o useNavigate
import { Button } from "../userpage/Button";
import { Input } from "../userpage/Input";
import { Select } from "../userpage/Select";
import { Error } from "../userpage/Error";
import PopupMessage from "../userpage/PopupMessage";
import { calculateAge, dateFormat } from "../calculate/date";
import InputDatePicker from "./InputDatePicker";
import './UserPage.css'; // Importando o CSS separado

export default function UserPage() {
  const [profile, setProfile] = useState<any>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");

  const options = [
    { value: "female", label: "Feminino" },
    { value: "male", label: "Masculino" },
  ];

  const navigate = useNavigate(); // Hook de navegação

  const handleRegisterClick = () => {
    navigate('/home'); // Redireciona para a rota /home
  };

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
    <div className="wrapper">
      {/* Aqui você adiciona o nav */}
      <nav>
        <div className="logo">Ceres Vita</div>
        <ul>
          <li onClick={handleRegisterClick}>Home</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>

      {error && <Error>{error}</Error>}
      {showPopup && (
        <PopupMessage message={messagePopup} setShowPopup={setShowPopup} />
      )}
      <div className="fieldWrapper">
        <div className="textSld">Perfil</div>
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
        <div className="lineSld">
          <Button label="Salvar" click={handleSave} />
          {profile && <Button label="Excluir" click={handleDelete} />}
        </div>
      </div>
    </div>
  );
}
