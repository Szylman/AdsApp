import AdRender from "../features/AdRender";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAds } from "../../redux/adsRedux";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchAds()), [dispatch]);
    return(
    <>
        <h1 className = "px-2">Home</h1>
        <AdRender />
    </>
    )
};

export default Home;