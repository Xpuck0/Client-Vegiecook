import { useContext, useEffect, useMemo, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import style from './RecipesContainer.module.css';
import { getAllRecipes } from "../../Middleware/recipes";
import { QueryContext } from "../../contexts/QueryContext";
import { FidgetSpinner } from "react-loader-spinner";
import { useScroll } from "../../contexts/ScrollContext";

export default function RecipesContainer({ recipes_, diets = [], categories = [] }) {
    const [recipes, setRecipes] = useState(recipes_ || []);
    const { query } = useContext(QueryContext)
    const { recipesSectionRef } = useScroll();


    useEffect(() => {
        (!recipes_ || !recipes_.length) && (async () => {
            try {
                const res = (await getAllRecipes()).data;
                setRecipes(await res);
                // console.log(res)
                // console.log(await res)

            } catch (error) {
                console.log(error.message);
            }
        })()

        // console.log(recipes)
    }, [recipes_, diets, categories,])

    const filterRecipes = (recipe) => {
        const queryMatch = recipe.title.toLowerCase().includes(query.toLowerCase().trim());
        const dietMatch = diets.length === 0 || diets.some(diet => recipe.diet && diet.id === recipe.diet.id);
        const categoryMatch = categories.length === 0 || categories.some(cat => recipe.categories && recipe.categories.some(rc => rc.id === cat.id));

        return queryMatch && dietMatch && categoryMatch;
    };

    // const filteredRecipes = useMemo(() => recipes.filter(filterRecipes), [recipes, query, diets, categories]);
    if (!recipes.length) {
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
                    <li key={`${r.title}-${r.id}`}><RecipeCard r={r} /></li>
                ))}
            </ul>
        </div>
    );
}