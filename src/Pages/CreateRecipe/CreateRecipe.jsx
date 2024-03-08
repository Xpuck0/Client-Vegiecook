import { useState, useContext, useEffect } from 'react'
import style from './CreateRecipe.module.css'
import CreateRecipeProvider, { CreateRecipeContext } from '../../contexts/CreateRecipeProvider'
import FirstStage from '../../Components/Stages/FirstStage/FirstStage';
import SecondStage from '../../Components/Stages/SecondStage/SecondStage';
import ThirdStage from '../../Components/Stages/ThirdStage/ThirdStage';
import { createRecipe } from '../../Middleware/recipes';
import FourthStage from '../../Components/Stages/FourthStage/FourthStage';
import { getAllCourses } from '../../Middleware/courses';
import { useNavigate } from 'react-router-dom';
import Path from '../../paths';


export default function CreateRecipe() {
    const { setShowFirstStage, setShowSecondStage, showFirstStage, setShowThirdStage, showSecondStage, setShowFourthStage, showThirdStage, showFourthStage } = useContext(CreateRecipeContext)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [ingredients, setIngredients] = useState({});
    const [instructions, setInstructions] = useState([]);

    const [course, setCourse] = useState([]);
    const [diet, setDiet] = useState({});
    const [categories, setCategories] = useState([]);

    const [prepHours, setPrepHours] = useState(0);
    const [prepMinutes, setPrepMinutes] = useState(0);
    const [cookHours, setCookHours] = useState(0);
    const [cookMinutes, setCookMinutes] = useState(0);

    const [servingSize, setServingSize] = useState(1);

    const [image, setImage] = useState({ preview: '', data: '' });

    const nav = useNavigate();

    useEffect(() => {
        setShowFirstStage(true);

        setShowSecondStage(false);
        setShowThirdStage(false);
        setShowFourthStage(false);
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await createRecipe(
            title,
            description,
            course,
            diet,
            categories,
            prepHours,
            prepMinutes,
            cookHours,
            cookMinutes,
            image,
            ingredients,
            instructions,
            servingSize
        )
        
        nav(`${Path.Recipes}/${res.id}`)
    }

    return (
        <div className={style.wrapper}>
            {showFirstStage && <FirstStage title={title} setTitle={setTitle} description={description} setDescription={setDescription} />}
            {showSecondStage && <SecondStage course={course} setCourse={setCourse} diet={diet} setDiet={setDiet} cookHours={cookHours} cookMinutes={cookMinutes} setCookHours={setCookHours} setCookMinutes={setCookMinutes} prepMinutes={prepMinutes} setPrepMinutes={setPrepMinutes} prepHours={prepHours} setPrepHours={setPrepHours} />}
            {showThirdStage && <ThirdStage mainImage={image} setMainImage={setImage} categories={categories} setCategories={setCategories} />}
            {showFourthStage && <FourthStage onSubmit={onSubmit} instructions={instructions} setInstructions={setInstructions} ingredients={ingredients} setIngredients={setIngredients} servingSize={servingSize} setServingSize={setServingSize} />}
        </div>
    )

}