import { FidgetSpinner } from 'react-loader-spinner';
import style from './QuestionsList.module.css';
import ForumCard from '../ForumCard/ForumCard';
import { useScroll } from '../../contexts/ScrollContext';


export default function QuestionsList({ questions, isLoading }) {
    const { recipesSectionRef } = useScroll();

    if (isLoading) {
        return (
            <div className={style.loading}>
                <FidgetSpinner />
            </div>
        )
    }


    return (
        <div className={style.wrapper} ref={recipesSectionRef}>
            <h2 className={style.header}>Browse {questions.length} questions:</h2>
            <ul className={style.list}>
                {questions.map((el, i) => (
                    <li key={el.id}><ForumCard detail={false} c={el} /></li>
                ))}
            </ul>
        </div>
    )
}