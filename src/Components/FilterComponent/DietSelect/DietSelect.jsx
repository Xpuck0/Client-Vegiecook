import { useState, useEffect } from 'react';

import Select from 'react-select';

import makeAnimated from "react-select/animated";

import customStyles from '../styles';
import style from './DietSelect.module.css';

const animatedComponents = makeAnimated();


const DIET_OPTIONS = [
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Ketogenic' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'lacto-vegetarian', label: 'Lacto-Vegetarian' },
    { value: 'ovo-vegetarian', label: 'Ovo-Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescetarian', label: 'Pescetarian' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'primal', label: 'Primal' },
    { value: 'whole30', label: 'Whole30' }
]

export default function DietSelect({
    diets,
    setDiets,
}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(DIET_OPTIONS);
    }, []);

    const handleChange = (selected) => {
        setDiets(selected);
    }

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            styles={customStyles}
            isMulti
            options={options}
            placeholder='Categories'
            onChange={handleChange}
            value={diets}
        />
    );
}