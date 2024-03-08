import { useState } from 'react';
import FilterComponent from '../../Components/FilterComponent/FilterComponent';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';
import style from './RecipesMain.module.css';


export default function RecipesMain () {
    const [diets, setDiets] = useState([]);
    const [categories, setCategories] = useState([]);

    return (
        <div className={style.main}>
            <FilterComponent diets={diets} setDiets={setDiets} categories={categories} setCategories={setCategories} />
            <RecipesContainer diets={diets} categories={categories}/>
        </div>
    )
}