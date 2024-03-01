import { useState } from 'react';
import Login from '../../Components/Login/Login';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import SignupReminder from '../../Components/SignupReminder/SignupReminder';
import style from './HomeMain.module.css';
import About from '../../Components/About/About';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';

export default function HomeMain() {


    return (
        <main className={style.main}>
            {/* <div className={style.recent}>
                <RecipeCard name={'Tofu stir fry idk must be delicious as sex tbh lol lmao'} category={'Vegan idk'} image={'https://www.budgetbytes.com/wp-content/uploads/2021/09/Honey-Sriracha-Tofu-close.jpg'} />
                <RecipeCard name={'Salat'} category={'dinner'} image={'https://images.lecker.de/rasanter-salat-mit-ei-und-feta,id=4dba2952,b=lecker,w=1200,rm=sk.jpeg'} />
                <RecipeCard name={'Sofritas'} category={'lunch'} image={'https://www.eatingbirdfood.com/wp-content/uploads/2021/07/tofu-sofritas-sautepan.jpg'} />
                <RecipeCard name={'Anada salat'} category={'breakfast'} image={'https://www.gutekueche.at/storage/media/recipe/112667/6852_Gemischte-Salat_1.jpg'} />
            </div> */}
            <RecipesContainer />
            <SignupReminder />
            {/* <div className={style.recent}>

                <RecipeCard name={'Tofu stir fry idk must be delicious as sex tbh lol lmao'} category={'Vegan idk'} image={'https://www.budgetbytes.com/wp-content/uploads/2021/09/Honey-Sriracha-Tofu-close.jpg'} />
                <RecipeCard name={'Salat'} category={'dinner'} image={'https://images.lecker.de/rasanter-salat-mit-ei-und-feta,id=4dba2952,b=lecker,w=1200,rm=sk.jpeg'} />
                <RecipeCard name={'Sofritas'} category={'lunch'} image={'https://www.eatingbirdfood.com/wp-content/uploads/2021/07/tofu-sofritas-sautepan.jpg'} />
                <RecipeCard name={'Anada salat'} category={'breakfast'} image={'https://www.gutekueche.at/storage/media/recipe/112667/6852_Gemischte-Salat_1.jpg'} />
            </div>
            <div className={style.recent}>
            <RecipeCard name={'Anada salat'} category={'breakfast'} image={'https://www.gutekueche.at/storage/media/recipe/112667/6852_Gemischte-Salat_1.jpg'} />
            <RecipeCard name={'Tofu stir fry idk must be delicious as sex tbh lol lmao'} category={'Vegan idk'} image={'https://www.budgetbytes.com/wp-content/uploads/2021/09/Honey-Sriracha-Tofu-close.jpg'} />
            <RecipeCard name={'Sofritas'} category={'lunch'} image={'https://www.eatingbirdfood.com/wp-content/uploads/2021/07/tofu-sofritas-sautepan.jpg'} />
            <RecipeCard name={'Salat'} category={'dinner'} image={'https://images.lecker.de/rasanter-salat-mit-ei-und-feta,id=4dba2952,b=lecker,w=1200,rm=sk.jpeg'} />
        </div> */}
            <About />
        </main>
    )
}