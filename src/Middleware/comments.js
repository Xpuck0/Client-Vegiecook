
const baseComment = 'http://localhost:8000/comments/';

const postComment = async (recipe_id, user_id, comment, rating) => {
    try {
        const body = {
            recipe_id: recipe_id,
            user_id: user_id,
            comment: comment,
            rating: rating || null
        }

        const res = await fetch(baseComment + 'create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }

    } catch (error) {
        return { success: false, error: error.message }
    }
};

const updateComment = async (comment, id) => {
    try {
        const body = {
            comment: comment
        };

        const res = await fetch(baseComment + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw new Error(`Failed to patch comment with id: ${id}`)
        }

        const data = res.json()
        return { success: true, data: data}
    } catch (error) {
        return { success: false, error: error.message }
    }
};

const deleteComment = async (id) => {
    try {
        const res = await fetch(baseComment + id, {
            method: "DELETE"
        })

        if (!res.ok) {
            throw new Error(`Failed to delete comment with id: ${id}`)
        }

        return { success: true }
    } catch (error) {
        return {success: false, error: error.message}
    }
};

export { postComment, updateComment, deleteComment };