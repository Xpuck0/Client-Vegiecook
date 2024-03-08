import { useEffect, useState } from 'react';
import style from './LeaderboardsPage.module.css';
import { getSortedRecipes } from '../../Middleware/recipes';
import RecipesList from '../../Components/RecipesContainer/RecipesList';


export default function LeaderboardsPage() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getSortedRecipes();
            if (res.success) {
                setRecipes(await res.data)
            }
        })()
    }, [])
    
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Vegan Recipe Leaderboards</h1>
            <div className={style.sections}>
                <section className={style.section}>
                    <h2>Introduction</h2>
                    <p>Welcome to the heart of our vegan community's competitive spirit – the Leaderboards! Here, we celebrate the creativity, passion, and culinary expertise that our members bring to the plant-based table. Whether you're a seasoned chef or a newcomer to vegan cooking, the Leaderboards are where you can see the best of what our community has to offer, get inspired, and maybe even see your own creations climb the ranks!</p>
                </section>
                <section className={style.section}>
                    <h2>Most Popular Recipes</h2>
                    <p>Dive into our most-loved vegan delights, as rated and reviewed by our community. These recipes have won the hearts (and taste buds) of people from around the globe. Find out which dishes are making waves and take your pick from the top-tier vegan recipes that everyone is talking about!</p>
                </section>
            </div>
            <h1 className={style.info}>Best Rated Recipes</h1>

            <RecipesList recipes={recipes} rating={true} />
        </div>
    )
}