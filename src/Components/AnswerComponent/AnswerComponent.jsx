import { timeSince, trimTimestampAfterDot } from '../../utils/time';
import style from './AnswerComponent.module.css';

export default function AnswerComponent({answer}){
    return (
        <div className={style.wrapper}>
            <h3 className={style.username}>{answer.user.username}</h3>
            <h4 className={style.time}>
                { trimTimestampAfterDot(answer.created_at) != trimTimestampAfterDot(answer.updated_at) ? (
                   timeSince(answer.updated_at) + '(edited)'
                ) : (
                    timeSince(answer.created_at)
                )}
            </h4>
            <p className={style.text}>{answer.text}</p>
        </div>
    )
}