import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DynamicForm from "./pages/DynamicForm";
import FinalFormPage from "./pages/FinalFormPage";

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
          path: "/final-form",
          element: <FinalFormPage />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;