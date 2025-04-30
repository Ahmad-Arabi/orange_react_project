import api from './api';

export const fetchContent = async () => {
    try {
        const response = await api.get('/content');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching content: ' + error.message);
    }
};

export const getContentById = async (contentId) => {
    try {
        const response = await api.get(`/content/${contentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching content details: ' + error.message);
    }
};

export const createContent = async (contentData) => {
    try {
        const response = await api.post('/content', contentData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating content: ' + error.message);
    }
};

export const updateContent = async (contentId, contentData) => {
    try {
        const response = await api.put(`/content/${contentId}`, contentData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating content: ' + error.message);
    }
};

export const deleteContent = async (contentId) => {
    try {
        const response = await api.delete(`/content/${contentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting content: ' + error.message);
    }
};

export const likeContent = async (contentId) => {
    try {
        const response = await api.post(`/content/${contentId}/like`);
        return response.data;
    } catch (error) {
        throw new Error('Error liking content: ' + error.message);
    }
};

export const addComment = async (contentId, comment) => {
    try {
        const response = await api.post(`/content/${contentId}/comments`, { comment });
        return response.data;
    } catch (error) {
        throw new Error('Error adding comment: ' + error.message);
    }
};