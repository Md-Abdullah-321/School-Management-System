const months = {
    "0": "Jan",
    "1": "Feb",
    "2": "Mar",
    "3": "Apr",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "Aug",
    "8": "Sep",
    "9": "Oct",
    "10": "Nov",
    "11": "Dec",
}

export const getDateAndMonth = () => {
    const date = new Date();
    return {
        date: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    }
}