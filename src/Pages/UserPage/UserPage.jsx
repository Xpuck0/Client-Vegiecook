import { useContext, useEffect, useState } from 'react';
import style from './UserPage.module.css';
import AuthContext from '../../contexts/AuthProvider';
import { getRecipeByUser } from '../../Middleware/recipes';
import RecipesList from '../../Components/RecipesContainer/RecipesList';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../Middleware/auth';


export default function UserPage() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const rec = await getRecipeByUser(id);
            if (rec.success) {
                setRecipes(rec.data)
            } else {
                console.error(rec.error)
            }

            const u = await getUserById(id);
            if (u.success) {
                setUser(u.data)
            } else {
                console.error(rec.error);
            }
        })()
    }, [id])

    if (!Object.keys(user).length) {
        return (
            <div className={style.wrapper}></div>
        )
    }

    return (
        <div className={style.wrapper}>
            <h1 className={style.username}>{user.username}</h1>

            {recipes.length ? <RecipesList recipes={recipes} /> : <div className={style.par}>No recipes posted by {user.username}</div>}
        </div>
    )
}