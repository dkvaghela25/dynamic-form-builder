import { DevTool } from "@hookform/devtools";
import JsonEditor from "./components/JsonEditor";
import LivePreview from "./components/LivePreview";
import { FormProvider, useForm } from "react-hook-form";

const App = () => {

  const methods = useForm({
    defaultValues : {}
  });

  return (
  <div className="min-h-screen w-full bg-[#F2F6FA] px-30 py-10">
    <div className="flex w-full gap-10">
    <JsonEditor />
    <FormProvider {...methods}>
        <LivePreview /> 
    </FormProvider>
    </div>
    <DevTool control={methods.control} />
  </div>
  );
};

export default App;