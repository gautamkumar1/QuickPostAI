import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import { UserDashboard } from "./pages/user-dashboard/UserDashboard";
import ConvertBlogSkeleton from "./skeletons/ConvertBlogSkeleton";

// Dynamic imports using React.lazy()
const ConvertBlog = lazy(() => import("./pages/convert-blog/ConvertBlog"));
const AutoSchedule = lazy(() => import("./pages/auto-schedule/AutoSchedule"));
const CreatePost = lazy(() => import("./pages/create-post/CreatePost"));
const UnauthorizedPage = lazy(() => import("./pages/unauthorized/Unauthorized"));

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* --> Dashboard Routes --> */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <UserDashboard /> : <UnauthorizedPage />}
        >
          <Route 
            index 
            element={
              <Suspense fallback={<ConvertBlogSkeleton />}>
                <ConvertBlog />
              </Suspense>
            } 
          />
          <Route 
            path="convert-blog" 
            element={
              <Suspense fallback={<ConvertBlogSkeleton />}>
                <ConvertBlog />
              </Suspense>
            } 
          />
          <Route 
            path="auto-schedule" 
            element={
              <Suspense fallback={null}>
                <AutoSchedule />
              </Suspense>
            } 
          />
          <Route 
            path="create-post" 
            element={
              <Suspense fallback={null}>
                <CreatePost />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
