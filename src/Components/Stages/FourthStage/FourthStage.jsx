import { useContext, useState } from 'react';
import style from './FourthStage.module.css';
import { CreateRecipeContext } from '../../../contexts/CreateRecipeProvider';

const INGREDIENT_BASE = {
    name: '',
    quantity: '',
};

export default function FourthStage({
    ingredients,
    setIngredients,
    instructions,
    setInstructions,
    servingSize,
    setServingSize,
    onSubmit,
}) {
    const { setShowFirstStage, setShowSecondStage, setShowThirdStage, setShowFourthStage } = useContext(CreateRecipeContext);

    const [ingredient, setIngredient] = useState(INGREDIENT_BASE);
    const [instruction, setInstruction] = useState('');

    const [instrErr, setInstrErr] = useState('')
    const [ingrErr, setIngrErr] = useState('')

    const goBack = (e) => {
        e.preventDefault();
        setShowFirstStage(false);
        setShowSecondStage(false);
        setShowThirdStage(true);
        setShowFourthStage(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (ingredients.length == 0) {
            setIngrErr('* Add ingredients');
        } else {
            setIngrErr('');
        }

        if (instructions.length == 0) {
            setInstrErr('* Add instructions');
        } else {
            setInstrErr('');
        }

        if (!instrErr && !ingrErr) {
            setShowFirstStage(false)
            setShowSecondStage(false);
            setShowThirdStage(false);
            // setShowFourthStage(false);
        }

        onSubmit(e);
    };

    const instructionAddHandler = (e) => {
        e.preventDefault();

        if (instruction.trim().length == 0) {
            setInstrErr('* Enter valid data');
        } else {
            setInstrErr('');
            setInstructions([...instructions, instruction.trim()]);
            setInstruction('');

            console.log(instructions);
        }
    }

    const ingredientAddHandler = (e) => {
        e.preventDefault();

        if (ingredient.name.length == 0 || ingredient.quantity.length == 0) {
            setIngrErr('* Enter valid data!')
        } else {
            setIngrErr('');
            const updatedIngredients = { ...ingredients };
            updatedIngredients[ingredient.name] = ingredient.quantity;

            setIngredients(updatedIngredients);

            console.log(updatedIngredients);
            setIngredient(INGREDIENT_BASE);
        }

    };


    return (
        <div className={style.wrapper}>
            <div className={style.ingredients}>
                <h2 className={style.title}>Add Ingredients</h2>
                <div className={style.ingrWrapper}>
                    <div className={style.name}>
                        <label htmlFor="ingredient-name">Ingredient Name</label>
                        <input className={style.input} value={ingredient.name} onChange={(e) => setIngredient(old => ({ ...old, name: e.target.value }))} name='ingredient-name' type="text" />
                        {!!ingrErr && <h4 className={style.err}>{ingrErr}</h4>}
                    </div>
                    <div className={style.quantity}>
                        <label htmlFor="ingredient-quantity">Ingredient Quantity</label>
                        <input className={style.input} value={ingredient.quantity} onChange={(e) => setIngredient(old => ({ ...old, quantity: e.target.value }))} name='ingredient-quantity' type="text" />
                        {!!instrErr && <h4 className={style.err}>{instrErr}</h4>}
                    </div>
                    <button className={style.addButton} onClick={ingredientAddHandler}>Add</button>
                </div>
                {Object.keys(ingredients).length > 0 && (
                    <ul className={style.ingredientList}>
                        {Object.entries(ingredients).map(([name, quantity], index) => (
                            <li key={index}>
                                <span className={style.key}>{name}</span> - <span className={style.value}>{quantity}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {ingrErr && <p className={style.error}>{ingrErr}</p>}
            </div>
            <div className={style.instructions}>
                <h2 className={style.title}>Add Instructions</h2>
                <div className={style.instrWrapper}>
                    <div className={style.name}>
                        <label htmlFor="instruction">Instruction Name</label>
                        <input value={instruction} className={style.input} onChange={e => setInstruction(e.target.value)} name='ingredient-quantity' type="text" />
                    </div>
                    <button className={style.addButton} onClick={instructionAddHandler}>Add</button>
                </div>
                {instructions.length > 0 && (
                    <ol className={style.instructionList}>
                        {instructions.map((instruct, index) => (
                            <li key={instruct + index}>
                                <span className={style.lispan}>{instruct}</span>
                            </li>
                        ))}
                    </ol>
                )}
                {instrErr && <p className={style.error}>{instrErr}</p>}
            </div>
            <div>
                <h2 className={style.title}>Serving Size</h2>
                <input type="number" min={1} max={50} value={servingSize} onChange={e => setServingSize(e.target.value)}/>
            </div>
            <div className={style.buttons}>
                <button onClick={goBack} className={style.backButton}>
                    Back
                </button>
                <button type="submit" onClick={submitHandler} className={style.submitButton}>
                    Submit
                </button>
            </div>
        </div>
    )

}