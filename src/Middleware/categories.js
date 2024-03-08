export async function getCategories() {
    try {
        const res = await fetch('http://localhost:8000/categories/');
        if (!res.ok){
            throw new Error("Failed to fetch all categories.")
        }
        const data = await res.json();
        return { success: true, data: data}
    } catch (error) {
        return { success: false, error: error.message}
    }
}

export async function getCategoryById(id) {
    try {
        const res = await fetch('http://localhost:8000/categories/' + id);
        if (!res.ok){
            throw new Error("Failed to fetch category with id " + id)
        }
        const data = await res.json();
        return { success: true, data: data}
    } catch (error) {
        return { success: false, error: error.message}
    }
}

// const res = await getCategories();
// console.log(res)