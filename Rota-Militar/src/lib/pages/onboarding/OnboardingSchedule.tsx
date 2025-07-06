
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";

const OnboardingSchedule = () => {
  const navigate = useNavigate();
  const [wakeTime, setWakeTime] = useState("06:00");
  const [reminders, setReminders] = useState(true);
  const [militarySounds, setMilitarySounds] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg animate-fade-in">
          <div className="text-center mb-8">
            <Clock className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h1 className="text-2xl font-military font-bold mb-4">
              Vamos Ajustar o Seu Despertador!
            </h1>
            <p className="opacity-90">
              A que horas você gostaria de ouvir a 'Alvorada' do seu dia?
            </p>
          </div>
          
          <div className="space-y-6 mb-8">
            {/* Time Selector */}
            <div className="bg-white/10 p-4 rounded-lg border border-white/30">
              <label className="block text-sm font-medium mb-2">Horário da Alvorada</label>
              <select 
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
              >
                <option value="05:00" className="text-gray-900">05:00</option>
                <option value="05:30" className="text-gray-900">05:30</option>
                <option value="06:00" className="text-gray-900">06:00</option>
                <option value="06:30" className="text-gray-900">06:30</option>
                <option value="07:00" className="text-gray-900">07:00</option>
              </select>
            </div>

            {/* Reminder Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg border border-white/30">
                <span>Lembrar-me 10 minutos antes de cada atividade</span>
                <button
                  onClick={() => setReminders(!reminders)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    reminders ? 'bg-accent' : 'bg-white/30'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    reminders ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg border border-white/30">
                <span>Permitir sons de alvorada militar</span>
                <button
                  onClick={() => setMilitarySounds(!militarySounds)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    militarySounds ? 'bg-accent' : 'bg-white/30'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    militarySounds ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/onboarding/goals')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button 
              onClick={() => navigate('/onboarding/complete')}
              className="flex-1 military-button group"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <div className="w-3 h-3 rounded-full bg-accent"></div>
        </div>
        <p className="text-center text-sm mt-2 opacity-70">5 de 5</p>
      </div>
    </div>
  );
};

export default OnboardingSchedule;
