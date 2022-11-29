import {
    API_URL
} from '../config';
import shortid from 'shortid';

export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find(ad => ad._id === adId);
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const EDIT_AD = createActionName('EDIT_AD');
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');

export const loadAds = payload => ({ payload, type: LOAD_ADS });

export const editAd = payload => ({ type: EDIT_AD, payload });

export const addAd = payload => ({ payload, type: ADD_AD });

export const removeAd = payload => ({ payload, type: REMOVE_AD });

export const searchAds = payload => ({ payload, type: SEARCH_ADS });

export const fetchAds = () => {
    return (dispatch) => {
        fetch(`${API_URL}/${reducerName}`)
            .then(res => res.json())
            .then(ads => {
                dispatch(loadAds(ads))
            })
    }
};

export const deleteFetchAd = (id) => {
    return (dispatch) => {
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };
        fetch(`${API_URL}/${reducerName}/${id}`, options)
            .then(() => dispatch(removeAd(id)));
    }
};

export const fetchSearchAds = (searchPhrase) => {
    return (dispatch) => {
        fetch(`${API_URL}/${reducerName}/search/${searchPhrase}`)
            .then(res => res.json())
            .then(ads => dispatch(loadAds(ads)));
        dispatch(searchAds(searchPhrase));
    }
};

const AdsReducer = (statePart = [], action) => {
    switch (action.type) {
        case LOAD_ADS:
            return [...action.payload];
        case EDIT_AD:
            return statePart.map(ad => (ad._id === action.payload.id ? {
                ...ad,
                ...action.payload
            } : ad));
        case ADD_AD:
            return [...statePart, { ...action.payload, id: shortid() }];
        case REMOVE_AD:
            return statePart.filter(ad => ad._id !== action.payload);
        case SEARCH_ADS:
            return statePart.filter(ad => ad.title.includes(action.payload));
        default:
            return statePart;
    }
};

export default AdsReducer;