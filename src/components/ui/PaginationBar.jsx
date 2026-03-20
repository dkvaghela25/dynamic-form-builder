/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const PaginationBar = ({ filteredRows, setTableRows }) => {
    const [currPage, setCurrPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(filteredRows.length / rowsPerPage);
    
    const getPagesArr = () => {
        let arr = Array.from({ length: pages }, (_, index) => index + 1);
        if(pages <= 10) {
            return arr;
        } else {
            const starting = arr.slice(0,3);
            const ending = arr.slice(arr.length - 3);
            const middle = ["..."]

            if(![...starting, ...ending].includes(currPage)) {
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
        setTableRows(filteredRows.slice(sliceStart, sliceStart + rowsPerPage));
    }, [currPage, filteredRows]);

    const gotoPage = (pageNo) => {
        if (pageNo >= 1 && pageNo <= pages) setCurrPage(pageNo);
    };


    return (
        <div className="flex items-center justify-center py-6">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm bg-white border border-slate-200 overflow-hidden">
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
                        className={`relative inline-flex items-center px-4 py-2 cursor-pointer font-semibold border-r border-(--border) transition-all
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
            </nav>
        </div>
    );
};

export default PaginationBar;
