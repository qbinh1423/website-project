/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */

async function efetch(url, options = {}) {
    let result = {};
    let json = {};

    try {
        result = await fetch(url, options);

        if (!result.ok) {
            const errorText = await result.text();
            console.error('Fetch error:', result.status, errorText);
            if (result.status === 404) {
                throw new Error(`Category not found (HTTP ${result.status})`);
            } else {
                throw new Error(`HTTP Error: ${result.status}`);
            }        
        }

        json = await result.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(error.message);
    }

    return json.data;
}


export function Genres() {
    const baseUrl = '/api/categories/all';

    async function getAllCategories() {
        const data = await efetch(baseUrl, { 
            method: 'GET' 
        });
        return data;
    }

    return {
        getAllCategories
    }   
}


export function getGenres() {
    const baseUrl = '/api/categories';

    async function getCategoryById(c_id) {
        const url = `${baseUrl}/${c_id}`;  
        const data = await efetch(url, {
            method: 'GET'
        });
        return data;
    }

    return {
        getCategoryById
    };
}




