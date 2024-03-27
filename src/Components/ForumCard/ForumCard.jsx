import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { timeSince } from '../../utils/time';

import lemon from '../../assets/lemon.svg';
import coconut from '../../assets/coconut.svg';
import pineapple from '../../assets/pineapple.svg';
import zapfen from '../../assets/zapfen.svg';

import Path from '../../paths';
import { checkIfUserLiked, forumDelete, forumLike, forumUpdate, getAnswer, getQuestion } from '../../Middleware/forum';
import HeartIcon from '../../assets/Heart';

import style from './ForumCard.module.css';
import { Hearts } from 'react-loader-spinner';

export default function ForumCard({ c, detail = false, answer = false, deleteHandler}) {
    const [card, setCard] = useState(c);
    const [liked, setLiked] = useState(false);
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [editContent, setEditContent] = useState('')
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const getImageSrc = () => {
            switch (true) {
                case card.id % 4 === 0: return lemon;
                case card.id % 3 === 0: return coconut;
                case card.id % 2 === 0: return pineapple;
                default: return zapfen;
            }
        };
        setImgSrc(getImageSrc());
        (async (id, answer) => {
            let res;
            if (answer) {
                res = await checkIfUserLiked(userId, null, card.id);
            } else {
                res = await checkIfUserLiked(userId, card.id, null);
            }
            console.log(res)
            setLiked(res)
        })(card.id, answer)
    }, [card.id]);

    const like = async () => {
        let res;
        if (!answer) {
            res = await forumLike('questions', card.id, userId);
        } else {
            res = await forumLike('answers', card.id, userId);

        }
        const res_d = await res.data;
        if (res_d.status == 'liked') {
            setLiked(true)
        } else {
            setLiked(false)
        }

        let ans;

        if (!answer) {
            console.log('inside !answer')
            ans = await getQuestion(card.id);
        } else {
            ans = await getAnswer(card.id);
            console.log('inside answer')
        }

        const d = await ans.data;
        const likes = d.likes_count;

        setCard(old => ({
            ...old,
            likes_count: likes
        }))
    };

    const editHandler = (e) => {
        e.preventDefault()
        setEditing(true);
        return;
    }

    const editSubmitHandler = async (e) => {
        e.preventDefault()
        if (!!editContent.trim().length) {
            setError('')
            const res = await forumUpdate(answer ? 'answers' : 'questions', card.id, editContent)
            if (res.success) {
                const data = await res.data;
                setCard(data)
                setEditing(false)
            }
        } else {
            setError('Response should not be empty!')
        }
        return;

    }

    const cancelEdit = (e) => {
        e.preventDefault();

        setError('')
        setEditContent('');
        setEditing(false)
    }

    if (!card.user){ 
        return (
            <div className={style.wrapper}>
                <Hearts />
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <div className={`${style.card} ${!!answer && style.answer}`}>
                <h3>{card.user.username}</h3>
                <p className={style.time}>{timeSince(card.created_at)}</p>
                {editing ? (
                    <form className={style.editForm} onSubmit={editSubmitHandler}>
                        <textarea defaultValue={card.text} onChange={(e) => setEditContent(e.target.value)} />
                        <p className={style.error}>{error}</p>
                        <div className={style.editButtons}>
                            <button type='submit'>Submit</button>
                            <button onClick={cancelEdit} type='none'>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <p className={style.text}>{card.text}</p>
                )}
                {(answer || detail) && isAuthenticated && card.user.id == userId && !editing && (
                    <div className={style.permButtons}>
                        <button onClick={editHandler}>Edit</button>
                        <button onClick={(e) => deleteHandler(e, answer ? 'answers' : 'questions', card.id)}>Delete</button>
                    </div>
                )}
                {!!isAuthenticated && (
                    <div className={style.likeCont}>
                        <div onClick={like} className={style.likeBtn}><span className={`${style.heart} ${!!liked && style.selected}`}>
                            <HeartIcon liked={liked} />
                            <span className={style.word}>like</span></span>
                        </div>
                        <p className={style.likesCnt}>{card.likes_count} {card.likes_count != 1 ? 'likes' : 'like'}</p>
                    </div>
                )}
                {!detail && !answer && <Link className={style.link} to={`${Path.Forum}/questions/${c.id}`}>View thread</Link>}
                <img className={style.img} src={imgSrc} alt="Dynamic" />
            </div>
        </div>
    );
}
