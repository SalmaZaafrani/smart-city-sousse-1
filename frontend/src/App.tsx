import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityMapPage from "./pages/CityMapPage";
import SensorsPage from "./pages/SensorsPage";
import VehiclesPage from "./pages/VehiclesPage";
import CitizensPage from "./pages/CitizensPage";
import InterventionsPage from "./pages/InterventionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<CityMapPage />} />
          <Route path="/sensors" element={<SensorsPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/citizens" element={<CitizensPage />} />
          <Route path="/interventions" element={<InterventionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
