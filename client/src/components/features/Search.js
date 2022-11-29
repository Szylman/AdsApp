import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link }from 'react-router-dom';

const Search = () => {
    const [ searchPhrase, setSearchPhrase ] = useState('');
    return(
        <Form className="d-flex">
            <Form.Control onChange = {e =>setSearchPhrase(e.target.value)} className="ms-4" type="search" placeholder="Search" arial-label="Search"/>
            <Button className="me-4 ms-2" variant='outline-light' as={Link}  to={`/ads/search/${searchPhrase}`}>Search</Button>
        </Form>
    )
};

export default Search;