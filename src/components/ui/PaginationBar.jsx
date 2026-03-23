/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Select from "./Select";
import { availableRowsPerPage } from "../../constants";

const PaginationBar = ({ filteredRows, setTableRows }) => {
    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pages = Math.ceil(filteredRows.length / rowsPerPage);

    const getPagesArr = () => {
        let arr = Array.from({ length: pages }, (_, index) => index + 1);
        if (pages <= 10) {
            return arr;
        } else {
            const starting = arr.slice(0, 3);
            const ending = arr.slice(arr.length - 3);
            const middle = ["..."]

            if (![...starting, ...ending].includes(currPage)) {
                middle.push(currPage - 1)
                middle.push(currPage)
                middle.push(currPage + 1)
                middle.push("...")
            }

            return [...starting, ...middle, ...ending]
        }
    }

    const pagesArr = getPagesArr();

    useEffect(() => {
        if (pages < currPage) setCurrPage(pages);
    }, [pages]);

    useEffect(() => {
        const sliceStart = (currPage - 1) * rowsPerPage;
        console.log(sliceStart)
        console.log(sliceStart + rowsPerPage)
        console.log(filteredRows.slice(sliceStart, sliceStart + rowsPerPage))
        setTableRows(filteredRows.slice(sliceStart, sliceStart + rowsPerPage));
    }, [currPage, filteredRows, rowsPerPage]);

    const gotoPage = (pageNo) => {
        if (pageNo >= 1 && pageNo <= pages) setCurrPage(pageNo);
    };


    return (
        <div className="flex items-center justify-between w-full">
            <div className="grid grid-cols-2 items-center w-[18%]">
                <label className="font-semibold text-(--primary-text)" htmlFor="">Rows Per Page : </label>
                <Select
                    name="type"
                    value={rowsPerPage}
                    placeholder="Select Input Type"
                    options={availableRowsPerPage}
                    handleChange={(e) => setRowsPerPage(+e.target.value)}
                    multiple={false}
                    className="focus:border-(--table-header-bg)!"
                />
            </div>
            <div className="flex items-center justify-center py-6">
                <div className="inline-flex -space-x-px rounded-md text-sm shadow-sm bg-white border border-slate-200 overflow-hidden">
                    <button
                        disabled={currPage === 1}
                        onClick={() => gotoPage(currPage - 1)}
                        className="relative inline-flex items-center px-3 py-2 text-(--primary-text) hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed border-r border-slate-200 transition-colors"
                    >
                        <MdArrowBackIos className="w-4 h-4" />
                    </button>

                    {pagesArr.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => gotoPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 cursor-pointer font-semibold border-r border-slate-200 transition-all
                            ${currPage === pageNumber
                                    ? "bg-(--table-header-bg) text-white"
                                    : "text-(--primary-text) hover:bg-slate-50"
                                }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        disabled={currPage === pages}
                        onClick={() => gotoPage(currPage + 1)}
                        className="relative inline-flex items-center px-3 py-2 text-(--primary-text) hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <MdArrowForwardIos className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationBar;
