import { Rating } from '@mui/material';
import { timeSince } from '../../utils/time';
import style from './CommentNode.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { createReply, updateReply, deleteReply } from '../../Middleware/replies.js';


export default function CommentNode({ c }) {
    const { userId, username, isAuthenticated } = useContext(AuthContext)

    const [replying, setReplying] = useState(false)

    const [reply, setReply] = useState('');
    const [error, setError] = useState('');


    const toggleReply = (event, value) => {
        setReply('')
        if (value != null) {
            setReplying(value)
        } else {
            setReplying(!replying)
        }
    }

    const submitReplyHandler = async (e) => {
        e.preventDefault();
        if (!reply) {
            setError("Failed to post comment.");
            return;
        }

        setError('')

        const res = await createReply(userId, c.id, reply);
        if (res.success) {
            const newReply = await res.data;
            c.replies.push(newReply)
            setReply('')
            toggleReply(false)
        } else {
            console.log(res.error)
        }
    }

    return (
        <div className={style.commentWrapper}>
            <div className={style.comment}>
                <h3>{c.user.username}</h3>
                <p className={style.time}>{timeSince(c.created_at)}</p>
                {!!c.rating && (
                    <Rating
                        name='commment-rating'
                        value={c.rating}
                        readOnly
                        size='large'
                        sx={{
                            color: '#3d3d3d', // For filled stars
                            '& .MuiRating-iconEmpty': {
                                color: '#3d3d3d' // For empty stars
                            },
                            '& .MuiRating-iconHover': {
                                color: '#616161' // For hover color, slightly lighter shade of black for demonstration
                            }
                        }}
                    />
                )}
                <p className={style.comment}>{c.comment}</p>
                {isAuthenticated && <button className={style.replyButton} onClick={toggleReply}>{replying ? 'cancel reply' : 'reply'}</button>}
            </div>
            {replying && (
                <form onSubmit={submitReplyHandler} className={style.replyEmail}>
                    <h3 className={style.username}>{username}</h3>
                    <textarea className={style.replyInput} name="reply" id="reply" cols="30" rows="10" placeholder='Write a reply...' value={reply} onChange={e => setReply(e.target.value)}></textarea>
                    <p className={style.error}>{error}</p>

                    <div className={style.replyButtons}>
                        <button className={style.postReply} type='submit'>Post</button>
                        <button className={style.cancelReply} onClick={toggleReply} type='button'>Cancel</button>
                    </div>
                </form>
            )}
            {!!c.replies.length && (
                <div className={style.replies}>
                    {c.replies.map(rep => (
                        <div key={rep.id} className={style.reply}>
                            <h3 className={style.username}>{rep.user.username}</h3>
                            <p className={style.time}>{timeSince(rep.created_at)}</p>
                            <p className={style.comment}>{rep.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}