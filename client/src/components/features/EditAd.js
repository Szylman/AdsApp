import {
    useDispatch,
    useSelector
} from "react-redux"
import { Navigate,  useNavigate,  useParams } from "react-router-dom";
import { API_URL } from "../../config";
import { editAd, fetchAds, getAdById } from "../../redux/adsRedux";
import AdForm from './AdForm';

const EditAd = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const adData = useSelector(state => getAdById(state, id));

    let navigate = useNavigate();

    const handleSubmit = ad => {
        dispatch(editAd(ad));
        const fd = new FormData();
        fd.append('title', ad.title);
        fd.append('content', ad.content);
        fd.append('price', ad.price);
        fd.append('image', ad.image);
        fd.append('place', ad.place);
        fd.append('date', ad.date);
       
        const options = {
            method: 'PUT',
            credentials: 'include',
            body: fd
        };
        fetch(`${API_URL}/ads/${id}`, options);
        dispatch(fetchAds()); 
        navigate('/');
    };

    if(!adData) return <Navigate to ="/" />
    return(
        <AdForm action= {handleSubmit} login={adData.user.login} {...adData} _id={adData._id} />
    )

};

export default EditAd;