import { DevTool } from "@hookform/devtools";
import LivePreview from "./components/LivePreview";
import { FormProvider, useForm } from "react-hook-form";
import AvailableInputs from "./components/AvailableInputs";
import JsonViewer from "./components/JsonViewer";

const App = () => {

  const methods = useForm({
    defaultValues : {}
  });

  return (
  <div className="min-h-screen w-full bg-[#F2F6FA] p-10">
    <div className="flex w-full gap-10">
    <AvailableInputs />
    <FormProvider {...methods}>
        <LivePreview /> 
    </FormProvider>
    <JsonViewer />
    </div>
    <DevTool control={methods.control} />
  </div>
  );
};

export default App;