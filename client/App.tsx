import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Result from "./pages/Result"; 
import React from 'react';

// 💡 NEW: Import the ThemeProvider
import { ThemeProvider } from '@/components/ui/theme-provider'; 
import { ModeToggle } from '@/components/ui/mode-toggle';

const queryClient = new QueryClient();

export default function App() {
  return (
    // 1. Wrap the entire application with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      
      {/* 2. CRITICAL: Wrap the rest of the application with ThemeProvider */}
      <ThemeProvider defaultTheme="dark" storageKey="culture-verse-theme">
        
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* DYNAMIC RESULT ROUTE */}
              <Route path="/result/:id" element={<Result />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          
        </TooltipProvider>
        
      </ThemeProvider>
      
    </QueryClientProvider>
  );
}