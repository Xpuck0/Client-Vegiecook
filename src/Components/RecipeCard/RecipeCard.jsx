import { Link } from 'react-router-dom';
import style from './RecipeCard.module.css';
import { Rating } from '@mui/material';

export default function RecipeCard({ r, rating=false }) {
    return (
        <div className={style.recipeCard}>
            <Link to={`/recipes/${r.id}`}>
                <div className={style.imageContainer}>
                    <img src={'http://localhost:8000/' + r.image} alt="" />
                </div>
            </Link>
            {rating && r.rating != 0 ? (
                <div className={style.rating}>
                    <Rating
                        name='recipe-rating'
                        value={Number(r.rating)}
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
                </div>
            ) : (
                <h6 className={style.category}><Link to={`/diets/${r.diet.id}`}>{r.diet.name}</Link></h6>
            )}
            <h2 className={style.name}><Link to={`/recipes/${r.id}`}>{r.title}</Link></h2>
        </div>
    )
}