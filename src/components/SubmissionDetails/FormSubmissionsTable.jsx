import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import Table from "../ui/Table";
import Actions from "../ui/Actions";
import ConfirmationPopup from "../ui/ConfirmationPopup";
import { toastNotification } from "../../utils/toastHelper";
import EmptyMessage from "./EmptyMessage";
import PaginationBar from "../ui/PaginationBar";
import Select from "../ui/Select";

const FormSubmissionsTable = () => {

    const [filters, setFilters] = useState({
        name: "",
        value: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        if (name === "name") {
            setFilters({ name: value, value: "" })
        } else {
            setFilters({ ...filters, value: value })
        }
    }

    const applyFilters = () => {
        
    }

    const [selectedId, setSelectedId] = useState(null);

    const rawFormSchema = localStorage.getItem("formSchema")
    const rawFormData = localStorage.getItem("submittedFormData")
    const formSchema = JSON.parse(rawFormSchema) || [];
    const navigate = useNavigate();

    const [formData, setFormData] = useState(JSON.parse(rawFormData) || {});

    useEffect(() => {
        localStorage.setItem("submittedFormData", JSON.stringify(formData));
    }, [formData]);

    const tableColumns = [...formSchema.map(({ label, name }) => ({ name, label })), { name: "actions", label: "Actions" }]
    const tableData = formData.map(({ data, submissionId }) => {
        return {
            ...data,
            actions: <Actions
                handleEdit={() => handleEdit(submissionId)}
                handleDelete={() => setSelectedId(submissionId)}
            />
        }
    })
    const [tableRows, setTableRows] = useState([]);

    const handleEdit = (submissionId) => {
        navigate(`/form?submissionId=${submissionId}`)
    }

    const handleDelete = (submissionId) => {
        console.log("submissionId", submissionId);
        const newFormData = formData.filter(({ submissionId: currId }) => currId !== submissionId);
        setFormData(newFormData);
        setSelectedId(null)
        toastNotification("Row deleted successfully", "success");
    }

    return (
        <>
            <div className="grid grid-cols-[1fr_2fr_2fr_0.5fr] gap-5 w-full">
                <label className="font-semibold! text-xl uppercase" htmlFor="">Filter Table Data</label>
                <Select
                    options={tableColumns}
                    handleChange={handleChange}
                    name="name"
                    value={filters.name}
                    placeholder="Select Label"
                    className="focus:border-(--table-header-bg)!"
                />
                <input
                    name="value"
                    value={filters.value}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter value for selected label"
                    className={`w-full pr-10 appearance-none rounded-lg border ${!filters.value ? "text-(--secondary-text) border-(--border)" : "text-(--primary-text)"} bg-white px-2 py-1.5 outline-none transition placeholder:text-(--secondary-text) focus:border-(--table-header-bg) focus:ring-2 focus:ring-indigo-100`}
                />
                <button
                    onClick={applyFilters}
                    className="cursor-pointer h-fit rounded bg-(--table-header-bg) px-4 py-2.5 text-sm font-semibold text-white transition"
                >
                    Apply Filters
                </button>
            </div>
            {formData && tableData.length !== 0
                ? <>
                    <Table columns={tableColumns} rows={tableRows} />
                    <PaginationBar setTableRows={setTableRows} tableData={tableData} />
                </>
                : <EmptyMessage />}
            {selectedId && <ConfirmationPopup setSelectedId={setSelectedId} onConfirm={() => handleDelete(selectedId)} />}
        </>
    );
};

export default FormSubmissionsTable;
