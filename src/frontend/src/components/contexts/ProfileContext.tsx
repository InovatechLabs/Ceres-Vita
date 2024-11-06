import React, { createContext, useContext, useState, useEffect } from 'react';

interface Profile {
    weight: number;
    height: number;
    sex: string;
    birth_date: string;
}

interface ProfileContextData {
    profileData: Profile | null;
    tmb: number | null;
    activityLevel: string;
    setActivityLevel: (level: string) => void;
    calculateTMB: () => void;
}

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<Profile | null>(null);
    const [tmb, setTmb] = useState<number | null>(null);
    const [activityLevel, setActivityLevel] = useState<string>('sedentary');

    useEffect(() => {
        // Carregar o nível de atividade do localStorage, se existir
        const storedActivityLevel = localStorage.getItem('activityLevel');
        if (storedActivityLevel) {
            setActivityLevel(storedActivityLevel);
        }

        const userId = sessionStorage.getItem('id');
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/user/profile/${userId}`);
                const data = await response.json();
                if (data && data.profile) {
                    const formattedProfile: Profile = {
                        ...data.profile,
                        birth_date: new Date(data.profile.birth_date).toISOString().split('T')[0]
                    };
                    setProfileData(formattedProfile);
                } else {
                    console.error("Perfil não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };
        fetchProfileData();
    }, []);

    const calculateTMB = () => {
        if (profileData) {
            const { weight, height, sex, birth_date } = profileData;
            const birthDate = new Date(birth_date);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            let tmbValue = sex === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;

            switch (activityLevel) {
                case 'sedentary': tmbValue *= 1.2; break;
                case 'light': tmbValue *= 1.375; break;
                case 'moderate': tmbValue *= 1.55; break;
                case 'active': tmbValue *= 1.725; break;
                case 'very-active': tmbValue *= 1.9; break;
            }

            setTmb(tmbValue);
        }
    };

    useEffect(() => {
        calculateTMB();
    }, [profileData, activityLevel]);

    const updateActivityLevel = (level: string) => {
        setActivityLevel(level);
        localStorage.setItem('activityLevel', level); // Salvar no localStorage
    };

    return (
        <ProfileContext.Provider value={{ profileData, tmb, activityLevel, setActivityLevel: updateActivityLevel, calculateTMB }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile deve ser usado dentro de ProfileProvider');
    }
    return context;
};