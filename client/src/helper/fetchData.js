export const fetchData = async (url) => {
    const res = await fetch(url);
    return await res.json();
}