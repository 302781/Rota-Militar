
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
  Award, 
  Calendar, 
  Target, 
  Book, 
  Medal, 
  ChevronRight 
} from "lucide-react";

const SargentoWelcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Parabéns, Sargento! Sua Jornada Continua!",
      content: "Você deu um passo à frente! Com o plano Sargento, seu arsenal de ferramentas militares ficou muito mais completo. Prepare-se para aprimorar sua liderança e especialização.",
      icon: Award,
      buttonText: "Conheça Suas Novas Ferramentas"
    },
    {
      id: 2,
      title: "Sua Mente no Comando: Rotinas Ilimitadas!",
      content: "No plano Sargento, a limitação de rotinas acabou! Agora você pode criar quantas rotinas personalizadas quiser. Crie uma para o dia a dia, outra para 'Missões de Campo', outra para fins de semana. O céu é o limite!",
      icon: Calendar,
      action: "Vá em 'Minhas Rotinas' e explore novas possibilidades de organização.",
      buttonText: "Próxima Dica"
    },
    {
      id: 3,
      title: "Desafie Seus Limites com o Modo 'Missão'!",
      content: "Preparado para o extremo? O Modo 'Missão' foi desbloqueado! Acesse desafios intensos de uma semana ou um mês, simulando um período de treinamento rigoroso. É hora de testar sua resiliência.",
      icon: Target,
      action: "Encontre o 'Modo Missão' no seu Dashboard ou na seção de 'Treinamento Tático' e comece seu desafio.",
      buttonText: "Próxima Dica"
    },
    {
      id: 4,
      title: "Domine Novas Táticas: Guias Avançados de Habilidades!",
      content: "Seu conhecimento tático acaba de ser ampliado. No plano Sargento, você tem acesso a todos os guias de habilidades, incluindo técnicas avançadas de sobrevivência, nós e amarrações complexas e comunicação tática. Aprimore-se para qualquer cenário!",
      icon: Book,
      action: "Visite a seção 'Habilidades e Conhecimentos' e mergulhe nos conteúdos exclusivos de Sargento.",
      buttonText: "Próxima Dica"
    },
    {
      id: 5,
      title: "Registre Sua Evolução: Diário de Bordo & Conquistas!",
      content: "Sua jornada merece ser documentada. O Diário de Bordo agora tem mais espaço para suas notas detalhadas, e você pode acompanhar análises semanais do seu progresso. Além disso, comece a colecionar medalhas e conquistas exclusivas por sua dedicação!",
      icon: Medal,
      action: "Acesse o 'Diário de Bordo' para registrar suas observações e confira a nova seção 'Conquistas' para ver suas medalhas.",
      buttonText: "Finalizar"
    },
    {
      id: 6,
      title: "Avance na Hierarquia, Sargento!",
      content: "Essas são apenas algumas das vantagens do seu novo plano. Explore o aplicativo e utilize cada recurso para alcançar seus objetivos. Estamos aqui para te apoiar em cada missão!",
      icon: Award,
      buttonText: "Começar Minha Jornada de Sargento"
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
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white">
      <div className="p-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentSlide ? 'bg-accent' : 'bg-white/30'
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
                          <IconComponent className="w-20 h-20 mx-auto mb-4 text-accent" />
                        </div>
                        
                        <h1 className="text-2xl font-military font-bold mb-6">
                          {slide.title}
                        </h1>
                        
                        <p className="text-sm opacity-90 leading-relaxed mb-6">
                          {slide.content}
                        </p>
                        
                        {slide.action && (
                          <div className="bg-accent/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-accent font-medium">
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-sm">{slide.action}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={index === slides.length - 1 ? handleFinish : handleNext}
                          className="w-full military-button text-lg py-4"
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

export default SargentoWelcome;
