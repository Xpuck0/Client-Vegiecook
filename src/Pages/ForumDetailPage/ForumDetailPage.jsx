import { useNavigate, useParams } from 'react-router-dom';
import style from './ForumDetailPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { forumCreateAnswer, forumDelete, getQuestion } from '../../Middleware/forum';
import ForumCard from '../../Components/ForumCard/ForumCard';
import { FidgetSpinner } from 'react-loader-spinner';
import { QueryContext } from '../../contexts/QueryContext';
import AuthContext from '../../contexts/AuthProvider';
import Path from '../../paths';

export default function ForumDetailPage() {
    const [thread, setThread] = useState({});
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('')

    const { query } = useContext(QueryContext);
    const { isAuthenticated, userId } = useContext(AuthContext);

    const { id } = useParams();

    const nav = useNavigate();

    useEffect(() => {

        (async (id) => {
            const data = await getQuestion(id);
            if (data.success) {
                setThread(await data.data);
            }
        })(id);
    }, [id])



    const filterAnswers = (answer) => {
        const queryMatch = answer.text.toLowerCase().includes(query.toLowerCase().trim());
        return queryMatch;
    };

    const answerSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("You must be authenticated!");
            return null;
        } else if (!answer.length) {
            setError("Response should be at least one symbol!");
        }
        else {
            const res = await forumCreateAnswer(thread.id, userId, answer)
            setError('');
            setAnswer('')
            if (res.success) {
                const n = await res.data;
                setThread(old => ({
                    ...old,
                    answers: [...old.answers, n]
                }));
            }
            console.log(res)
        }
    }

    const deleteHandler = async (e, type, id) => {
        e.preventDefault();
        const res = await forumDelete(type, id);
        if (res && res.success) { // Check if res is not undefined and then check for success
            if (type === 'answers') {
                setThread(old => ({
                    ...old,
                    answers: old.answers.filter(el => el.id !== id),
                }));
            } else if (type === 'questions') {
                nav(Path.Forum);
            }
        } else {
            // Handle failure (e.g., show an error message)
            console.error("Failed to delete", res?.error || "No response");
        }
    };

    if (!Object.keys(thread).length) {
        return (
            <div className={style.wrapper}>
                <FidgetSpinner />
            </div>
        )
    }
    
    return (
        <div className={style.wrapper}>
            <div className={style.question}>
                <ForumCard deleteHandler={deleteHandler} c={thread} detail={true} />
            </div>

            <form onSubmit={answerSubmitHandler} className={style.answerCreate}>
                <h2>Answer question</h2>
                <textarea className={style.answerWrite} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Write your response...' />
                {error && <p className={style.error}>{error}</p>}
                {!isAuthenticated && <p>You must be authenticated to comment :)</p>}
                <button type='submit' disabled={!isAuthenticated} className={style.post}>post answer</button>
            </form>

            {!!thread.answers.length && (
                <div className={style.answers}>
                    <ul className={style.list}>
                        {!!thread.answers.length && thread.answers.filter(filterAnswers).map(el => (
                            <li key={el.id}><ForumCard c={el} deleteHandler={deleteHandler} answer={true} /></li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}