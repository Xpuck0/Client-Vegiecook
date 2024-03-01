import { useContext, useEffect, useRef, useState } from 'react';

import CategorySelect from '../../FilterComponent/CategorySelect/CategorySelect';

import style from './ThirdStage.module.css';
import { CreateRecipeContext } from '../../../contexts/CreateRecipeProvider';
import { getCategories } from '../../../Middleware/categories';


export default function ThirdStage({
    categories,
    setCategories,
    mainImage,
    setMainImage,
}) {
    const { setShowFirstStage, setShowSecondStage, setShowThirdStage, setShowFourthStage } = useContext(CreateRecipeContext);

    const ref = useRef(null);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
        setMainImage({ preview: img.preview, data: img.data });

    }

    const handleLabelClick = () => {
        ref.current.click();
    }

    const goBack = (e) => {
        e.preventDefault();
        setShowFirstStage(false);
        setShowSecondStage(true);
        setShowThirdStage(false)
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(categories.length)
        console.log(mainImage)
        if (categories.length > 0 && !!mainImage.data) {
            setStatus('')

            setShowFirstStage(false)
            setShowSecondStage(false);
            setShowThirdStage(false);
            setShowFourthStage(true);
        } else {
            setStatus('* Invalid values')
        }

        if (!status) {
        }

    };


    return (
        <div className={style.wrapper}>
            <div className={style.mainImage}>
                <h2 className={style.title}>Add recipe image</h2>
                <div className={style.imageContainer}>
                    {mainImage.preview && <img src={mainImage.preview} className={style.previewImage} />}
                </div>
                <form onSubmit={handleSubmit}>
                    <label className={style.label} onClick={handleLabelClick} htmlFor="image">Upload photo</label>
                    <input className={style.inputImage} ref={ref} type='file' name='image' accept='image/*' onChange={handleFileChange} placeholder='Browse Images' tabIndex={-1}></input>
                </form>

            </div>
            <div className={style.categories}>
                <h2 className={style.title}>Add categories </h2>
                <CategorySelect categories={categories} setCategories={setCategories} />
            </div>
            {status && <h4 className={style.err}>{status}</h4>}
            <div className={style.buttons}>
                <button onClick={goBack} className={style.backButton}>
                    Back
                </button>
                <button type="submit" onClick={submitHandler} className={style.submitButton}>
                    Next
                </button>
            </div>
        </div>
    );

}