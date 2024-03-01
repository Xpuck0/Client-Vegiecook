import React, { useEffect, useState } from 'react';

import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

import customStyles from '../styles';
import style from './CategorySelect.module.css';
import { getCategories } from '../../../Middleware/categories';



const animatedComponents = makeAnimated();

export default function CategorySelect({
    categories,
    setCategories
}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getCategories(); // Fetch categories
            console.log(data);
            if (data.success) {
                // Convert fetched categories to the format expected by React Select
                const formattedOptions = data.data.map(category => ({
                    value: category.id,
                    label: category.name
                }));
                setOptions(formattedOptions);
            } else {
                console.log(data.error);
            }
        })();
    }, []); // Removed the dependency on `categoryOptions` since it's not external anymore

    const handleChange = (selectedOptions) => {
        // Convert selected options back to your original category format
        const selectedCategories = selectedOptions ? selectedOptions.map(option => ({
            id: option.value,
            name: option.label
        })) : [];
        setCategories(selectedCategories);
    };

    // Map categories to the format expected by React Select for setting initial values
    const value = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            styles={customStyles}
            isMulti
            options={options}
            placeholder='Select Categories'
            onChange={handleChange}
            value={value}
        />
    );
}
