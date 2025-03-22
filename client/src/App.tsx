import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import TestPage from "./pages/test-page/TestPage";

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={isAuthenticated ? <TestPage /> : <LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;