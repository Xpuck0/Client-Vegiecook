import { Link } from 'react-router-dom';
import style from './Recipe.module.css';

export default function Recipe(recipe) {

    return (
        <div className={style.recipe}>
            <header className={style.header}>
                <div className={style.textCont}>
                    <h1 className={style.title}>{recipe.title}</h1>
                    <Link>{recipe.author}</Link>
                    <div className={style.ratingCont}>
                        {/* TODO RATING STARS*/}
                        <p className={ratingStats}>{recipe.rating} from {recipe.votes} votes</p>
                    </div>
                </div>
                <div className={style.imageCont}>
                    <img src={recipe.image} alt="" />
                </div>
            </header>
            <button className={style.printButton}>Print</button>
            
        </div>
    )
}