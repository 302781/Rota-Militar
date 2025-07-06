
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Target, Shield, Star, ArrowRight, ArrowLeft } from "lucide-react";

const OnboardingGoals = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const goals = [
    {
      id: "condicionamento",
      title: "Melhorar o Condicionamento Físico",
      subtitle: "Foco em TFM",
      icon: Target
    },
    {
      id: "disciplina",
      title: "Ganhar Disciplina e Foco",
      subtitle: "Organização da rotina",
      icon: Shield
    },
    {
      id: "testes",
      title: "Preparar para Testes Físicos (TAF)",
      subtitle: "Para candidatos ou militares",
      icon: Star
    }
  ];

  const toggleGoal = (goalId: string) => {
    setSelected(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg animate-fade-in">
          <h1 className="text-2xl font-military font-bold mb-4 text-center">
            Qual é a Sua Missão Principal?
          </h1>
          
          <p className="text-center mb-8 opacity-90">
            O que você mais busca com o nosso aplicativo? (Você pode escolher mais de uma)
          </p>
          
          <div className="space-y-4 mb-8">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              const isSelected = selected.includes(goal.id);
              
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                    isSelected 
                      ? 'bg-accent/20 border-accent shadow-lg transform scale-105' 
                      : 'bg-white/10 border-white/30 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <IconComponent className="w-8 h-8 text-accent" />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-xs text-primary">✓</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm opacity-80">{goal.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/onboarding/fitness')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button 
              onClick={() => navigate('/onboarding/schedule')}
              disabled={selected.length === 0}
              className="flex-1 military-button group"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
        </div>
        <p className="text-center text-sm mt-2 opacity-70">4 de 5</p>
      </div>
    </div>
  );
};

export default OnboardingGoals;
