// const DIET_OPTIONS = [
//     { value: 'gluten-free', label: 'Gluten Free' },
//     { value: 'ketogenic', label: 'Ketogenic' },
//     { value: 'vegetarian', label: 'Vegetarian' },
//     { value: 'lacto-vegetarian', label: 'Lacto-Vegetarian' },
//     { value: 'ovo-vegetarian', label: 'Ovo-Vegetarian' },
//     { value: 'vegan', label: 'Vegan' },
//     { value: 'pescetarian', label: 'Pescetarian' },
//     { value: 'paleo', label: 'Paleo' },
//     { value: 'primal', label: 'Primal' },
//     { value: 'whole30', label: 'Whole30' }
// ]
import React, { useEffect, useState } from 'react';

import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

import customStyles from '../styles';
import style from './DietSelect.module.css';
import { getDiets } from '../../../Middleware/diets';



const animatedComponents = makeAnimated();

export default function DietSelect({
    diets,
    setDiets
}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getDiets(); 
            console.log(data);
            if (data.success) {
                const formattedOptions = data.data.map(category => ({
                    value: category.id,
                    label: category.name
                }));
                setOptions(formattedOptions);
            } else {
                console.log(data.error);
            }
        })();
    }, []); 

    const handleChange = (selectedOptions) => {
        const selectedDiets = selectedOptions ? selectedOptions.map(option => ({
            id: option.value,
            name: option.label
        })) : [];
        setDiets(selectedDiets);
    };

    const value = diets.map(diet=> ({
        value: diet.id,
        label: diet.name
    }));

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            styles={customStyles}
            isMulti
            options={options}
            placeholder='Select Diets'
            onChange={handleChange}
            value={value}
        />
    );
}