
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Compass, Lock } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Skills = () => {
  const skillCategories = [
    {
      id: "first-aid",
      name: "Primeiros Socorros",
      icon: Heart,
      topics: 8,
      unlocked: true,
      description: "Técnicas básicas de primeiros socorros"
    },
    {
      id: "navigation",
      name: "Navegação e Orientação", 
      icon: Compass,
      topics: 6,
      unlocked: true,
      description: "Leitura de mapas e uso de bússola"
    },
    {
      id: "survival",
      name: "Sobrevivência",
      icon: Shield,
      topics: 12,
      unlocked: false,
      description: "Técnicas de sobrevivência em campo",
      requiredRank: "Soldado"
    }
  ];

  const recentTopics = [
    { name: "Tipos de Curativos", category: "Primeiros Socorros", completed: true },
    { name: "Leitura de Coordenadas", category: "Navegação", completed: false },
    { name: "RCP Básico", category: "Primeiros Socorros", completed: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-2xl font-military font-bold">Habilidades</h1>
            <p className="text-sm opacity-80">Conhecimentos Militares</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Categorias</h2>
          <div className="grid gap-4">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className={`p-4 ${!category.unlocked ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        category.unlocked ? 'bg-primary/10' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          category.unlocked ? 'text-primary' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center space-x-2">
                          <span>{category.name}</span>
                          {!category.unlocked && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    {category.unlocked ? (
                      <Button variant="outline" size="sm">
                        Explorar
                      </Button>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Desbloqueado em</p>
                        <p className="text-sm font-medium text-accent">{category.requiredRank}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{category.topics} tópicos</span>
                    {category.unlocked && (
                      <span className="text-primary font-medium">Disponível</span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Topics */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Estudado Recentemente</h2>
          <div className="space-y-3">
            {recentTopics.map((topic, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {topic.completed && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Concluído
                      </span>
                    )}
                    <Button variant="outline" size="sm">
                      {topic.completed ? 'Revisar' : 'Continuar'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Skills;
