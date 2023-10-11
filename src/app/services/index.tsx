import axios from 'axios';
export const fetchUniversities = async (queryParam: string) => {
    try {
        const response = await axios.get('http://universities.hipolabs.com' + queryParam);
        return response.data; // This will contain the data returned by the API
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

export const saveSearchTerm = async (searchTerm: string) => {
    try {
        await axios.post('http://localhost:5000/api/search', {
            term: searchTerm
        });
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

export const fetchSearchHistory = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/search');
        return response.data; // This will contain the data returned by the API
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};