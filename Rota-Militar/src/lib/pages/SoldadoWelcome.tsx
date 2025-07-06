
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
  Star, 
  Calendar, 
  Target, 
  Book, 
  BarChart3, 
  Trophy,
  ChevronRight 
} from "lucide-react";

const SoldadoWelcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Parabéns, Soldado! Você Elevou o Nível!",
      content: "Seu comprometimento é digno de um Soldado! Você acaba de desbloquear ferramentas poderosas para levar sua disciplina e condicionamento físico ao próximo patamar. Prepare-se para o avanço inicial!",
      icon: Star,
      buttonText: "Conhecer Minhas Novas Ferramentas"
    },
    {
      id: 2,
      title: "Mais Rotinas, Mais Organização: Até 5 Rotinas!",
      content: "Agora você pode criar e gerenciar até 5 rotinas personalizadas! Organize seu treino, estudos e compromissos com a flexibilidade que um Soldado precisa.",
      icon: Calendar,
      action: "Vá para 'Minhas Rotinas' para criar seu próximo plano!",
      buttonText: "Próxima Dica"
    },
    {
      id: 3,
      title: "Domine Cada Movimento: TFM Completo!",
      content: "Acesso total à nossa biblioteca de TFM com vídeos detalhados de cada exercício. Aprenda a técnica correta e maximize seus resultados com planos pré-definidos.",
      icon: Target,
      action: "Explore a 'Biblioteca de TFM' agora!",
      buttonText: "Próxima Dica"
    },
    {
      id: 4,
      title: "Acompanhe Sua Evolução: Histórico e Gráficos!",
      content: "Com o histórico detalhado e gráficos de progresso, você verá sua evolução em tempo real. Motive-se com cada avanço!",
      icon: BarChart3,
      action: "Confira seu 'Registro de Desempenho' na seção TFM.",
      buttonText: "Próxima Dica"
    },
    {
      id: 5,
      title: "Prepare-se para Vencer: TAF Simulado!",
      content: "Treine para o sucesso com nossos Testes de Aptidão Física (TAF) simulados. Calcule seus resultados e saiba onde você precisa melhorar.",
      icon: Trophy,
      action: "Acesse 'Simular TAF' na seção TFM.",
      buttonText: "Próxima Dica"
    },
    {
      id: 6,
      title: "Aprenda Mais: Habilidades Intermediárias!",
      content: "Desbloqueie guias como 'Navegação Básica' e 'Primeiros Socorros Avançados'. Seu conhecimento tático está crescendo!",
      icon: Book,
      action: "Descubra os novos conteúdos em 'Habilidades e Conhecimentos'.",
      buttonText: "Finalizar"
    },
    {
      id: 7,
      title: "Avance em Sua Disciplina, Soldado!",
      content: "Essas são suas novas ferramentas de Soldado. Use cada recurso para alcançar seus objetivos e continuar evoluindo na hierarquia!",
      icon: Star,
      buttonText: "Começar Minha Jornada de Soldado"
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
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-700 text-white">
      <div className="p-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentSlide ? 'bg-blue-300' : 'bg-white/30'
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
                          <IconComponent className="w-20 h-20 mx-auto mb-4 text-blue-300" />
                        </div>
                        
                        <h1 className="text-2xl font-military font-bold mb-6">
                          {slide.title}
                        </h1>
                        
                        <p className="text-sm opacity-90 leading-relaxed mb-6">
                          {slide.content}
                        </p>
                        
                        {slide.action && (
                          <div className="bg-blue-300/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-blue-300 font-medium">
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-sm">{slide.action}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={index === slides.length - 1 ? handleFinish : handleNext}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-4"
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

export default SoldadoWelcome;
