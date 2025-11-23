import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Form from "./components/pages/form";
import NotFound from "./components/pages/notFound";
import AppLayouts from "./components/appLayouts/AppLayouts";
import About from "./components/pages/about";
import Home from "./components/pages/home";
import LayoutNavbar from "./components/applayoutsnavbar/layoutNavbar";
import Service from "./components/pages/service";
import Contact from "./components/pages/contact";
import ProtectedRoute from "./components/Context/ProtectedRoute";
import { AuthProvider } from "./components/Context/authContext";
import Products from "./components/pages/products";

function AppRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayouts />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
      ],
    },
    {
      path: "/",
      element: <LayoutNavbar />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { path: "home", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "service", element: <Service /> },
            { path: "contact", element: <Contact /> },
            { path: "form", element: <Form /> },
            { path: "products", element: <Products/> }, // ✔️ Correct route
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRoute;
