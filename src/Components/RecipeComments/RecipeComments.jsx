import { useRef } from 'react';
import style from './RecipeComments.module.css';

export default function RecipeComments() {
    const [comment, setComment] = useState('');
    const ref = useRef(null);

    const commentSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form ref={ref} onSubmit={commentSubmitHandler} className={style.commentCreate}>
                <h2>Leave a Comment & Rating</h2>
                <p className={style.instr}>If you enjoyed this recipe, please consider giving a star rating with the comment! It helps others discover my blog and recipes, and your comments always make my day :) Thank you for your support!</p>
                <p className={style.info}>Required fields are marked *</p>
                <Rating
                    color='gray'
                    size='large'
                    value={commentRating}
                    onChange={(event, newValue) => { setCommentRating(newValue) }}
                />
                <textarea className={style.commentWrite} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add comment...' />
                <button type='submit' className={style.post}>post comment</button>
            </form>
            <section className={style.commentsWrapper}>
                <h2 className={style.commentsInfo}>{recipeData.comments.length} comment on {recipeData.title}</h2>
                <ul className={style.comments}>
                    {recipeData.comments.length > 0 && recipeData.comments.map(r => (
                        <li key={r.id}>{<CommentNode c={r} />}</li>
                    ))}
                </ul>
            </section>
        </>
    )
}