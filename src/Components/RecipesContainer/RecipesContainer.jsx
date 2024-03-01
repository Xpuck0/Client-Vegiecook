import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import style from './RecipesContainer.module.css';
import { getAllRecipes } from "../../Middleware/recipes";

export default function RecipesContainer() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = (await getAllRecipes()).data;
                setRecipes(res);
                console.log(recipes)
                
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])

    return (
        <div className={style.recipesContainer}>
            <ul className={style.ul}>
                {recipes.map((r, i) => (
                    <li key={r.id}><RecipeCard r={r}/></li>
                ))}
            </ul>
        </div>
    )
}