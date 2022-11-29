import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import AdSummary from "../views/AdSummary";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchSearchAds, getAllAds } from "../../redux/adsRedux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const AdSearch = () => {
    const {searchPhrase} = useParams();
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(fetchSearchAds(searchPhrase)), []);
    const ads = useSelector(getAllAds);

    return(
        <Container className="mt-4"> 
        {!ads && (
           <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )}
        <Row>
            <Col className='my-4'><h1>Search results</h1></Col>
        </Row>
        <Row>
            {ads.map(ad => <Col md="3" key={ad._id}><AdSummary {...ad} /></Col>)}
        </Row>
    </Container>
    )
};
export default AdSearch;