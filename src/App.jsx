import { DevTool } from "@hookform/devtools";
import JsonEditor from "./components/JsonEditor";
import LivePreview from "./components/LivePreview";
import { FormProvider, useForm } from "react-hook-form";

const App = () => {

  const methods = useForm({
    defaultValues : {}
  });

  return (
  <div className="w-full min-h-screen flex bg-gray-100 p-20 gap-10">
    <JsonEditor />
    <FormProvider {...methods}>
        <LivePreview /> 
    </FormProvider>
    <DevTool control={methods.control} />
  </div>
  );
};

export default App;