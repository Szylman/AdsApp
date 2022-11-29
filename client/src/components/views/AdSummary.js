import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link }from 'react-router-dom';
import { IMGS_URL } from '../../config';

const AdSummary = props => {
return(
    <Card>
        <Card.Title className = "p-2">{props.title}</Card.Title>
        <Image fluid alt ='photo'src={ IMGS_URL+ props.image}  
        width={"auto"}  />
        <Card.Subtitle className = "p-2">{props.place}</Card.Subtitle>
        <Button className="mx-5 my-2" variant="dark" as={Link} to={`/ads/${props._id}`}>Show more</Button>
    </Card>
    )
};

export default AdSummary;
