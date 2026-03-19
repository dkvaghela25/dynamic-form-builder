import { Link } from "react-router-dom";

const EmptyMessage = () => {
    return (
        <div className="p-20 w-full h-150 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <h2 className="text-3xl font-semibold text-(--primary-text)">Nothing Here Yet</h2>
            <p className="text-(--secondary-text) mt-2">Start by adding some data to see your table come alive.</p>
            <Link to="/form">
                <button
                    onClick={() => console.log("Add new entry")}
                    className="cursor-pointer mt-4 px-4 py-2 bg-(--table-header-bg) text-white rounded-md shadow"
                >
                    Add New Entry
                </button>
            </Link>
        </div>
    );
};

export default EmptyMessage;