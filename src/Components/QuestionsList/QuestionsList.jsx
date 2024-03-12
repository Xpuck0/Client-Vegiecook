import { FidgetSpinner } from 'react-loader-spinner';
import style from './QuestionsList.module.css';
import ForumCard from '../ForumCard/ForumCard';

export default function QuestionsList({ questions }) {

    if (!questions.length) {
        return (
            <div className={style.loading}>
                <FidgetSpinner />
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <ul className={style.list}>
                {questions.map((el, i) => (
                    <li key={el.id}><ForumCard c={el} /></li>
                ))}
            </ul>
        </div>
    )
}