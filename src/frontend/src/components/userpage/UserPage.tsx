import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../userpage/Button";
import { Input } from "../userpage/Input";
import { Select } from "../userpage/Select";
import { Error } from "../userpage/Error"
import  PopupMessage  from "../userpage/PopupMessage"
import { calculateAge, dateFormat } from "../calculate/date";
import InputDatePicker from "./InputDatePicker";
import './UserPage.css';

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
    { value: "male", label: "Masculino" }
  ];

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
    <Wrapper>
      {error && <Error>{error}</Error>}
      {showPopup && <PopupMessage message={messagePopup} setShowPopup={setShowPopup} />}
      <FieldWrapper>
        <TextSld>Perfil</TextSld>
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
        <LineSld>
          <Button label="Salvar" click={handleSave} />
          {profile && <Button label="Excluir" click={handleDelete} />}
        </LineSld>
      </FieldWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const LineSld = styled.div`
  display: flex;
  margin-top: 10px;
`;

const TextSld = styled.div`
  display: flex;
  font-size: 120%;
  font-weight: bold;
  color: #333;
  margin: 10px 0px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  padding: 20px;
  border: 1px solid #999;
  border-radius: 5px;
  box-sizing: border-box;
`;

