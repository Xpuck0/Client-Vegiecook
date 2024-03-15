import { FidgetSpinner } from 'react-loader-spinner';
import style from './QuestionsList.module.css';
import ForumCard from '../ForumCard/ForumCard';
// u  are gae

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
            <h2 className={style.header}>Browse {questions.length} questions:</h2>
            <ul className={style.list}>
                {questions.map((el, i) => (
                    <li key={el.id}><ForumCard detail={false} c={el} /></li>
                ))}
            </ul>
        </div>
    )
}