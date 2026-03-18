import CustomTable from "../components/DisplayData/CustomTable";

const DisplayData = () => {
    return (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            <h2 className="text-2xl underline text-slate-900 m-auto font-semibold tracking-wide">Summary Report</h2>
            <CustomTable />
        </div>
    );
};


export default DisplayData;