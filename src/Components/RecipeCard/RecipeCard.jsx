import { Link } from 'react-router-dom';
import style from './RecipeCard.module.css';

export default function RecipeCard({ r }) {
    return (
        <div className={style.recipeCard}>
            {console.log(r)}
            <Link to={`/recipes/${r.id}`}>
                <div className={style.imageContainer}>
                    <img src={'http://localhost:8000/' + r.image} alt="" />
                </div>
            </Link>
            <h6 className={style.category}><Link to={`/recipes/${r.id}`}>{r.course}</Link></h6>
            <h2 className={style.name}><Link to={`/recipes/${r.id}`}>{r.title}</Link></h2>
        </div>
    )
}