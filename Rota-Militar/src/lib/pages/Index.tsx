
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, Shield, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-8">
            <Shield className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl font-military font-bold mb-4">
              ROTINA MILITAR
            </h1>
            <div className="space-y-2 mb-6">
              <p className="text-xl font-semibold text-accent">DISCIPLINA</p>
              <p className="text-xl font-semibold text-accent">FORÇA</p>
              <p className="text-xl font-semibold text-accent">RESILIÊNCIA</p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Transforme disciplina em desempenho. Conquiste a sua melhor versão.
          </p>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/onboarding/welcome')}
              className="w-full military-button text-lg py-4"
            >
              COMEÇAR MISSÃO
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline" 
              className="w-full bg-transparent border-white text-white hover:bg-white/10"
            >
              Entrar
            </Button>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="opacity-80">TFM Personalizado</p>
            </div>
            <div className="text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="opacity-80">Sistema Patentes</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="opacity-80">Habilidades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm opacity-70">
        <p>Prepare-se para o comando da sua rotina!</p>
      </div>
    </div>
  );
};

export default Index;
