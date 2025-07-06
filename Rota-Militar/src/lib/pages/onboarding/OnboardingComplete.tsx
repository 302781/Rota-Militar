
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";

const OnboardingComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-3xl font-military font-bold mb-4">
              Pronto para a Ação, Recruta!
            </h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/30">
            <h2 className="text-lg font-semibold mb-4 text-accent">
              Sua Personalização foi Concluída
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Agora vamos escolher sua patente inicial. Você pode começar gratuitamente 
              como Recruta e fazer upgrade quando quiser para desbloquear mais recursos.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 rounded-lg p-4 text-left">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Próximo Passo</p>
                  <p className="text-sm opacity-80">Escolher sua Patente</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/plans')}
            className="w-full military-button text-lg py-4"
          >
            ESCOLHER MINHA PATENTE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
