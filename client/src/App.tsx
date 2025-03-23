import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;