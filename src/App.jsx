import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DynamicForm from "./pages/DynamicForm";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <DynamicForm />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;