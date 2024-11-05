import React, { useEffect, useState } from 'react';
import './styles/TMB.css'

// Defina um tipo para os dados do perfil
interface Profile {
    weight: number;
    height: number;
    sex: string;
    birth_date: string; 
}

const TMBCalculator = () => {
    const [profileData, setProfileData] = useState<Profile | null>(null);
    const [tmb, setTmb] = useState<number | null>(null); 
    const [activityLevel, setActivityLevel] = useState<string>('sedentary'); // Nível de atividade padrão

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/user/profile/${userId}`);
                const data = await response.json();

                // Verifica se a resposta contém o perfil
                if (data && data.profile) {
                    // Formatar a data de nascimento antes de definir o estado
                    const formattedProfile: Profile = {
                        ...data.profile,
                        birth_date: new Date(data.profile.birth_date).toISOString().split('T')[0] // Formata a data
                    };

                    setProfileData(formattedProfile); // Armazena o perfil formatado
                    calculateTMB(formattedProfile, 'sedentary'); // Chama a função para calcular TMB com nível de atividade padrão
                } else {
                    console.error("Perfil não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };

        fetchProfileData();
    }, []);

    const calculateTMB = (profile: Profile, activityLevel: string) => {
        if (profile) {
            const { weight, height, sex, birth_date } = profile;

            // Calcular a idade
            const birthDate = new Date(birth_date);
            const age = new Date().getFullYear() - birthDate.getFullYear();

            // Cálculo do TMB
            let tmbValue: number;
            if (sex === 'male') {
                tmbValue = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                tmbValue = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            // Ajuste o TMB com base no nível de atividade
            switch (activityLevel) {
                case 'sedentary': // Sedentário
                    tmbValue *= 1.2;
                    break;
                case 'light': // Atividade leve (exercício leve/sociais 1-3 dias/semana)
                    tmbValue *= 1.375;
                    break;
                case 'moderate': // Atividade moderada (exercício moderado 3-5 dias/semana)
                    tmbValue *= 1.55;
                    break;
                case 'active': // Atividade intensa (exercício intenso 6-7 dias/semana)
                    tmbValue *= 1.725;
                    break;
                case 'very-active': // Atividade muito intensa (trabalho físico, treino 2x/dia)
                    tmbValue *= 1.9;
                    break;
                default:
                    break;
            }

            setTmb(tmbValue);
        }
    };

    const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newActivityLevel = e.target.value;
        setActivityLevel(newActivityLevel);
        if (profileData) {
            calculateTMB(profileData, newActivityLevel); // Recalcula o TMB quando a atividade muda
        }
    };

    return (
        <div>
            <div className="card"> {/* Adicionando o card aqui */}
                <h1>Cálculo de TMB</h1>
                {profileData && (
                    <div>
                        <label htmlFor="activity-level">Nível de Atividade:</label>
                        <select id="activity-level" value={activityLevel} onChange={handleActivityChange}>
                            <option value="sedentary">Sedentário</option>
                            <option value="light">Atividade Leve</option>
                            <option value="moderate">Atividade Moderada</option>
                            <option value="active">Atividade Intensa</option>
                            <option value="very-active">Atividade Muito Intensa</option>
                        </select>
                    </div>
                )}
                {tmb !== null ? (
                    <p id='tmb-p'>Seu TMB é: {tmb.toFixed(2)} kcal/dia</p>
                ) : (
                    <p id='tmb-p'>Carregando...</p>
                )}
            </div>
        </div>
    );
};

export default TMBCalculator;