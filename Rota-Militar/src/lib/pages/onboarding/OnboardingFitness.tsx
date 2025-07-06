
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const OnboardingFitness = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");

  const levels = [
    {
      id: "iniciante",
      title: "Iniciante",
      subtitle: "Começando agora, pouco preparo físico",
      progress: "1/3"
    },
    {
      id: "intermediario", 
      title: "Intermediário",
      subtitle: "Já pratica exercícios, mas não de forma intensa",
      progress: "2/3"
    },
    {
      id: "avancado",
      title: "Avançado", 
      subtitle: "Treino regularmente e tenho bom condicionamento",
      progress: "3/3"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg animate-fade-in">
          <h1 className="text-2xl font-military font-bold mb-4 text-center">
            Como Anda o Seu Preparo Físico?
          </h1>
          
          <p className="text-center mb-8 opacity-90">
            Para que possamos sugerir o TFM ideal, como você se descreve hoje?
          </p>
          
          <div className="space-y-4 mb-8">
            {levels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => setSelected(level.id)}
                className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                  selected === level.id 
                    ? 'bg-accent/20 border-accent shadow-lg transform scale-105' 
                    : 'bg-white/10 border-white/30 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{level.title}</h3>
                    <p className="text-sm opacity-80">{level.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((bar) => (
                        <div 
                          key={bar}
                          className={`w-2 h-6 rounded ${
                            bar <= index + 1 ? 'bg-accent' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs opacity-70">{level.progress}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/onboarding/profile')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button 
              onClick={() => navigate('/onboarding/goals')}
              disabled={!selected}
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
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
        </div>
        <p className="text-center text-sm mt-2 opacity-70">3 de 5</p>
      </div>
    </div>
  );
};

export default OnboardingFitness;
