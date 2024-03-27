import { useContext, useEffect, useState } from 'react';
import style from './ForumPage.module.css';
import getQuestions, { forumCreateQuestion } from '../../Middleware/forum';
import QuestionsList from '../../Components/QuestionsList/QuestionsList';
import AuthContext from '../../contexts/AuthProvider';
import { QueryContext } from '../../contexts/QueryContext';


export default function ForumPage() {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(true);

    const { query } = useContext(QueryContext);

    const { userId, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await getQuestions();
            setQuestions(await res.data)
            setIsLoading(false);
        })()
    }, [])


    const filterQuestions = (query) => {
        return questions.filter(el => el.text.includes(query.trim()))
    }


    const questionSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("You must be authenticated!");
            return; // Use return here instead of return null for clarity
        } else if (!question.length) {
            setError("Response should be at least one symbol!");
        } else {
            const res = await forumCreateQuestion(userId, question);
            setError('');
            setQuestion('');
            if (res.success) {
                const newQuestion = await res.data;
                setQuestions(oldQuestions => [...oldQuestions, newQuestion]);
            } else {
                setError("Failed to post question.");
            }
            console.log(res);
        }
    };


    return (
        <div className={style.wrapper}>
            <h1 className={style.h1}>Welcome to the Forum Page!</h1>
            <form onSubmit={questionSubmitHandler} className={style.commentCreate}>
                <h2>Ask a Question</h2>
                <p className={style.instr}>If you've found the discussions on this forum helpful or engaging, we encourage you to leave your thoughts or questions below! Your insights not only foster a richer community dialogue but also help newcomers navigate and engage with our forum more effectively. Each contribution you make adds value and depth to our collective knowledge. We deeply appreciate your participation and support!</p>
                <textarea className={style.commentWrite} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask question...' />
                {error && <p className={style.error}>{error}</p>}
                {!isAuthenticated && <p>You must be authenticated to comment :)</p>}
                <button type='submit' disabled={!isAuthenticated} className={style.post}>post comment</button>
            </form>

            <QuestionsList questions={filterQuestions(query)} isLoading={isLoading} s />
        </div>
    )
}