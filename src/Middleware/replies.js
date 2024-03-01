
const baseReplies = 'http://localhost:8000/replies/';


const createReply = async (user_id, comment_id, comment) => {
    try {
        const reqBody = {
            user_id: user_id,
            parent_comment: comment_id,
            comment: comment
        };

        const res = await fetch(baseReplies + 'create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        // console.log(await res.json())

        if (!res.ok) {
            throw new Error("Failed to create reply.")
        }

        const data = await res.json();
        // console.log(data)
        return { success: true, data: data }
    } catch (error) {
        return { success: false, data: error.message }
    }
}

const updateReply = async (reply_id, comment) => {
    try {
        const reqBody = {
            reply_id: reply_id,
            comment: comment
        };

        const res = await fetch(baseReplies + reply_id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        if (!res.ok) {
            throw new Error("Failed to update reply.")
        }

        const data = await res.json();
        return { success: true, data: data }
    } catch (error) {
        return { success: false, data: error.message }
    }
}


const deleteReply = async (reply_id) => {
    try {

        const res = await fetch(baseReplies + reply_id, {
            method: 'DELETE',
        })


        if (!res.ok) {
            throw new Error("Failed to delete reply.")
        }

        return { success: true }
    } catch (error) {
        return { success: false }
    }
}


export { createReply, updateReply, deleteReply };