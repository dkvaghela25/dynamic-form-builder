import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const PaginationBar = ({ tableData, setTableRows }) => {
    const [currPage, setCurrPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(tableData.length / rowsPerPage);
    const pagesArr = Array.from({ length: pages }, (_, index) => index + 1);

    useEffect(() => {
        const sliceStart = (currPage - 1) * rowsPerPage;
        setTableRows(tableData.slice(sliceStart, sliceStart + rowsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currPage]);

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
