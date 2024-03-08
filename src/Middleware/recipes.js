// import { calcMinutes, formatTime } from "../utils/time";
// import getCookie from '../utils/getCookie';

import { calcMinutes } from "../utils/time";

// import { getCourse } from "./courses";
const baseUrl = 'http://localhost:8000/recipes'

export async function getAllRecipes() {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch all recipes.")
        }

        const data = await response.json();
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function getRecipesByDiet(id) {
    try {
        const response = await fetch(`${baseUrl}/?diet=${id}`)

        if (!response.ok) {
            throw new Error("Failed to fetch all recipes.")
        }
        const data = await response.json();
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function getRecipesByCategory(id) {
    try {
        const response = await fetch(`${baseUrl}/?categories=${id}`)

        if (!response.ok) {
            throw new Error("Failed to fetch all recipes.")
        }
        const data = await response.json();
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}



export async function getRecipe(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (!response.ok) {
            // const errorData = await response.json()
            throw new Error("Failed to fetch all recipes.")
        }

        const data = await response.json();
        // console.log(data);
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function patchRecipe(id, recipeData) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to update recipe.");
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
export async function createRecipe(
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
    servingSize,
) {
    try {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);

        // Assuming `course` is an array of course IDs

        course.forEach(c => {
            formData.append('course_ids', String(c.id)); // Ensure IDs are converted to strings
        });
        formData.append('diet_id', String(diet.id)); // Ensure the diet ID is converted to a string

        // Calculate total minutes for prep and cook time
        formData.append('prep_time', String(calcMinutes(prepHours, prepMinutes)));
        formData.append('cook_time', String(calcMinutes(cookHours, cookMinutes)));

        // Assuming `categories` is an array of category IDs
        categories.forEach(category => {
            formData.append('category_ids', String(category.id)); // Ensure IDs are converted to strings
        });

        if (image && image.data) { // Make sure image.data exists before appending
            formData.append('image', image.data);
        }

        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('instructions', JSON.stringify(instructions));
        formData.append('serving_size', servingSize);

        const user_id = JSON.parse(localStorage.getItem('auth')).id;
        formData.append('user_id', String(user_id)); // Ensure the user_id is converted to a string

        console.log(formData)

        const response = await fetch(baseUrl + '/create', {
            method: 'POST',
            body: formData, // Do not set 'Content-Type' header manually
        });

        if (response.ok) {
            const data = await response.json();

            console.log('Recipe created successfully:', data);
            return data; // Return the response data for further processing
        } else {
            const errorData = await response.json(); // Assuming the server responds with JSON
            console.error('Failed to create recipe:', response.status, errorData);
            throw new Error(`Server responded with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error; // Rethrow to allow caller to handle
    }
}
