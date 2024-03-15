import { json } from "react-router-dom";

const base = 'http://localhost:8000/forum'
const questions = base + '/questions';
const answers = base + '/answers';

export default async function getQuestions() {
    try {
        const res = await fetch(questions);
        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }
    } catch (error) {
        console.error(error.message)
    }
}

export async function getQuestion(id) {
    try {
        const res = await fetch(questions + '/' + id);
        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }
    } catch (error) {
        console.error(error.message)
    }
}

export async function getAnswer(id) {
    try {
        const res = await fetch(answers + '/' + id);
        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }
    } catch (error) {
        console.error(error.message)
    }
}


export async function forumCreateQuestion(user_id, text) {
    try {
        const res = await fetch(questions + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                text: text
            })
        })

        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }

    } catch (error) {
        console.error(error.message)
    }
}

export async function forumCreateAnswer(question_id, user_id, text) {
    try {
        const res = await fetch(answers + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent: question_id,
                user_id: user_id,
                text: text
            })
        })

        if (!res.ok)
            throw new Error("Failed to create a comment.");

        const data = res.json()
        return { success: true, data: data }

    } catch (error) {
        console.error(error.message)
    }
}

export async function forumDelete(type, forum_id) {
    try {
        const base = type == 'questions' ? questions : answers;
        const url = `${base}/${forum_id}/`;
        const res = await fetch(url, {
            method: 'DELETE'
        })
        if (!res.ok)
            throw new Error("Failed to delete question.");

        let data = null;
        if (res.status !== 204) { // Check if the response is not No Content
            data = await res.json();
        }
        return { success: true, data: data }
    } catch (error) {
        console.error(error.message)
    }
}

export async function forumUpdate(type, forum_id, text) {
    try {
        const base = type == 'questions' ? questions : answers;
        const url = `${base}/${forum_id}/`;
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        })

        if (!res.ok)
            throw new Error("Failed to like a question.");

        const data = await res.json()
        return { success: true, data: data }

    } catch (error) {
        console.error(error.message)
    }
}



export async function forumLike(type, question_id, user_id) {
    try {
        const base = type == 'questions' ? questions : answers;
        const url = `${base}/${question_id}/like/`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id
            })
        })

        if (!res.ok)
            throw new Error("Failed to like a question.");

        const data = await res.json()
        return { success: true, data: data }

    } catch (error) {
        console.error(error.message)
    }
}

export async function checkIfUserLiked(userId, questionId = null, answerId = null) {
    if (!userId || (!questionId && !answerId)) {
        throw new Error("You must provide a user ID and either a question ID or an answer ID.");
    }
    if (questionId && answerId) {
        throw new Error("You can only provide either a question ID or an answer ID, not both.");
    }

    const queryParams = new URLSearchParams({ user_id: userId });
    if (questionId) queryParams.append('question_id', questionId);
    if (answerId) queryParams.append('answer_id', answerId);

    try {
        const query = `${base}/likes/check/?${queryParams}`
        console.log(query)
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.hasLiked;
    } catch (error) {
        console.error("Failed to check like status:", error);
        throw error;
    }
}
