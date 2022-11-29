import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { logOut } from "../../redux/usersRedux";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = {
        method: 'DELETE',
    };
    useEffect(() => {
        fetch(`${API_URL}/logout`, options)
        .then(() => {
            dispatch(logOut());
            navigate('/');
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    
    return null
};

export default Logout;