
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
  Shield, 
  Calendar, 
  Target, 
  Book, 
  BarChart3, 
  ChevronRight 
} from "lucide-react";

const RecrutaWelcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Bem-vindo, Recruta! Sua Jornada Começa Agora!",
      content: "Você deu o primeiro passo rumo à disciplina e ao alto desempenho. O Plano Recruta oferece as ferramentas essenciais para iniciar sua transformação. Prepare-se para experimentar o rigor e a organização da vida militar.",
      icon: Shield,
      buttonText: "Começar Minha Rotina"
    },
    {
      id: 2,
      title: "Sua Primeira Rotina Personalizada",
      content: "No plano Recruta, você pode criar 1 rotina personalizada para organizar seu dia. Seja disciplinado e transforme pequenos hábitos em grandes conquistas!",
      icon: Calendar,
      action: "Acesse 'Minhas Rotinas' para criar sua primeira rotina personalizada.",
      buttonText: "Próxima Dica"
    },
    {
      id: 3,
      title: "TFM Básico: Seus Primeiros Exercícios",
      content: "Tenha acesso à biblioteca essencial de exercícios de TFM. Comece com exercícios básicos e construa uma base sólida para seu condicionamento físico.",
      icon: Target,
      action: "Explore a 'Biblioteca de TFM' e comece seu treinamento básico.",
      buttonText: "Próxima Dica"
    },
    {
      id: 4,
      title: "Acompanhe Seu Progresso Diário",
      content: "Registre seu desempenho diário de TFM e veja sua evolução ao longo do tempo. Cada pequeno progresso conta para sua transformação!",
      icon: BarChart3,
      action: "Visite a seção 'Registro de Desempenho' para acompanhar sua evolução.",
      buttonText: "Próxima Dica"
    },
    {
      id: 5,
      title: "Conhecimentos Básicos Militares",
      content: "Acesse guias introdutórios de habilidades essenciais como primeiros socorros básicos e fundamentos de disciplina militar.",
      icon: Book,
      action: "Confira a seção 'Habilidades e Conhecimentos' para aprender o básico.",
      buttonText: "Finalizar"
    },
    {
      id: 6,
      title: "Comece Sua Jornada de Disciplina!",
      content: "Essas são suas ferramentas gratuitas para começar. Use-as bem e, quando estiver pronto, considere evoluir para planos mais avançados!",
      icon: Shield,
      buttonText: "Começar Minha Jornada de Recruta"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-gray-700 text-white">
      <div className="p-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentSlide ? 'bg-green-400' : 'bg-white/30'
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
                          <IconComponent className="w-20 h-20 mx-auto mb-4 text-green-400" />
                        </div>
                        
                        <h1 className="text-2xl font-military font-bold mb-6">
                          {slide.title}
                        </h1>
                        
                        <p className="text-sm opacity-90 leading-relaxed mb-6">
                          {slide.content}
                        </p>
                        
                        {slide.action && (
                          <div className="bg-green-400/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-green-400 font-medium">
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-sm">{slide.action}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={index === slides.length - 1 ? handleFinish : handleNext}
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4"
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

export default RecrutaWelcome;
