
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Star, Crown, Award, Check } from "lucide-react";

const Plans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "recruta",
      name: "Recruta",
      price: "Gratuito",
      icon: Shield,
      color: "bg-gray-100 text-gray-700",
      buttonClass: "border-gray-300 text-gray-700 hover:bg-gray-50",
      description: "Acesso Básico: O ponto de partida para todos os novos usuários.",
      features: [
        "Criação de 1 rotina personalizada por vez",
        "Acesso à biblioteca essencial de exercícios de TFM",
        "Registro de desempenho diário de TFM",
        "Notificações básicas de atividades",
        "Acesso aos guias introdutórios de habilidades"
      ],
      ideal: "Quem está começando e quer experimentar a disciplina militar"
    },
    {
      id: "soldado",
      name: "Soldado",
      price: "R$ 19,99/mês",
      yearlyPrice: "R$ 199,99/ano",
      icon: Star,
      color: "bg-blue-100 text-blue-700",
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
      description: "Avanço Inicial: Para quem leva a sério a disciplina e busca mais ferramentas.",
      features: [
        "Tudo do plano Recruta",
        "Criação de até 5 rotinas personalizadas",
        "Acesso completo à biblioteca de TFM com vídeos",
        "Planos de TFM pré-definidos",
        "Histórico detalhado e gráficos de progresso",
        "Testes de Aptidão Física (TAF) simulados",
        "Alertas personalizadas com sons de alvorada",
        "Acesso aos guias intermediários de habilidades"
      ],
      ideal: "Quem está comprometido em melhorar o condicionamento físico"
    },
    {
      id: "sargento",
      name: "Sargento",
      price: "R$ 49,99/mês",
      yearlyPrice: "R$ 499,99/ano",
      icon: Award,
      color: "bg-accent/20 text-accent",
      buttonClass: "bg-accent text-primary hover:bg-accent/90",
      description: "Liderança e Especialização: Para quem busca um nível superior de preparo.",
      features: [
        "Tudo do plano Soldado",
        "Rotinas personalizadas ilimitadas",
        "Modo 'Missão': Desafios intensos de treinamento",
        "Acesso a todas as seções de habilidades avançadas",
        "Diário de Bordo expandido com análises",
        "Conquistas e medalhas exclusivas",
        "Acesso antecipado a novas funcionalidades"
      ],
      ideal: "Militares em serviço e candidatos a concursos exigentes"
    },
    {
      id: "tenente",
      name: "Tenente",
      price: "R$ 99,99/mês",
      yearlyPrice: "R$ 999,99/ano (Obrigatório)",
      icon: Crown,
      color: "bg-primary/20 text-primary",
      buttonClass: "bg-primary text-white hover:bg-primary/90",
      description: "Elite e Estratégia: O nível máximo de acesso e comprometimento.",
      features: [
        "Tudo do plano Sargento",
        "Planos de treinamento personalizados por IA",
        "Integração com wearables e smartwatches",
        "Reconhecimento de voz para comandos",
        "Acesso a fórum exclusivo de 'Oficiais'",
        "Recursos de planejamento de missão",
        "Suporte prioritário"
      ],
      ideal: "Profissionais de segurança e atletas de alto rendimento"
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === "recruta") {
      navigate('/recruta-welcome');
    } else if (planId === "soldado") {
      navigate('/soldado-welcome');
    } else if (planId === "sargento") {
      navigate('/sargento-welcome');
    } else if (planId === "tenente") {
      navigate('/tenente-welcome');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h1 className="text-2xl font-military font-bold mb-2">
            Escolha Sua Patente
          </h1>
          <p className="text-sm opacity-90">
            Selecione o plano que melhor se adapta aos seus objetivos militares
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          
          return (
            <Card key={plan.id} className="p-6 relative overflow-hidden">
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${plan.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-primary">{plan.price}</span>
                      {plan.yearlyPrice && (
                        <span className="text-sm text-gray-600">{plan.yearlyPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 font-medium">{plan.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Recursos Inclusos:</h4>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-gray-800">Ideal para:</span> {plan.ideal}
                </p>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full ${plan.buttonClass}`}
                variant={plan.id === "recruta" ? "outline" : "default"}
              >
                {plan.id === "recruta" ? "Começar Grátis" : "Assinar Plano"}
              </Button>
            </Card>
          );
        })}

        {/* Footer Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-800 mb-2">
              💡 <strong>Dica:</strong> Você pode começar com o plano Recruta e fazer upgrade a qualquer momento.
            </p>
            <p className="text-xs text-blue-600">
              Todos os planos incluem suporte básico e atualizações regulares do aplicativo.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Plans;
