
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  Crown, 
  Brain, 
  Watch, 
  Mic,
  Users,
  Target,
  Headphones,
  ChevronRight 
} from "lucide-react";

const TenenteWelcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Bem-vindo, Tenente! Alcance a Elite!",
      content: "Você chegou ao ápice da disciplina e da estratégia! O plano Tenente é o nível máximo, oferecendo o que há de mais avançado para profissionais de segurança e atletas de alto rendimento.",
      icon: Crown,
      buttonText: "Descobrir Recursos de Elite"
    },
    {
      id: 2,
      title: "Seu Treinador Virtual: Planos por IA!",
      content: "Receba planos de treinamento personalizados e adaptativos, desenvolvidos por nossa inteligência artificial para otimizar cada segundo do seu preparo.",
      icon: Brain,
      action: "Confira seu novo plano personalizado na seção TFM.",
      buttonText: "Próxima Dica"
    },
    {
      id: 3,
      title: "Dados em Tempo Real: Integração Wearable!",
      content: "Conecte seu smartwatch ou monitor cardíaco para registrar seus dados de TFM automaticamente. Integração total para um acompanhamento preciso.",
      icon: Watch,
      action: "Acesse 'Configurações' para conectar seus dispositivos.",
      buttonText: "Próxima Dica"
    },
    {
      id: 4,
      title: "Mãos Livres: Reconhecimento de Voz!",
      content: "Controle seu treino com comandos de voz. Mantenha o foco e a fluidez, sem precisar tocar na tela durante os exercícios.",
      icon: Mic,
      action: "Experimente o comando de voz durante seu próximo TFM.",
      buttonText: "Próxima Dica"
    },
    {
      id: 5,
      title: "Networking de Elite: Fórum de Oficiais!",
      content: "Conecte-se e troque experiências em nosso fórum exclusivo para Oficiais. Discussões estratégicas e insights valiosos esperam por você.",
      icon: Users,
      action: "Visite o 'Fórum de Oficiais' e participe!",
      buttonText: "Próxima Dica"
    },
    {
      id: 6,
      title: "Estratégia Avançada: Planejamento de Missão!",
      content: "Utilize recursos dedicados ao planejamento de missões, com checklists detalhados e ferramentas de organização para seus maiores desafios.",
      icon: Target,
      action: "Acesse as novas ferramentas de 'Planejamento de Missão'.",
      buttonText: "Próxima Dica"
    },
    {
      id: 7,
      title: "Atendimento Exclusivo: Suporte Prioritário!",
      content: "Tenha acesso a um suporte prioritário e dedicado, garantindo que todas as suas dúvidas e necessidades sejam atendidas com agilidade.",
      icon: Headphones,
      action: "Se precisar, acesse 'Ajuda e Suporte' para atendimento prioritário.",
      buttonText: "Finalizar"
    },
    {
      id: 8,
      title: "Comando da Elite, Tenente!",
      content: "Essas são suas ferramentas de elite. Você agora possui o arsenal completo para alcançar a excelência absoluta. Lidere pelo exemplo!",
      icon: Crown,
      buttonText: "Começar Minha Elite"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-800 text-white">
      <div className="p-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentSlide ? 'bg-yellow-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-lg mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => {
                const IconComponent = slide.icon;
                
                return (
                  <CarouselItem key={slide.id}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/30 text-white p-8 text-center min-h-[500px] flex flex-col justify-between">
                      <div>
                        <div className="mb-6">
                          <IconComponent className="w-20 h-20 mx-auto mb-4 text-yellow-400" />
                        </div>
                        
                        <h1 className="text-2xl font-military font-bold mb-6">
                          {slide.title}
                        </h1>
                        
                        <p className="text-sm opacity-90 leading-relaxed mb-6">
                          {slide.content}
                        </p>
                        
                        {slide.action && (
                          <div className="bg-yellow-400/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-yellow-400 font-medium">
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-sm">{slide.action}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={index === slides.length - 1 ? handleFinish : handleNext}
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-4"
                        >
                          {slide.buttonText}
                        </Button>
                        
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            onClick={() => navigate('/dashboard')}
                            className="w-full text-white/70 hover:text-white hover:bg-white/10"
                          >
                            Pular Apresentação
                          </Button>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TenenteWelcome;
