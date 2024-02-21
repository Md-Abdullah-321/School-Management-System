export const parseDate = (date) => {
    const dateArray = date.split("-");
    const year = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]);
    const day = parseInt(dateArray[2]);

    return { year, month, day };
}