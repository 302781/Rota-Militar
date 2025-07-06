
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Shield, Star, User, ArrowRight, ArrowLeft } from "lucide-react";

const OnboardingProfile = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");

  const options = [
    {
      id: "militar",
      title: "Militar da Ativa / Reserva",
      subtitle: "Selecione se você já serve ou serviu",
      icon: Shield
    },
    {
      id: "candidato", 
      title: "Candidato a Carreira Militar",
      subtitle: "Para quem está se preparando para entrar",
      icon: Star
    },
    {
      id: "civil",
      title: "Civil em Busca de Disciplina", 
      subtitle: "Para quem quer a rotina militar para a vida pessoal",
      icon: User
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg animate-fade-in">
          <h1 className="text-2xl font-military font-bold mb-4 text-center">
            Qual a sua Patente no Campo da Vida?
          </h1>
          
          <p className="text-center mb-8 opacity-90">
            Para quem você está construindo essa rotina?
          </p>
          
          <div className="space-y-4 mb-8">
            {options.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelected(option.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                    selected === option.id 
                      ? 'bg-accent/20 border-accent shadow-lg transform scale-105' 
                      : 'bg-white/10 border-white/30 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <IconComponent className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-sm opacity-80">{option.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/onboarding/welcome')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button 
              onClick={() => navigate('/onboarding/fitness')}
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
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
        </div>
        <p className="text-center text-sm mt-2 opacity-70">2 de 5</p>
      </div>
    </div>
  );
};

export default OnboardingProfile;
