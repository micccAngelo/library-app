import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Appbar = () => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Library App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/book">ListBook</Nav.Link>
            <Nav.Link href="#ListCart">ListCart</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Button href='/' variant="outline-light">Login</Button>
          </Nav>
        </Container>
        </Navbar>
        </>
    );
}

export default Appbar;
