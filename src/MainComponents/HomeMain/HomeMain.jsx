import { useState } from 'react';
import Login from '../../Components/Login/Login';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import SignupReminder from '../../Components/SignupReminder/SignupReminder';
import style from './HomeMain.module.css';
import About from '../../Components/About/About';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';

export default function HomeMain() {
    const [diets, setDiets] = useState([]);
    const [categories, setCategories] = useState([]);

    return (
        <main className={style.main}>
            <RecipesContainer diets={diets} categories={categories}/>
            <SignupReminder />
            <About />
        </main>
    )
}