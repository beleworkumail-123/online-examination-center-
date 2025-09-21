import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { usePerformance } from "./hooks/use-performance";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

// Eager load critical pages instead of lazy loading
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UniversityEntranceExams from "./pages/UniversityEntranceExams";
import UniversityExitExams from "./pages/UniversityExitExams";
// Keep less critical pages lazy
const SubjectExams = lazy(() => import("./pages/SubjectExams"));
const ExamInterface = lazy(() => import("./pages/ExamInterface"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));


// Minimal loading - no animation for fastest perceived performance
const PageLoader = () => null;

const AppWrapper = () => {
  usePerformance();
  return (
    <TooltipProvider>
      <PerformanceOptimizer />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai" element={<Index />} />
            <Route path="/entrance-exams" element={<UniversityEntranceExams />} />
            <Route path="/exit-exams" element={<UniversityExitExams />} />
            <Route path="/work-exams" element={<UniversityExitExams />} />
            <Route path="/ngat-exams" element={<UniversityEntranceExams />} />
            <Route path="/exams/:type/:subject" element={<SubjectExams />} />
            <Route path="/exam/:type/:subject/:year" element={<ExamInterface />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = AppWrapper;

export default App;
