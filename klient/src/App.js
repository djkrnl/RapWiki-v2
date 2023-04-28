import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes, Navigate } from "react-router-dom"
import { Navbar, Nav, Container } from "react-bootstrap";

import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddRapper from "./components/AddRapper"
import AddAlbum from "./components/AddAlbum"
import Rappers from "./components/Rappers"
import Albums from "./components/Albums"
import NotFound from "./components/NotFound"
import Rapper from "./components/Rapper"
import Album from "./components/Album"

function App() {
  const userToken = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.reload()
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">RapWiki</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {userToken &&
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/rappers">Rappers</Nav.Link>
                <Nav.Link href="/albums">Albums</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          }
          {!userToken &&
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" />
              <Nav className="ml-auto">
                <Nav.Link href="/login">Log in</Nav.Link>
                <Nav.Link href="/signup">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          }
        </Container>
      </Navbar>
      <div>
        <Routes>
          {userToken && <Route path="/signup" exact element={<Navigate to="/" replace="true" />} />}
          {userToken && <Route path="/login" exact element={<Navigate to="/" replace="true" />} />}
          {userToken && <Route path="/addRapper" exact element={<AddRapper />} />}
          {userToken && <Route path="/addAlbum" exact element={<AddAlbum />} />}
          {userToken && <Route path="/rappers" exact element={<Rappers />} />}
          {userToken && <Route path="/albums" exact element={<Albums />} />}
          {userToken && <Route path="/rapper/:id" exact element={<Rapper />} />}
          {userToken && <Route path="/album/:id" exact element={<Album />} />}
          {userToken && <Route path="/addRapper/:id" exact element={<AddRapper />} />}
          {userToken && <Route path="/addAlbum/:id" exact element={<AddAlbum />} />}
          {userToken && <Route path="/" exact element={<Main />} />}
          {userToken && <Route path="*" element={<NotFound />} />}

          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace="true" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
