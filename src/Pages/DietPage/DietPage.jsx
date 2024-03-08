import { useParams } from 'react-router-dom';
import style from './DietPage.module.css';
import { useEffect, useState } from 'react';
import { getRecipesByDiet } from '../../Middleware/recipes';
import { FidgetSpinner } from 'react-loader-spinner';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';
import LinkListcontainer from '../../Components/LinkListContainer/LinkListContainer';
import { getDietById } from '../../Middleware/diets';
import RecipesList from '../../Components/RecipesContainer/RecipesList';
import TagSummary from '../../Components/TagSummary/TagSummary';

export default function DietPage(){
    const [recipes, setRecipes] = useState([]);
    const [diet, setDiet] = useState({})
    const {id} = useParams();


    useEffect(() => {
        (async id => {
            let res = await getRecipesByDiet(id);
            console.log(res)
            if (res.success) {
                setRecipes(res.data)
            } else {
                console.error(res.error)
            }


            const d = await getDietById(id);
            if (d.success) {
                setDiet(await d.data)
                console.log(diet)
            } else {
                console.error(d.error)
            }
        })(id)
    }, [id])

    if (!Object.keys(diet).length) {
        return (
            <div className={style.wrapper}>
                <FidgetSpinner />
            </div>
        );
    }

    return (
        <div className={style.wrapper}>
            <h1 className={style.header}>{diet.name}</h1>
            <TagSummary desc={diet.description} />
            <h3 className={style.count}>There are {recipes.length} recipes tagged with diet {diet.name}</h3>
            {!!recipes.length && <RecipesList recipes={recipes} />}
            
            <LinkListcontainer type='diet'/>
        </div>
    )
}