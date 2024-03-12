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

export async function forumCreateQuestion(user_id, text) {
    try {
        const res = await fetch(questions + '/create', {
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

// const res = forumCreateQuestion('3', 'testTest')
// console.log(res)


export async function forumLike(type, question_id, user_id) {
    try {
        const base = type == 'questions' ? questions : answers;
        const url = `${base}/${question_id}/like/`;
        console.log(url)
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

