const normalizeString = (value) => String(value ?? "").toLowerCase();

const normalizeNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
};

const normalizeDate = (value) => {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
};

const getCompareValue = (row, name, inputType) => {
    const value = row[name];

    switch (inputType) {
        case "text":
        case "email":
        case "password":
        case "textarea":
            return normalizeString(value);
        case "number":
        case "range":
            return normalizeNumber(value);
        case "date":
        case "datetime-local":
            return normalizeDate(value);
        case "date-range":
            return normalizeDate(value?.startDate);
        default:
            return normalizeString(value);
    }
};

export const getSortingLogic = (inputType, setRows) => {
    switch (inputType) {
        case "text":
        case "email":
        case "password":
        case "textarea":
        case "number":
        case "range":
        case "date":
        case "datetime-local":
        case "date-range":
            return (name, sortingOrder) => {
                if (!sortingOrder) return;

                setRows((prevRows) => {
                    const sortedData = [...prevRows].sort((a, b) => {
                        const first = getCompareValue(a, name, inputType);
                        const second = getCompareValue(b, name, inputType);

                        if (first < second) return sortingOrder === "Asc" ? -1 : 1;
                        if (first > second) return sortingOrder === "Asc" ? 1 : -1;
                        return 0;
                    });

                    return sortedData;
                });
            };

        default:
            return undefined;
    }
};