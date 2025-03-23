import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import { UserDashboard } from "./components/user-dashboard";
function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        {/* <Route path="/dashboard/*" element={<UserDashboard />}>
          <Route index element={<h2>Dashboard Home</h2>} />
          <Route path="post" element={<PostPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;