import { Card, Row, Col, Modal, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getAdById, deleteFetchAd } from "../../redux/adsRedux";
import { getUser } from "../../redux/usersRedux";
import { useDispatch, useSelector } from "react-redux";
import Image from 'react-bootstrap/Image';
import { IMGS_URL } from "../../config";
import { useState } from "react";

const Ad = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const adData = useSelector(state => getAdById(state, id));
    let user = useSelector(getUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = e => {
        e.preventDefault();
        dispatch(deleteFetchAd(id));
        navigate('/');
    };

    if (!adData) return <Navigate to="/" />
    return (
        <Container>
            {show === true && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This operation will completely remove this ad from the app. Are you sure you want to do that?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleClick}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            <Card border="light">
                <Card.Header>{adData.date}</Card.Header>
                <Card.Title className='my-4' as='h1'>{adData.title}</Card.Title>

                <Row className='justify-content-between'>
                    <Col md={7}>
                        <Image fluid alt='photo' src={IMGS_URL + adData.image} width='500' />
                        <Card.Text className='my-4'><strong>Content:</strong> {adData.content}</Card.Text>
                        <Card.Text className='my-4'><strong>Price:</strong> {adData.price}</Card.Text>
                        <Card.Text className='my-4'><strong>Place:</strong> {adData.localization}</Card.Text>
                    </Col>
                    <Col md={2}>
                        <Image thumbnail rounded fluid alt='photo' src={IMGS_URL + adData.user.avatar} height={100} />
                        <Card.Text className='my-2'><strong>Phone:</strong> {adData.user.phone}</Card.Text>
                        <Card.Text className='my-2'><strong>User:</strong> {adData.user.login}</Card.Text>
                    </Col>
                    {(user !== null && user.login === adData.user.login) && (
                        <div className="d-flex my-4">
                            <Button className='mx-2' variant="outline-dark" as={Link} to={`/ads/edit/${id}`}>Edit</Button>
                            <Button variant="outline-danger" onClick={handleShow}>Delete</Button>
                        </div>
                    )}
                </Row>
            </Card>
        </Container>
    )
};

export default Ad;