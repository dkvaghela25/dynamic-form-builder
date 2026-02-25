import { useContext } from "react";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import InputField from "./InputField";

const LivePreview = () => {
    const { formSchema } = useContext(FormSchemaContext);
    return (
        <form className="w-[80%] ml-auto bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 border border-gray-500 flex flex-col gap-5">
            {formSchema.length === 0
                ? <div className="flex justify-center items-center w-full h-full text-3xl font-semibold!">Select input type from left side</div>
                : formSchema.map((schema, index) => {
                    return <InputField key={index} schema={schema} index={index} />
                })}
        </form>
    );
};

export default LivePreview;