import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './RecipeDetailPage.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { deleteRecipe, getRecipe, patchRecipe } from '../../Middleware/recipes';
import CommentNode from '../../Components/CommentNode/CommentNode';
import { CircularProgress, Rating } from '@mui/material';
import { postComment } from '../../Middleware/comments';
import AuthContext from '../../contexts/AuthProvider';
import { convertTimeToDuration, convertSecondsToDuration } from '../../utils/time';
import Path from '../../paths';

const RECIPE_PARAMS = {
    id: null,
    user: {
        id: null,
        username: "",
    },
    categories: [],
    images: [],
    image: "",
    comments: [],
    total_time: "",
    diet: {
        id: null,
        name: "",
        description: ""
    },
    title: "",
    courses: [],
    ingredients: {},
    instructions: [],
    rating: null,
    votes: 0,
    description: "",
    serving_size: "",
    prep_time: "",
    cook_time: "",
    created_at: "",
    updated_at: ""
}

export default function RecipeDetailPage() {
    const { id } = useParams();
    const { userId, isAuthenticated } = useContext(AuthContext);

    const [recipeData, setRecipeData] = useState(RECIPE_PARAMS);

    const [comment, setComment] = useState('');
    const [commentRating, setCommentRating] = useState(0);

    const [error, setError] = useState('');

    const nav = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        (async () => {
            const recipe = await getRecipe(id);
            if (recipe.success) {
                setRecipeData(recipe.data);
            } else {
                console.log(recipe.error);
            }
        })()
    }, [id])


    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        if (!comment) {
            setError('Please enter a valid comment!')
            return;
        }

        setError('');

        const response = await postComment(id, userId, comment, commentRating);
        if (response.success) {
            const newComment = await response.data;
            setRecipeData(prevState => ({
                ...prevState,
                comments: [...prevState.comments, newComment]
            }));
            setComment('');
            setCommentRating(0);

            if (commentRating && commentRating != 0) {
                const update = await patchRecipe(recipeData.id, {
                    votes: recipeData.votes + 1,
                    rating: parseFloat(((Number(recipeData.votes) * Number(recipeData.rating) + Number(commentRating)) / (recipeData.votes + 1)).toFixed(1))
                })
                if (update.success) {
                    setRecipeData(prevState => ({
                        ...prevState,
                        rating: update.data.rating,
                        votes: update.data.votes
                    }));
                } else {
                    console.log(response.error);
                }
            }
        } else {
            console.log(response.error);
        }
    };



    const updateCommentHandler = async (commentId, newContent) => {
        const response = await updateComment(commentId, newContent);
        if (response.success) {
            const updatedComments = recipeData.comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, comment: newContent };
                }
                return comment;
            });

            setRecipeData({ ...recipeData, comments: updatedComments });
        } else {
            console.log(response.error);
        }
    };

    if (!recipeData || !recipeData.image || !recipeData.categories.length > 0) {
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )

    }

    const deleteHandler = async () => {
        if (isAuthenticated) {
            const res = await deleteRecipe(id);
            nav(Path.Home)
        }
    }


    return (
        <div className={style.pageWrapper}>
            <div className={style.page}>
                <div className={style.recipe}>
                    <div className={style.heading}>

                        <div className={style.textHeading}>
                            <h1 className={style.title}>{recipeData.title}</h1>
                            <p className={style.author}><Link to={`${Path.UserRecipes}/${recipeData.user.id}`}>{recipeData.user.username}</Link></p>
                            <div className={style.ratingCont}>
                                {/* TODO STARS */}
                                <Rating
                                    defaultValue={Number(recipeData.rating) || 0} // Convert to number and use 0 as fallback
                                    value={commentRating}
                                    // readOnly
                                    onChange={(event, newValue) => {
                                        setCommentRating(newValue);
                                        ref.current?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    size='large'
                                />
                                <span className={style.rating}>{recipeData.rating || 0} from {recipeData.votes}</span>
                            </div>
                            <div className={style.buttons}>
                                <Link className={style.print}><div className={style.iconContOne}></div>print</Link>
                                <button className={style.save}><div className={style.iconContTwo}></div>save</button>
                            </div>
                            {isAuthenticated && userId == recipeData.user.id && <div onClick={deleteHandler} className={style.deleteButton}>Delete</div>}
                        </div>
                        <div className={style.imageHeader}>
                            <img src={`http://localhost:8000/${recipeData.image}`} alt="" />
                        </div>
                    </div>

                    <p className={style.description}>{recipeData.description}</p>
                    <ul className={style.timeCont}>
                        <li className={style.li}>
                            <span className={style.heading}>prep time</span>
                            <span className={style.value}>{convertTimeToDuration(recipeData.prep_time)}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.heading}>cook time</span>
                            <span className={style.value}>{convertTimeToDuration(recipeData.cook_time)}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.heading}>total time</span>
                            <span className={style.value}>{convertSecondsToDuration(Number(recipeData.total_time))}</span>
                        </li>
                    </ul>
                    <ul className={style.recipeMeta}>
                        <li className={style.li}>
                            <span className={style.heading}>course</span>
                            <div className={style.courseList}>
                                {recipeData.courses.length > 0 && recipeData.courses.map((el) => (
                                    <span key={el.id} className={style.value}>{el.name}</span>
                                ))}
                            </div>
                        </li>
                        <li className={style.li}>
                            <span className={style.heading}>diet</span>
                            {recipeData.diet ? (
                                <Link className={style.dietLink} to={`${Path.Diet}/${recipeData.diet.id}`}><span className={style.value}>{recipeData.diet.name}</span></Link>
                            ) : (
                                <span className={style.value}>Loading diet information...</span>
                            )}
                        </li>
                        <li className={style.li}>
                            <span className={style.heading}>serving size</span>
                            <span className={style.value}>{recipeData.serving_size}</span>
                        </li>
                    </ul>
                    <h2 className={style.ingredientsHeading}>Ingredients</h2>
                    <ul className={style.ingredientsCont}>
                        {recipeData.ingredients && Object.entries(recipeData.ingredients).map(([k, v], i) => (
                            <li key={`${k}-${i}`} className={style.ingredient}>
                                <input className={style.checkbox} type="checkbox" />
                                <p className={style.content}>
                                    <span className={style.quantity}>{v}</span>
                                    <span> - </span>
                                    <span className={style.ingr}>{k}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                    <h2 className={style.instructionsHeading}>Instructions</h2>
                    <ol className={style.instructions}>
                        {recipeData.instructions.length > 0 && recipeData.instructions.map((el, i) => (
                            <li className={style.instruction} key={`${el}-${i}`}>
                                <p>{el}</p>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className={style.categoriesCont}>
                    <ul className={style.categories}>
                        {recipeData.categories.map((cat) => (
                            <li key={cat.id}><Link to={`${Path.Category}/${cat.id}`}>{cat.name}</Link></li>
                        ))}
                    </ul>
                </div>
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
                    {error && <p className={style.error}>{error}</p>}
                    {!isAuthenticated && <p>You must be authenticated to comment :)</p>}
                    <button type='submit' disabled={!isAuthenticated} className={style.post}>post comment</button>
                </form>
                <section className={style.commentsWrapper}>
                    <h2 className={style.commentsInfo}>{recipeData.comments.length} comment on {recipeData.title}</h2>
                    <ul className={style.comments}>
                        {recipeData.comments.length > 0 && recipeData.comments.map((r, i) => (
                            <li key={`${r.id}-${i}`}>{<CommentNode c={r} />}</li>
                        ))}
                    </ul>
                </section>

            </div>
        </div>
    )
}