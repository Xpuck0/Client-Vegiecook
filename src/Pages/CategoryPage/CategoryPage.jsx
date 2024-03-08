import { useParams } from 'react-router-dom';
import style from './CategoryPage.module.css';
import { useEffect, useState } from 'react';
import { getRecipesByCategory } from '../../Middleware/recipes';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';
import { getCategoryById } from '../../Middleware/categories';
import { FidgetSpinner } from 'react-loader-spinner';
import LinkListcontainer from '../../Components/LinkListContainer/LinkListContainer';
import RecipesList from '../../Components/RecipesContainer/RecipesList';
import TagSummary from '../../Components/TagSummary/TagSummary';

export default function CategoryPage() {
    const [recipes, setRecipes] = useState([])
    const [category, setCategory] = useState({})
    const { id } = useParams();

    useEffect(() => {
        (async id => {
            const res = await getRecipesByCategory(id);
            if (res.success) {
                setRecipes(res.data)
            } else {
                console.error(res.error)
            }

            const cat = await getCategoryById(id);
            if (cat.success) {
                setCategory(cat.data)
            } else {
                console.error(cat.error)
            }
        })(id)
        // console.log(recipes)
        // console.log(category)
    }, [id])

    if (!Object.keys(category).length) {
        return (
            <div className={style.wrapper}>
                <FidgetSpinner />
            </div>

        )
    }

    return (
        <div className={style.wrapper}>
            <h1 className={style.header}>{category.name}</h1>
            <TagSummary desc={category.description} />
            <h3 className={style.count}>There are {recipes.length} recipes with category {category.name}</h3>
            {!!recipes.length && <RecipesList recipes={recipes} />}
            <LinkListcontainer type='category'/>
        </div>
    )
}