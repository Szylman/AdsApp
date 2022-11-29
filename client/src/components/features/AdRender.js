import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import AdSummary from "../views/AdSummary";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from "react-bootstrap";


const AdRender = () => {
    const ads = useSelector(getAllAds);
    return (
        <Container className="mt-4">
            {!ads && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            <Row>
                {ads.map(ad => <Col md="3" key={ad._id}><AdSummary {...ad} /></Col>)}
            </Row>
        </Container>
    );
};

export default AdRender;