
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Clock, CheckCircle, Calendar, Star } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Dashboard = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const todayTasks = [
    { id: "1", time: "06:00", name: "Alvorada", description: "Despertar e higiene pessoal" },
    { id: "2", time: "06:30", name: "TFM Básico", description: "30 flexões, 20 abdominais" },
    { id: "3", time: "07:00", name: "Café da Manhã", description: "Refeição balanceada" },
    { id: "4", time: "19:00", name: "Revisão do Dia", description: "Avaliar objetivos cumpridos" },
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const completionPercentage = Math.round((completedTasks.length / todayTasks.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-xl font-military font-bold">Recruta João</h1>
              <p className="text-sm opacity-80">Nível 1 - Básico</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Progresso Hoje</p>
            <p className="text-2xl font-bold text-accent">{completionPercentage}%</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Routine */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Minha Rotina Hoje</h2>
          </div>
          
          <div className="space-y-3">
            {todayTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div 
                  key={task.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg border transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {isCompleted && <CheckCircle className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex items-center space-x-3 flex-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {task.time} - {task.name}
                      </p>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Access */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="w-6 h-6 text-primary" />
              <span className="text-sm">TFM</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm">Habilidades</span>
            </Button>
          </div>
        </Card>

        {/* Daily Tip */}
        <Card className="p-6 bg-accent/5 border-accent/20">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-accent">Dica do Dia</h3>
          </div>
          <p className="text-sm text-gray-700">
            "A disciplina é a ponte entre objetivos e conquistas. Mantenha a constância!"
          </p>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
