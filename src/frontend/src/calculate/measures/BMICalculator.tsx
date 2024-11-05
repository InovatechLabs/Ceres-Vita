import React, { useEffect, useState } from 'react';
import './styles/BMI.css'

const BMICalculator: React.FC = () => {
    const [profile, setProfile] = useState<{ weight: number; height: number } | null>(null);
    const [bmi, setBmi] = useState<number | null>(null);

    const userId = sessionStorage.getItem('id'); // Obtém o ID do usuário do sessionStorage

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/user/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar perfil');
                }
                const data = await response.json();
                setProfile(data.profile);

                // Calcular IMC assim que o perfil for carregado
                if (data.profile) {
                    const { weight, height } = data.profile;
                    if (height > 0) {
                        const calculatedBMI = weight / ((height / 100) ** 2); // Cálculo do IMC
                        setBmi(calculatedBMI);
                    }
                }
            } catch (error) {
                console.error(error);
                // Trate o erro conforme necessário
            }
        };

        fetchProfile();
    }, [userId]);

    return (
        <div>
            {profile ? (
                <div className="card-bmi">
                    <div className='placeholder'>
                        <h1>Cálculo do IMC</h1>
                        <label>Peso (kg):</label>
                        <input type="number" value={profile.weight} readOnly />
                    </div>
                    <div>
                        <label>Altura (cm):</label>
                        <input type="number" value={profile.height} readOnly />
                    </div>
                    {bmi !== null && (
                        <h2 id='result'>IMC: {bmi.toFixed(2)}</h2>
                    )}
                    {/* Texto Condicional com base no IMC */}
                    {bmi !== null && (
                        <p id='messages'>
                            {bmi <= 18.5 ? (
                                "Seu IMC está abaixo do normal. Considere utilizar nossos serviços para gerar dietas que ajudem a ganhar peso de forma saudável."
                            ) : bmi > 18.5 && bmi <= 24.9 ? (
                                "Parabéns! Seu IMC está na faixa normal. Continue mantendo um estilo de vida saudável!"
                            ) : bmi >= 25 && bmi <= 29.9 ? (
                                "Seu IMC indica sobrepeso. Que tal utilizar nossos planos de dietas personalizados para alcançar um peso mais saudável?"
                            ) : (
                                "Seu IMC indica obesidade. Nossos planos de dietas low carb podem ser uma ótima opção para você. Vamos juntos nessa jornada!"
                            )}
                        </p>
                    )}
                </div>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
};

export default BMICalculator;