
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import TestPage from "./pages/test-page/TestPage";

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
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
