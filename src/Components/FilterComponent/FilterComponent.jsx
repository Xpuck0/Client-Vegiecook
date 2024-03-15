import { useEffect, useState } from "react";
import style from "./FilterComponent.module.css";
import CategorySelect from "./CategorySelect/CategorySelect";
import DietSelect from "./DietSelect/DietSelect";


export default function FilterComponent({
    diets,
    setDiets,
    categories,
    setCategories
}) {

    const searchHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className={style.filterComponent}>
            <button className={style.search} onClick={searchHandler}>Search</button>
            <div className={style.recipeFilter}>
                <h2>By category</h2>
                <CategorySelect
                    categories={categories}
                    setCategories={setCategories}
                />
            </div>
            <div className={style.recipeFilter}>
                <h2>By Diet</h2>
                <DietSelect
                    diets={diets}
                    setDiets={setDiets}
                />
            </div>
        </div>
    )
}