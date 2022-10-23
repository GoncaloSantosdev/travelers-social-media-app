import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    };

    return req;
})

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createTour = (tourData) => API.post('/tour', tourData);
export const getTours = () => API.get('/tour');
export const getTour = (id) => API.get(`/tour/${id}`);
export const getToursByUser = (id) => API.get(`/tour/userTours/${id}`);