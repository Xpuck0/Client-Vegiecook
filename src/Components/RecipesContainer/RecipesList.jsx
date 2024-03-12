import { FidgetSpinner } from 'react-loader-spinner';
import style from './RecipesContainer.module.css';
import { useContext, useEffect } from 'react';
import { QueryContext } from '../../contexts/QueryContext';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useScroll } from '../../contexts/ScrollContext';

export default function RecipesList({recipes=[], rating=false}){
    const {query} = useContext(QueryContext);
    const { recipesSectionRef } = useScroll();

    const filterRecipes = (recipe) => {
        const queryMatch = recipe.title.toLowerCase().includes(query.toLowerCase().trim());
        return queryMatch;
    };

    if (!recipes.length){
        return (
            <div className={style.wrapper}>
                <FidgetSpinner />
            </div>
        )
    }

    return (
        <div className={style.recipesContainer} ref={recipesSectionRef}>
            <ul className={style.ul}>
                {recipes.filter(filterRecipes).map((r, i) => (
                    <li key={`${r.title}-${r.id}`}><RecipeCard r={r} rating={rating}/></li>
                ))}
            </ul>
        </div>
    );
}