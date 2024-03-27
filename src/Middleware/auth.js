const API_URL = 'http://localhost:8000/users/';

export async function register(username, password) {
    try {
        const response = await fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": username, "password": password })
        });

        if (!response.ok) {
            const errorData = await response.json(); // Assuming the error response is in JSON format
            throw new Error(errorData.username || 'Failed to register.');
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


export async function login(username, password) {
    try {
        const response = await fetch(API_URL + 'login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({ "username": username, "password": password })
        })
        if (!response.ok) {
            const errorData = await response.json(); // Assuming the error response is in JSON format
            console.log(errorData)
            throw new Error(errorData.username || 'Failed to login.');
        }


        const data = await getUser()
        localStorage.setItem('auth', { ...data })
        return { success: true, data: data };

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function logout() {
    try {
        const response = await fetch(API_URL + 'logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"

            },
            // body: JSON.stringify({ "username": username, "password": password })
        })
        if (!response.ok) {
            const errorData = await response.json(); // Assuming the error response is in JSON format
            throw new Error(errorData.username || 'Failed to logout.');
        }
        localStorage.removeItem('auth');
        // console.log(response);
    } catch (error) {
        return { success: false, error: error.message }
    }
}


export async function getUser() {
    try {
        const response = await fetch(API_URL + 'user', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (!response.ok) {
            const errorData = await response.json(); // Assuming the error response is in JSON format
            throw new Error(errorData.username || 'Failed to get user.');
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function getUserById(id) {
    try {
        const response = await fetch(`${API_URL}${id}`);

        if (!response.ok) {
            throw new Error("Could not fetch user");
        }

        const data = await response.json();

        if (!data || typeof data !== 'object') {
            throw new Error("Invalid data format received");
        }

        return { success: true, data: data };
    } catch (error) {
        console.error(error); 
        return { success: false, error: error.message };
    }
}

