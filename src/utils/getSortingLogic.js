
export const getSortingLogic = (inputType, setTableRows) => {

    switch (inputType) {

        case "text":
        case "email":
        case "password":
        case "textarea": return (name, sortingOrder) => {
            if (!sortingOrder) return;
            setTableRows(prev => {
                const sortedData = [...prev];
                return sortingOrder === "Asc"
                    ? sortedData.sort((a, b) => a[name].localeCompare(b[name]))
                    : sortedData.sort((a, b) => b[name].localeCompare(a[name]));
            });
        };

        case "number":
        case "range": return (name, sortingOrder) => {
            if (!sortingOrder) return;
            setTableRows(prev => {
                const sortedData = [...prev];
                return sortingOrder === "Asc"
                    ? sortedData.sort((a, b) => a[name] - b[name])
                    : sortedData.sort((a, b) => b[name] - a[name]);
            });
        };

        case "date":
        case "datetime-local": return (name, sortingOrder) => {
            if (!sortingOrder) return;
            setTableRows(prev => {
                const sortedData = [...prev];
                return sortingOrder === "Asc"
                    ? sortedData.sort((a, b) => new Date(a[name]) - new Date(b[name]))
                    : sortedData.sort((a, b) => new Date(b[name]) - new Date(a[name]));
            });
        };

        case "date-range": return (name, sortingOrder) => {
            if (!sortingOrder) return;
            setTableRows(prev => {
                const sortedData = [...prev];
                return sortingOrder === "Asc"
                    ? sortedData.sort((a, b) => new Date(a[name].startDate) - new Date(b[name].startDate))
                    : sortedData.sort((a, b) => new Date(b[name].startDate) - new Date(a[name].startDate));
            });
        };

        default: return undefined
    }

}