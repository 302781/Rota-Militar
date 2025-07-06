
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Clock, TrendingUp, Play } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const TFM = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const exercises = [
    {
      id: "flexoes",
      name: "Flexões",
      description: "Exercício para fortalecimento do peitoral e tríceps",
      category: "Força",
      difficulty: "Básico"
    },
    {
      id: "abdominais",
      name: "Abdominais",
      description: "Fortalecimento do core e músculos abdominais",
      category: "Força",
      difficulty: "Básico"
    },
    {
      id: "corrida",
      name: "Corrida",
      description: "Exercício cardiovascular para resistência",
      category: "Cardio",
      difficulty: "Intermediário"
    },
    {
      id: "barra",
      name: "Barra Fixa",
      description: "Exercício para fortalecimento das costas e bíceps",
      category: "Força",
      difficulty: "Avançado"
    }
  ];

  const trainingPlans = [
    {
      id: "taf60",
      name: "TAF em 60 Dias",
      description: "Prepare-se para o Teste de Aptidão Física",
      duration: "8 semanas",
      level: "Intermediário"
    },
    {
      id: "basico",
      name: "TFM Básico",
      description: "Rotina fundamental para iniciantes",
      duration: "4 semanas", 
      level: "Iniciante"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-2xl font-military font-bold">TFM</h1>
            <p className="text-sm opacity-80">Treinamento Físico Militar</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="exercises" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-4">
            <div className="grid gap-4">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {exercise.category}
                    </span>
                    <span>{exercise.difficulty}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <div className="grid gap-4">
              {trainingPlans.map((plan) => (
                <Card key={plan.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                    <Button className="military-button text-sm">
                      Iniciar
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{plan.duration}</span>
                    </div>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {plan.level}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Seu Progresso</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Flexões</span>
                    <span className="text-sm text-gray-600">Última: 25 rep</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Meta: 40 repetições</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Corrida</span>
                    <span className="text-sm text-gray-600">Última: 12min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Meta: 10 minutos (2km)</p>
                </div>
              </div>

              <Button className="w-full mt-4 military-button-secondary">
                Registrar Novo Resultado
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TFM;
