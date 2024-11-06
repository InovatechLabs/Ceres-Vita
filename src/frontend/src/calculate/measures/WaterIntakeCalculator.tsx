import React, { useEffect, useState } from 'react';
import './styles/Water.css'

const WaterIntakeCalculator: React.FC = () => {
    const [profile, setProfile] = useState<{ weight: number } | null>(null);
    const [waterIntake, setWaterIntake] = useState<number | null>(null);
    const [userInfo, setUserInfo] = useState<{ username: string, email: string } | null>(null);

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

                // Calcular a ingestão de água assim que o perfil for carregado
                if (data.profile) {
                    const { weight } = data.profile;
                    const recommendedWaterIntake = weight * 35; // Cálculo em ml
                    setWaterIntake(recommendedWaterIntake);
                }
            } catch (error) {
                console.error(error);
                // Trate o erro conforme necessário
            }
        };

        fetchProfile();
    }, [userId]);

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
    
            // console.log(data);
            setUserInfo(data.userinfo);
            if(userInfo) {
                
            }
    
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        }
      };
    
      useEffect(() => {
        fetchUserInfo();
      }, []);

      return (
        <div>
            <div className="card-water"> 
                <h1>Cálculo da Ingestão de Água</h1>
                {profile ? (
                    <div className='wat'>
                        {waterIntake !== null && (
                            <>
                                <h2>Ingestão Recomendada de Água: {waterIntake} ml/dia</h2>
                              
                                <p id='text-water'>
                                    Manter-se hidratado é essencial para o bom funcionamento do corpo e da mente. Beber água regularmente ajuda na digestão, melhora a pele, aumenta a energia e contribui para a concentração. Que tal fazer da hidratação uma parte vital do seu dia a dia? Lembre-se: a água é o combustível que seu corpo precisa para funcionar bem!
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <p>Carregando perfil...</p>
                )}
            </div>
        </div>
    );
};

export default WaterIntakeCalculator;