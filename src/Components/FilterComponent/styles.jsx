const customStyles = {

    // You might also want to adjust the border-radius for the menu (the dropdown)
    menu: (provided) => ({
        ...provided,
        borderRadius: 0 // Set border-radius to 0 to remove it
    }),
    // And possibly for other components that may have border-radius by default
    menuList: (provided) => ({
        ...provided,
        borderRadius: 0 // Set border-radius to 0 to remove it
    }),
    control: (base, state) => ({
        ...base,
        fontSize: '20px',
        border: 'none', // Remove all borders
        boxShadow: 'none',
        "&:hover": {
            boxShadow: 'none',
        },
        borderRadius: 0
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'lightgreen' : state.isFocused ? 'lightgreen' : provided.backgroundColor,
        color: state.isSelected ? 'black' : provided.color,
        "&:active": {
            backgroundColor: 'lightgreen',
        },
    }),
    // If you also want to change the background color for multiValue (the tags for selected items)
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: '#e9efe2',
        };
    },
    // And also for multiValueRemove (the remove icon on the tags)
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        ':hover': {
            backgroundColor: 'green',
            color: 'white',
        },
    }),
};

export default customStyles;