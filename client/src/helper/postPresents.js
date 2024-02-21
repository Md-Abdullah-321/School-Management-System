export const postPresents = async (presentData) => {
    const res = await fetch("https://creepy-duck-glasses.cyclic.app/api/student", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: presentData.id,
            year: presentData.year,
            month: presentData.month,
            day: presentData.day,
            status: presentData.status
        })
    }    
    )
    return await res.json();
}