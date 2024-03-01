export async function getDiets() {
    try {
        const res = await fetch('http://localhost:8000/diets');
        if (!res.ok){
            throw new Error("Failed to fetch all diets.")
        }
        const data = await res.json();
        return { success: true, data: data}
    } catch (error) {
        return { success: false, error: error.message}
    }
}

// console.log(await getDiets())