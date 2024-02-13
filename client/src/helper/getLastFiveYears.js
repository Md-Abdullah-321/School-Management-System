export const getLastFiveYears = () => {
    const years = [];
    let currentYear = new Date().getFullYear();

    for (let i = 0; i < 5; i++){
        years[i] = currentYear;
        currentYear -= 1;
    }

    return years;
}