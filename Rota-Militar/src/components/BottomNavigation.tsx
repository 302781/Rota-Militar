
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Target, Shield, User, Calendar } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "dashboard", icon: Home, label: "Início", path: "/dashboard" },
    { id: "tfm", icon: Target, label: "TFM", path: "/tfm" },
    { id: "routines", icon: Calendar, label: "Rotinas", path: "/routines" },
    { id: "skills", icon: Shield, label: "Habilidades", path: "/skills" },
    { id: "profile", icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
