import React, { useEffect, useState } from 'react';


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
    
            console.log(data);
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
            <h1>Cálculo da Ingestão de Água</h1>
            {profile ? (
                <div className='wat'>
                    {waterIntake !== null && (
                        <>
                        <h2>Ingestão Recomendada de Água: {waterIntake} ml</h2>
                        </>
                    )}
                </div>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
};

export default WaterIntakeCalculator;