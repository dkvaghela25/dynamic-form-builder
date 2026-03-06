import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Icon from "../../ui/Icon";

const FileUpload = ({ field, error }) => {

    const [fileName, setFileName] = useState("");

    const changeFile = (newFileName) => {
        setFileName(newFileName);
        field.onChange(newFileName)
    }

    const handleChange = (e) => {
        let { value: newFileName } = e.target;
        newFileName = newFileName.split('\\');
        newFileName = newFileName[newFileName.length - 1];
        changeFile(newFileName);
    }


    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0].name;
        changeFile(droppedFile);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        changeFile(null);
    }

    return (
        <>
            {fileName
                ? <div className="flex w-fit px-4 py-2 z-10 items-center gap-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                    <p className="font-semibold border-r pr-2 border-slate-300">{fileName}</p>
                    <Icon helperText="Remove File" icon="delete" onClick={handleRemove} />
                </div>
                :
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`p-4 w-full rounded-[calc(var(--radius-xl)+theme('padding.4'))]  border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}
                >
                    <label className="flex flex-col rounded-xl items-center justify-center w-full h-64 border border-dashed cursor-pointer">
                        <div className="flex flex-col gap-2 items-center justify-center text-body pt-5 pb-6">
                            <IoCloudUploadOutline className="w-10 h-10" />
                            <p className="text-[20px]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input type="file" className="hidden z-10" onChange={handleChange} />
                    </label>
                </div>
            }
        </>
    );
};

export default FileUpload;