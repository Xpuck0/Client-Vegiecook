import { useEffect, useState } from 'react';
import style from './ForumPage.module.css';
import getQuestions from '../../Middleware/forum';
import QuestionsList from '../../Components/QuestionsList/QuestionsList';

export default function ForumPage() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getQuestions();
            setQuestions(await res.data)
        })()
    }, [])

    return (
        <div className={style.wrapper}>
            <QuestionsList questions={questions} />
        </div>
    )
}