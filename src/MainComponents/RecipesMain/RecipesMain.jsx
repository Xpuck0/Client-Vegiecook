import FilterComponent from '../../Components/FilterComponent/FilterComponent';
import RecipesContainer from '../../Components/RecipesContainer/RecipesContainer';
import style from './RecipesMain.module.css';


export default function RecipesMain () {

    return (
        <div className={style.main}>
            <FilterComponent />
            <RecipesContainer />
        </div>
    )
}