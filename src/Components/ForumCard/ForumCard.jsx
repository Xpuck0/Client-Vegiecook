import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { timeSince } from '../../utils/time';
// Assuming direct import for simplicity and performance
import lemon from '../../assets/lemon.svg';
import coconut from '../../assets/coconut.svg';
import pineapple from '../../assets/pineapple.svg';
import zapfen from '../../assets/zapfen.svg';
import heart from '../../assets/heart.svg'
import style from './ForumCard.module.css';
import Path from '../../paths';
import { forumLike, getQuestion } from '../../Middleware/forum';
import HeartIcon from '../../assets/Heart';
import Heart from 'react-animated-heart';

export default function ForumCard({ c }) {
    const [card, setCard] = useState(c);
    const [liked, setLiked] = useState(false);
    const { isAuthenticated, userId } = useContext(AuthContext);
    // const [likesCount, setLikesCount] = useState(card.likes_count);
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
    }, [card.id]);

    const like = async () => {
        const res = await forumLike('questions', card.id, userId);
        const res_d = await res.data;
        if (res_d.status == 'liked') {
            setLiked(true)
        } else {
            setLiked(false)
        }

        const ans = await getQuestion(card.id);
        const d = await ans.data;
        const likes = d.likes_count;

        setCard(old => ({
            ...old,
            likes_count: likes
        }))
    };

    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <h3>{card.user.username}</h3>
                <p className={style.time}>{timeSince(card.created_at)}</p>
                <p className={style.text}>{card.text}</p>
                {/* {isAuthenticated && <button className={style.like} onClick={like}>Like {card.likes_count}</button>} */}
                {!!isAuthenticated && (
                    <div className={style.likeCont}>
                        <div onClick={like} className={style.likeBtn}><span className={`${style.heart} ${!!liked && style.selected}`}>
                            {/* <div className={style.hrtCnt}>
                                <Heart isClick={liked} onClick={like} />
                            </div> */}
                            <HeartIcon liked={liked}/>
                            <span className={style.word}>like</span></span>
                        </div>
                        <p className={style.likesCnt}>{card.likes_count} likes</p>
                    </div>
                )}
                <Link className={style.link} to={`${Path.Forum}/questions/${c.id}`}>View thread</Link>
                <img className={style.img} src={imgSrc} alt="Dynamic" />
            </div>
        </div>
    );
}
