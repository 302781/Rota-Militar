
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Star, Settings, LogOut, Crown, Award } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const ranks = [
    { name: "Recruta", level: 1, price: "Gratuito", current: true },
    { name: "Soldado", level: 2, price: "R$ 19,90/mês", current: false },
    { name: "Sargento", level: 3, price: "R$ 39,90/mês", current: false },
    { name: "Tenente", level: 4, price: "R$ 59,90/mês", current: false }
  ];

  const achievements = [
    { name: "Primeira Missão", description: "Completou primeira rotina", earned: true },
    { name: "Disciplinado", description: "7 dias consecutivos", earned: true },
    { name: "Resistente", description: "30 flexões em sequência", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-military font-bold">Recruta João</h1>
            <p className="text-sm opacity-80">Membro desde Janeiro 2025</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm">Nível 1 - Básico</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Plan */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sua Patente Atual</h2>
            <Crown className="w-5 h-5 text-accent" />
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-primary">Recruta</h3>
                <p className="text-sm text-gray-600">Acesso básico ao app</p>
              </div>
              <Button className="military-button text-sm">
                Fazer Upgrade
              </Button>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Conquistas</h2>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <Award className={`w-4 h-4 ${
                    achievement.earned ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subscription Plans */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Planos Disponíveis</h2>
          <div className="space-y-3">
            {ranks.map((rank) => (
              <div 
                key={rank.level}
                className={`p-4 rounded-lg border ${
                  rank.current 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center space-x-2">
                      <span>{rank.name}</span>
                      {rank.current && (
                        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                          Atual
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{rank.price}</p>
                  </div>
                  {!rank.current && (
                    <Button variant="outline" size="sm">
                      Assinar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-5 h-5 mr-3" />
              Configurações
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              Sair da Conta
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
