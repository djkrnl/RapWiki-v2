import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"

import { Button, Card, Container, Row, Col, Dropdown, Alert } from "react-bootstrap";

const Albums = () => {
    const userToken = localStorage.getItem("token")

    const [error, setError] = useState("")
    const [albums, setAlbums] = useState([])
    const [rappers, setRappers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/albums", {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setAlbums(res.data)

                axios.get("http://localhost:8000/api/rappers", {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                    .then(res => {
                        setRappers(res.data)
                    })
            })
    }, [userToken]);

    const handleDelete = async (id) => {
        try {
            const url = "http://localhost:8000/api/albums/" + id
            await axios.delete(url, {
                headers: {
                    "X-Access-Token": userToken,
                }
            })

            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) setError(error.response.data.message)
            window.scrollTo(0, 0)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-3 mb-3">
                <Col xl={10}>
                    <Card>
                        <Card.Header>
                            <div className="float-start">
                                All albums
                            </div>
                            <div className="float-end">
                                <Button href="/addAlbum" variant="primary">Add album</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {error &&
                                <Alert variant="danger">{error}</Alert>
                            }
                            {Object.keys(albums).length === 0 ? (
                                <Card bg="secondary" text="white" className="mt-3 mb-3">
                                    <Card.Body>
                                        <b>No albums added</b>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <>
                                    {albums.map((album) => (
                                        <Card bg="secondary" text="white" className="mt-3 mb-3">
                                            <Card.Body>
                                                <Card.Title>
                                                    <Link to={"/album/" + album._id} style={{ textDecoration: 'none', color: 'lightblue' }}>
                                                        {rappers.map((rapper) => (
                                                            <>
                                                                {rapper._id === album.rapperId && (
                                                                    <>
                                                                        {rapper.name}
                                                                    </>
                                                                )}
                                                            </>
                                                        ))} - {album.title}
                                                    </Link>
                                                </Card.Title>
                                                <Dropdown.Divider />
                                                <Row>
                                                    <Col>
                                                        <b>Release date: </b>
                                                        {moment(album.releaseDate).format("YYYY-MM-DD")}
                                                        <br />
                                                        <b>Type: </b>
                                                        {album.type}
                                                    </Col>
                                                    <Col>
                                                        <b>Genres: </b>
                                                        {album.genres.join(", ")}
                                                        <br />
                                                        <b>Duration: </b>
                                                        {album.duration}
                                                    </Col>
                                                </Row>
                                                <Dropdown.Divider />
                                                <Row>
                                                    <Col className="text-center">
                                                        <Button href={"/album/" + album._id} variant="success" className="m-1">Details</Button>
                                                        <Button href={"/addAlbum/" + album._id} variant="primary" className="m-1">Edit</Button>
                                                        <Button variant="danger" className="m-1" onClick={() => { if (window.confirm('Are you sure you wish to delete this album?')) handleDelete(album._id) }}>Delete</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Albums