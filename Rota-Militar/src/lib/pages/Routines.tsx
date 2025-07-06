
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Edit, Trash2, Clock } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Routines = () => {
  const [routines, setRoutines] = useState([
    {
      id: "1",
      name: "Rotina Semanal Básica",
      days: ["Seg", "Ter", "Qua", "Sex"],
      activities: 4,
      created: "Há 2 dias"
    },
    {
      id: "2", 
      name: "Preparatório Campo",
      days: ["Sáb", "Dom"],
      activities: 6,
      created: "Há 1 semana"
    }
  ]);

  const preDefinedRoutines = [
    {
      id: "basic",
      name: "Rotina Básica Militar",
      description: "Rotina fundamental para disciplina diária",
      activities: 5,
      level: "Iniciante"
    },
    {
      id: "advanced",
      name: "Treinamento Intensivo",
      description: "Para militares experientes",
      activities: 8,
      level: "Avançado"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="military-gradient text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-2xl font-military font-bold">Rotinas</h1>
              <p className="text-sm opacity-80">Organize sua disciplina</p>
            </div>
          </div>
          <Button 
            className="bg-accent hover:bg-accent/90 text-primary font-semibold"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* My Routines */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Minhas Rotinas</h2>
          <div className="space-y-3">
            {routines.map((routine) => (
              <Card key={routine.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{routine.name}</h3>
                    <p className="text-sm text-gray-600">
                      {routine.activities} atividades • {routine.created}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div className="flex space-x-1">
                    {routine.days.map((day) => (
                      <span 
                        key={day}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pre-defined Routines */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Rotinas Pré-Definidas</h2>
          <div className="space-y-3">
            {preDefinedRoutines.map((routine) => (
              <Card key={routine.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{routine.name}</h3>
                    <p className="text-sm text-gray-600">{routine.description}</p>
                  </div>
                  <Button className="military-button text-sm">
                    Usar
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{routine.activities} atividades</span>
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {routine.level}
                  </span>
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

export default Routines;
