import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DynamicForm from "./pages/DynamicForm";
import FinalFormPage from "./pages/FinalFormPage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import DisplayData from "./pages/DisplayData";

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
              path: "/form",
              element: <FinalFormPage />,
            },
            {
              path: "/list",
              element: <DisplayData />
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