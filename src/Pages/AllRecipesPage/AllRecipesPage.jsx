import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RecipesMain from '../../MainComponents/RecipesMain/RecipesMain';
import style from './AllRecipesPage.module.css';


export default function AllRecipesPage() {


    return (
        <div className={style.page}>
            <div className={style.wrapper}>
                <RecipesMain />
            </div>
        </div>
    )
}