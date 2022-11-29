import { Container } from "react-bootstrap";
import Header from "./components/views/Header";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Ad from './components/pages/Ad'
import AdSearch from "./components/pages/AdSearch";
import AddAd from './components/features/AddAd'
import EditAd from "./components/features/EditAd";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Footer from "./components/views/Footer";
import Logout from "./components/pages/Logout";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path='/ads/search/:searchPhrase' element= {<AdSearch />}/>
        <Route path="/ads/:id" element= {<Ad />}/>
        <Route path="/ads/add" element= {<AddAd />}/>
        <Route path="/ads/edit/:id" element= {<EditAd />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
