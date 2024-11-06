import React from 'react';
import { useProfile } from '../../components/contexts/ProfileContext'; 
import './styles/TMB.css';

const TMBCalculator = () => {
    const { profileData, tmb, activityLevel, setActivityLevel, calculateTMB } = useProfile();

    const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newActivityLevel = e.target.value;
        setActivityLevel(newActivityLevel);  // Atualiza o nível de atividade
        calculateTMB(); 
    };

    return (
        <div>
            <div className="card-tmb">
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
                    <>
                        <h2 id='result'>Seu TMB é: {tmb.toFixed(2)} kcal/dia</h2>
                        <p id='messages'>
                            {activityLevel === "sedentary" && "Seu TMB mostra suas necessidades calóricas em repouso. Como você leva um estilo de vida mais sedentário, nossos planos podem ajudar a introduzir gradualmente atividades físicas e dietas adequadas para melhorar sua saúde."}
                            {activityLevel === "light" && "Com uma leve atividade física, suas necessidades calóricas aumentam um pouco. Explore nossas dietas equilibradas para ajudar a manter energia e disposição ao longo do dia."}
                            {activityLevel === "moderate" && "Com uma rotina moderada de atividade, seu corpo precisa de mais combustível. Que tal um plano alimentar personalizado para otimizar sua energia e auxiliar no ganho de massa magra?"}
                            {activityLevel === "active" && "Seu estilo de vida ativo exige energia extra. Nossas dietas de alto desempenho podem te ajudar a alcançar seus objetivos, garantindo nutrientes adequados para um melhor desempenho físico."}
                            {activityLevel === "very-active" && "Com um nível de atividade muito intenso, seu corpo precisa de bastante energia. Experimente nossos planos avançados para atletas, ajudando na recuperação muscular e na manutenção da performance."}
                        </p>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
};

export default TMBCalculator;