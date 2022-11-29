import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import AdForm from "./AdForm";
import { API_URL } from "../../config";
import { addAd,  fetchAds } from "../../redux/adsRedux";

const AddAd = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate('/');

    const handleSubmit = async ad => {
        dispatch(addAd(ad));
        const fd = new FormData();
        fd.append('title', ad.title);
        fd.append('content', ad.content);
        fd.append('price', ad.price);
        fd.append('image', ad.image);
        fd.append('place', ad.place);
        const options = {
            method: 'POST',
            credentials: 'include',
            body: fd
        };
        await fetch(`${API_URL}/ads`, options);
        dispatch(fetchAds());
        navigate('/');
    };


    return(
        <AdForm action= {handleSubmit} />
    )
};
export default AddAd;