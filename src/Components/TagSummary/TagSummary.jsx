import style from './TagSummary.module.css';


export default function TagSummary({desc='', heading}){

    return (
        <blockquote className={style.wrapper}>
            <strong className={style.header}>{heading || 'summary'}</strong>
            <p className={style.description}>{desc}</p>
        </blockquote>
    )
}