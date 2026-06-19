import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { SiteImagesProvider } from "@/hooks/useSiteImages";
import Index from "./pages/Index.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";
import GuidePage from "./pages/GuidePage.tsx";
import SilverCoastLanding from "./pages/SilverCoastLanding.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <SiteImagesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacidade" element={<Privacy />} />
            {/* SEO long-form guide — one route per language */}
            <Route path="/guia/viver-marinha-grande-leiria" element={<GuidePage locale="pt" />} />
            <Route path="/guides/living-in-marinha-grande-leiria" element={<GuidePage locale="en" />} />
            <Route path="/guia/vivir-en-marinha-grande-leiria" element={<GuidePage locale="es" />} />
            {/* EN landing: new build apartments Silver Coast Portugal */}
            <Route path="/new-build-apartments-silver-coast-portugal" element={<SilverCoastLanding />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
