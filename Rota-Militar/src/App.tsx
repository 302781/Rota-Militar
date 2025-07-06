import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OnboardingWelcome from "./pages/onboarding/OnboardingWelcome";
import OnboardingProfile from "./pages/onboarding/OnboardingProfile";
import OnboardingFitness from "./pages/onboarding/OnboardingFitness";
import OnboardingGoals from "./pages/onboarding/OnboardingGoals";
import OnboardingSchedule from "./pages/onboarding/OnboardingSchedule";
import OnboardingComplete from "./pages/onboarding/OnboardingComplete";
import Plans from "./pages/Plans";
import RecrutaWelcome from "./pages/RecrutaWelcome";
import SoldadoWelcome from "./pages/SoldadoWelcome";
import SargentoWelcome from "./pages/SargentoWelcome";
import TenenteWelcome from "./pages/TenenteWelcome";
import Dashboard from "./pages/Dashboard";
import TFM from "./pages/TFM";
import Routines from "./pages/Routines";
import Skills from "./pages/Skills";
import Profile from "./pages/Profile";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
          <Route path="/onboarding/profile" element={<OnboardingProfile />} />
          <Route path="/onboarding/fitness" element={<OnboardingFitness />} />
          <Route path="/onboarding/goals" element={<OnboardingGoals />} />
          <Route path="/onboarding/schedule" element={<OnboardingSchedule />} />
          <Route path="/onboarding/complete" element={<OnboardingComplete />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/recruta-welcome" element={<RecrutaWelcome />} />
          <Route path="/soldado-welcome" element={<SoldadoWelcome />} />
          <Route path="/sargento-welcome" element={<SargentoWelcome />} />
          <Route path="/tenente-welcome" element={<TenenteWelcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tfm" element={<TFM />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App
