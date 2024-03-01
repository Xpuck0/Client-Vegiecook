
const courseBase = 'http://localhost:8000/courses/';

export async function getAllCourses() {
    const res = await fetch(courseBase);

    if (!res.ok) {
        return { success: false, error: res.error }
    }

    const out = await res.json()
    return { success: true, data: out }
}


export async function getCourse(id) {
    const res = await fetch(courseBase + id);

    if (!res.ok) {
        return { success: false, error: res.error }
    }

    const out = await res.json()
    return { success: true, data: out }
}

const data = await getCourse(3);
console.log(data)

