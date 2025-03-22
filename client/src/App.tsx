
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import TestPage from "./pages/test-page/TestPage";
import FeatureSectionQuickPostAI from "./mainComponents/features/Features";

function App() {
  const { isAuthenticated } = useAuthStore();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path:"/user",
      element: isAuthenticated ? <TestPage/> : <LandingPage/>
    },
    {
      path:"#features",
      element:<FeatureSectionQuickPostAI/>
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
