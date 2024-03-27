import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRecipeContext } from '../../../contexts/CreateRecipeProvider';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Path from '../../../paths';
import style from './SecondStage.module.css';
import { getDiets } from '../../../Middleware/diets';
import { formatTime } from '../../../utils/time';
import { getAllCourses } from '../../../Middleware/courses';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const COURSES = ['dinner', 'lunch', 'breakfast'];

export default function SecondStage({
    course,
    setCourse,
    diet,
    setDiet,
    prepHours,
    setPrepHours,
    prepMinutes,
    setPrepMinutes,
    cookHours,
    setCookHours,
    cookMinutes,
    setCookMinutes,
}) {
    const { setShowFirstStage, setShowSecondStage, setShowThirdStage } = useContext(CreateRecipeContext);
    const [diets, setDiets] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState(null);

    const [courseChoices, setCourseChoices] = useState([])

    const [err, setErr] = useState('');

    useEffect(() => {
        (async () => {
            const res = await getDiets();
            if (res.success) {
                setDiets(res.data);
            } else {
                console.log(res.error)
            }
        
        
            const courses = await getAllCourses();
            if (courses.success) {
                setCourseChoices(courses.data)
            } else {
                console.log(courses.error)
            }
        })();
    }, []);


    const handleChange = (event) => {
        const selectedCourseNames = event.target.value;

        const selectedCourses = selectedCourseNames.map(name =>
            courseChoices.find(course => course.name === name)
        ).filter(course => course != null);

        setCourse(selectedCourses);
    };



    const handleDietChange = (event) => {
        const { value } = event.target;
        setDiet(value);
    };

    const minutesCheckHandler = (e, mins, minsSetter, hoursSetter) => {
        const newMinutes = parseInt(e.target.value, 10);
        minsSetter(newMinutes);

        if (newMinutes >= 60) {
            minsSetter(0);
            hoursSetter((old) => Number(old) + 1);
        }
    };

    function isValid(list) {
        for (let value of list) {
            if ((typeof value === "string" && value.trim().length === 0) || (value instanceof Map && Object.keys(value).length === 0) || (Array.isArray(value) && value.length === 0) || (prepMinutes == 0 && prepHours == 0) || (cookMinutes == 0 && cookHours == 0)) {
                return false
            }
        }
        return true;
    }

    const goBack = (e) => {
        e.preventDefault();
        setShowFirstStage(true);
        setShowSecondStage(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (isValid([diet, course])) {
            setErr('')

            setShowFirstStage(false)
            setShowSecondStage(false);
            setShowThirdStage(true);
        } else {
            setErr('* invalid values')
        }
    };

    if (!courseChoices.length) {
        return null;
    }

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.sectionCourse}>
                    <h2>Select Suitable Courses</h2>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Course</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={course.map(c => c.name)} // Map selected course objects to their names
                            onChange={handleChange}
                            input={<OutlinedInput label="Course" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {courseChoices.map((choice) => (
                                <MenuItem key={choice.id} value={choice.name}>
                                    {choice.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                {!!diets.length && (
                    <div className={style.sectionDiet}>

                        <h2>Select Appropriate Diet</h2>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="diet">Diet</InputLabel>
                            <Select
                                labelId="diet"
                                id="diet_select"
                                defaultValue={diets[0].name}
                                onChange={handleDietChange}
                                input={<OutlinedInput label="Diet" />}
                                MenuProps={MenuProps}
                            >
                                {diets.map((dietOption) => (
                                    <MenuItem key={dietOption.id} value={dietOption}>
                                        {dietOption.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </div>
                )}
                <div className={style.prepTime}>
                    <h2>Enter Preponation Hours</h2>
                    <div className={style.hours}>
                        <label htmlFor="hours">Hours: </label>
                        <input className={style.input} min={0} type="number" value={prepHours} onChange={(e) => setPrepHours(e.target.value)} placeholder='HH' />
                    </div>
                    <div className={style.minutes}>
                        <label htmlFor="hours">Minutes: </label>
                        <input className={style.input} min={0} type="number" value={prepMinutes} onChange={(e) => minutesCheckHandler(e, prepMinutes, setPrepMinutes, setPrepHours)} placeholder='MM' />
                    </div>
                </div>
                <div className={style.cookTime}>
                    <h2>Enter Cook Hours</h2>
                    <div className={style.hours}>
                        <label htmlFor="hours">Hours: </label>
                        <input className={style.input} min={0} type="number" value={cookHours} onChange={(e) => setCookHours(e.target.value)} placeholder='HH' />
                    </div>
                    <div className={style.minutes}>
                        <label htmlFor="hours">Minutes: </label>
                        <input className={style.input} min={0} type="number" value={cookMinutes} onChange={(e) => minutesCheckHandler(e, cookMinutes, setCookMinutes, setCookHours)} placeholder='MM' />
                    </div>
                </div>
                {err && <p className={style.error}>{err}</p>}
                <div className={style.buttons}>
                    <button onClick={goBack} className={style.backButton}>
                        Back
                    </button>
                    <button type="submit" className={style.submitButton}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

