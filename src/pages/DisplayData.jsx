import CustomTable from "../components/DisplayData/CustomTable";

const DisplayData = () => {
    return (
        <div className="flex flex-col items-center gap-5 mx-auto w-[90vw] bg-white py-20 rounded-2xl min-h-[90vh]">
            <h2 className="text-2xl underline font-semibold">Submission Details</h2>
            <CustomTable />
        </div>
    );
};


export default DisplayData; 