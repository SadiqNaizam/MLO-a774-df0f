import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Ensure Sonner is imported if used for toast notifications
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly created pages
import Homepage from "./pages/Homepage";
import TextAnalysisPage from "./pages/TextAnalysisPage";
import LibraryPage from "./pages/LibraryPage";
import UserAccountPage from "./pages/UserAccountPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<TextAnalysisPage />} /> {/* Changed from /text-analysis */}
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/account" element={<UserAccountPage />} /> {/* Changed from /user-account */}
          <Route path="/auth" element={<AuthenticationPage />} /> {/* Changed from /authentication */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster /> {/* For shadcn/ui toasts if used directly */}
      <Sonner richColors position="top-right" /> {/* For sonner toasts, ensure it's configured */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;