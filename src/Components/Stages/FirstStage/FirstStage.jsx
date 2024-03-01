import { useContext, useState } from 'react'
import style from './FirstStage.module.css'
import { CreateRecipeContext } from '../../../contexts/CreateRecipeProvider';
import { useNavigate } from 'react-router-dom';
import Path from '../../../paths';

export default function FirstStage({
    title, setTitle,
    description, setDescription,
}) {
    const { hideAll, showFirstStage, setShowFirstStage, showSecondStage, setShowSecondStage, setShowThirdStage } = useContext(CreateRecipeContext);
    const nav = useNavigate();

    const [err, setErr] = useState('');

    const cancelHandler = (e) => {
        e.preventDefault()
        hideAll();
        nav(Path.Home);
    }

    function isValid(list) {
        for (let value of list) {
            if (typeof value !== "string" || value.trim().length === 0) {
                return false;
            }
        }
        return true;
    }


    const submitHandler = (e) => {
        e.preventDefault();

        const val = isValid([title, description]);

        if (!val) {
            setErr("* Invalid values")
            return;
        } else {
            setErr('');
            setShowFirstStage(false);
            setShowSecondStage(true);
            setShowThirdStage(false)
        }

    }

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.sectionTitle}>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={style.sectionDescription}>
                    <label htmlFor="description">Description;</label>
                    <textarea type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {err && <p className={style.error}>{err}</p>}
                <div className={style.buttons}>
                    <button onClick={cancelHandler} className={style.backButton}>Cancel</button>
                    <button type='submit' className={style.submitButton}>Next</button>
                </div>
            </form>
        </div>
    )

}