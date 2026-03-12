import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DynamicForm from "./pages/DynamicForm";
import FinalForm from "./pages/FinalForm";

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
          element: <FinalForm />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;