import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Icon from "../../ui/Icon";
import { FaFileImage } from "react-icons/fa";

const FileUpload = ({ field, error }) => {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const updateUploadedFiles = (files) => {
        setUploadedFiles(files);
        field.onChange(files)
    }

    const handleChange = (e) => {
        e.preventDefault();
        let { files } = e.target;
        let newFiles = Object.values(files);
        updateUploadedFiles([ ...uploadedFiles, ...newFiles]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        let newFiles = Object.values(files);
        updateUploadedFiles([ ...uploadedFiles, ...newFiles]);
    };

    const handleRemove = (e, index) => {
        e.preventDefault();
        console.log(index);
        const filteredFiles = uploadedFiles.filter((currFile, currIndex) => currIndex !== index)
        updateUploadedFiles(filteredFiles);
    }

    return (
        <div className="flex flex-col gap-2">
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
                    <input type="file" multiple className="hidden z-10" onChange={handleChange} />
                </label>
            </div>
            {uploadedFiles?.length !== 0 &&
                <div className="grid grid-cols-2 gap-2">
                    {uploadedFiles.map((file, index) => {
                        return (
                            <div key={index} className="flex justify-between w-full px-4 py-2 z-10 items-center gap-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <FaFileImage />
                                    <div className="font-semibold border-slate-300">{file.name}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="font-semibold border-r pr-2 border-slate-300">{Math.ceil(file.size / 1024)} K.B.</div>
                                    <Icon helperText="Remove File" icon="delete" onClick={(e) => handleRemove(e, index)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default FileUpload;