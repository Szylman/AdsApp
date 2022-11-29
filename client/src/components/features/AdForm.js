import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const AdForm = ({action, ...props}) => {
    const id = props.id;
    const [title, setTitle] = useState(props.title || '');
    const [content, setContent] = useState(props.content || '');
    const [price, setPrice] = useState(props.price || '');
    const [image, setImage] = useState(props.image || null);
    const [place, setPlace] = useState(props.place || '');

    const navigate = useNavigate();

    const day = new Date(Date.now());
    const date = day.toLocaleDateString();

    const handleSubmit = () => {
     action({title, content, date, price, place, image, id});
     navigate('/')
    };

    return(
        <Container>
            <h1 className = "mb-4">Ad Form</h1>
            <form onSubmit={handleSubmit}>
            <Row>
                <Col md={1}>
                    <Form.Label>Title:</Form.Label>
                </Col>
                <Col md={11}>
                    <Form.Control width= "100" value={title} onChange={e => setTitle(e.target.value)} />
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={1}>
                    <Form.Label>Description:</Form.Label>
                </Col>
                <Col md={11}>
                    <Form.Control width= "100" value={content} onChange={e => setContent(e.target.value)} as="textarea" />
                </Col>
            </Row>
            
            <Row className='mt-4'>
                <Col md={1}>
                    <Form.Label>Price:</Form.Label>
                </Col>
                <Col md={11}>
                    <Form.Control value={price} onChange={e => setPrice(e.target.value)} />
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={1}>
                    <Form.Label>Place:</Form.Label>
                </Col>
                <Col md={11}>
                    <Form.Control value={place} onChange={e => setPlace(e.target.value)} />
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={1}>
                    <Form.Label>Image:</Form.Label>
                </Col>
                <Col md={11}>
                    <Form.Control type='file' onChange={(e) => setImage(e.target.files[0])} />
                </Col>
            </Row>

            <Button type='submit' variant='dark' className='mt-4'>Update</Button>
            </form>
        </Container>
    )
};

export default AdForm;