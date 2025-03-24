import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import ConvertBlog from "./pages/convert-blog/ConvertBlog";
import { UserDashboard } from "./pages/user-dashboard/UserDashboard";
import AutoSchedule from "./pages/auto-schedule/AutoSchedule";
import CreatePost from "./pages/create-post/createPost";

function App() {
  const { isAuthenticated } = useAuthStore();
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* --> Dashboard Routes --> */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <UserDashboard /> : <h2>Not Authorized</h2>}
        >
          {/* <Route index element={<DashboardHome />} /> */}
          <Route index element={<ConvertBlog />} />
          <Route path="convert-blog" element={<ConvertBlog />} />
          <Route path="auto-schedule" element={<AutoSchedule />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;