
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";

const OnboardingWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          <Shield className="w-24 h-24 mx-auto mb-8 text-accent" />
          
          <h1 className="text-3xl font-military font-bold mb-6">
            Bem-vindo(a) ao Comando da Sua Rotina!
          </h1>
          
          <p className="text-lg mb-8 opacity-90 leading-relaxed">
            Prepare-se para transformar disciplina em desempenho. Para começarmos, 
            precisamos saber um pouco mais sobre você e seus objetivos.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/onboarding/profile')}
              className="w-full military-button text-lg py-4 group"
            >
              Iniciar Personalização
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
        </div>
        <p className="text-center text-sm mt-2 opacity-70">1 de 5</p>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
