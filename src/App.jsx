import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DynamicForm from "./pages/DynamicForm";
import FinalFormPage from "./pages/FinalFormPage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ConfirmationPage from "./pages/ConfirmationPage";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <DynamicForm />
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/final-form",
              element: <FinalFormPage />,
            },
            {
              path: "confirmation-page",
              element: <ConfirmationPage />
            }
          ]
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;