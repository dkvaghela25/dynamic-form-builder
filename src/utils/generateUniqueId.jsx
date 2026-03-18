export const generateUniqueId = (prefix) => {
    const timestampPart = new Date().getTime();
    return `${prefix}${timestampPart}`;
};
