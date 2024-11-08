import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";
import './styles/NutrientGraph.css'

// Registrar os componentes necessários do Chart.js
ChartJS.register(Tooltip, Legend, Title, ArcElement);

interface NutritionalData {
  total_energy_from_foods: number | null;
  total_protein_from_foods: number | null;
  total_carbohydrate_from_foods: number | null;
  total_lipids_from_foods: number | null;
  total_dietary_fiber_from_foods: number | null;
  date?: string;
}

interface NutrientGraphProps {
  nutritionalData: NutritionalData | null;
  isDateSpecific: boolean;
  exceededLimits: Record<string, boolean>;  // Adicionando 'exceededLimits' na tipagem
}

const NutrientGraph: React.FC<NutrientGraphProps> = ({ nutritionalData, isDateSpecific, exceededLimits }) => {  // Agora estamos desestruturando 'exceededLimits'
  const [chartData, setChartData] = useState({
    labels: [] as string[],  // Labels do gráfico de pizza
    datasets: [
      {
        label: "Macronutrientes", 
        data: [] as number[],  // Dados para o gráfico de pizza
        backgroundColor: [
          "rgb(255, 99, 132)", // Calorias
          "rgb(54, 162, 235)", // Proteínas
          "rgb(75, 192, 192)", // Carboidratos
          "rgb(153, 102, 255)", // Gorduras
          "rgb(255, 159, 64)", // Fibras
        ], // Cores para cada fatia
        hoverOffset: 4,
      },
    ],
  });

  const [isPercentageMode, setIsPercentageMode] = useState(false);  // Estado para controlar o modo (porcentagem ou valor absoluto)

  useEffect(() => {
    if (nutritionalData) {
      // Prepara os dados para o gráfico de pizza
      const labels = [
        "Calorias (kcal)",
        "Proteína (g)",
        "Carboidratos (g)",
        "Gorduras (g)",
        "Fibras (g)",
      ];

      // Valores de cada macronutriente
      const energy = nutritionalData.total_energy_from_foods || 0;
      const protein = nutritionalData.total_protein_from_foods || 0;
      const carbs = nutritionalData.total_carbohydrate_from_foods || 0;
      const lipids = nutritionalData.total_lipids_from_foods || 0;
      const fiber = nutritionalData.total_dietary_fiber_from_foods || 0;

      // Total de macronutrientes
      const total = energy + protein + carbs + lipids + fiber;

      // Calculando as porcentagens para cada macronutriente
      const energyPercentage = total > 0 ? (energy / total) * 100 : 0;
      const proteinPercentage = total > 0 ? (protein / total) * 100 : 0;
      const carbsPercentage = total > 0 ? (carbs / total) * 100 : 0;
      const lipidsPercentage = total > 0 ? (lipids / total) * 100 : 0;
      const fiberPercentage = total > 0 ? (fiber / total) * 100 : 0;

      // Condicional para escolher entre valores absolutos e porcentagens
      const data = isPercentageMode
        ? [energyPercentage, proteinPercentage, carbsPercentage, lipidsPercentage, fiberPercentage]
        : [energy, protein, carbs, lipids, fiber];

      // Atualiza os dados do gráfico de pizza
      setChartData({
        labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data,  // Dados com base no modo atual (absoluto ou porcentagem)
          },
        ],
      });
    }
  }, [nutritionalData, isPercentageMode]);  // Recalcula os dados quando mudar o estado ou os dados nutricionais

  // Função para formatar as legendas com a porcentagem ou valor absoluto
  const formatLabel = (value: number, isPercentage: boolean, label: string) => {
    return isPercentage
      ? `${label}: ${value.toFixed(2)}%`  // Mostra a porcentagem com 2 casas decimais
      : `${label}: ${value.toFixed(2)}`;  // Mostra o valor absoluto com 2 casas decimais
  };

  // Opções para personalizar o gráfico, incluindo as legendas
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const label = context.label || "";
            return formatLabel(value, isPercentageMode, label);  
          },
        },
      },
      legend: {
        labels: {
          generateLabels: (chart: any) => {
            return chart.data.labels.map((label: string, index: number) => {
              const value = chart.data.datasets[0].data[index];
              return {
                text: formatLabel(value, isPercentageMode, label),  // Formata a legenda com base no modo
                fillStyle: chart.data.datasets[0].backgroundColor[index],
                strokeStyle: chart.data.datasets[0].backgroundColor[index],
              };
            });
          },
          color: "white",  // Definindo a cor das labels das legendas como branca
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,  
  };

  return (
    <div className="chart-all" >
        <div className="header-chart">
      <h3 style={{ color: "white" }} id="title-graph">{isDateSpecific ? "Nutrientes para a Data Específica" : "Nutrientes ao Longo do Tempo"}</h3>
      </div>
      {/* Botão para alternar entre valor absoluto e porcentagem */}
      <button onClick={() => setIsPercentageMode(!isPercentageMode)} style={{ marginBottom: "10px" }} className="btn-chart">
        {isPercentageMode ? "Mostrar Valores Absolutos" : "Mostrar Porcentagens"}
      </button>

      <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
        <Pie data={chartData} options={options} />
      </div>
      <div style={{ color: "white", marginTop: "10px" }} className="alerts-div">
        {exceededLimits.energy && <p style={{ color: "white" }}>Limite de Calorias excedido!</p>}
        {exceededLimits.protein && <p style={{ color: "white" }}>Limite de Proteínas excedido!</p>}
        {exceededLimits.carbohydrate && <p style={{ color: "white" }}>Limite de Carboidratos excedido!</p>}
        {exceededLimits.total_lipids && <p style={{ color: "white" }}>Limite de Gorduras excedido!</p>}
        
      </div>
    </div>
  );
};

export default NutrientGraph;