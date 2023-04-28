import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"

import { Button, Card, Container, Row, Col, Dropdown, Alert } from "react-bootstrap";

const Rappers = () => {
    const userToken = localStorage.getItem("token")

    const [error, setError] = useState("")
    const [rappers, setRappers] = useState([])
    const [albums, setAlbums] = useState([])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/api/albums/rapper/" + id, {
                headers: {
                    "X-Access-Token": userToken,
                }
            })

            await axios.delete("http://localhost:8000/api/rappers/" + id, {
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

    useEffect(() => {
        axios.get("http://localhost:8000/api/rappers", {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setRappers(res.data)
            })

        axios.get("http://localhost:8000/api/albums", {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setAlbums(res.data)
            })
    }, [userToken]);

    var temp = 0

    return (
        <Container>
            <Row className="justify-content-center mt-3 mb-3">
                <Col xl={10}>
                    <Card>
                        <Card.Header>
                            <div className="float-start">
                                All rappers
                            </div>
                            <div className="float-end">
                                <Button href="/addRapper" variant="primary">Add rapper</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {error &&
                                <Alert variant="danger">{error}</Alert>
                            }
                            {Object.keys(rappers).length === 0 ? (
                                <Card bg="secondary" text="white" className="mt-3 mb-3">
                                    <Card.Body>
                                        <b>No rappers added</b>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <>
                                    {rappers.map((rapper) => (
                                        <Card bg="secondary" text="white" className="mt-3 mb-3">
                                            <Card.Body>
                                                <Card.Title><Link to={"/rapper/" + rapper._id} style={{ textDecoration: 'none', color: 'lightblue' }}>{rapper.name}</Link></Card.Title>
                                                <Dropdown.Divider />
                                                <Row>
                                                    <Col>
                                                        <b>Full name: </b>
                                                        {rapper.fullName}
                                                        <br />
                                                        <b>Birth date: </b>
                                                        {moment(rapper.birthDate).format("YYYY-MM-DD")}
                                                    </Col>
                                                    <Col>
                                                        <b>Country: </b>
                                                        {rapper.country}
                                                        <br />
                                                        <b>Occupations: </b>
                                                        {rapper.occupations.join(", ")}
                                                    </Col>
                                                </Row>
                                                <Dropdown.Divider />
                                                <Row>
                                                    <Col>
                                                        <b>Albums, mixtapes and EPs: </b>
                                                        <ul>
                                                            {albums.map((album) => (
                                                                album.rapperId === rapper._id && (
                                                                    temp += 1,
                                                                    <li key={album._id}><Link to={"/album/" + album._id} style={{ textDecoration: 'none', color: 'lightblue' }}>{album.title} ({moment(album.releaseDate).format("YYYY")})</Link></li>
                                                                )
                                                            ))}
                                                            {(temp === 0) ? (
                                                                temp = 0,
                                                                <li>None</li>
                                                            ) : (
                                                                temp = 0,
                                                                <></>
                                                            )}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                                <Dropdown.Divider />
                                                <Row>
                                                    <Col className="text-center">
                                                        <Button href={"/rapper/" + rapper._id} variant="success" className="m-1">Details</Button>
                                                        <Button href={"/addRapper/" + rapper._id} variant="primary" className="m-1">Edit</Button>
                                                        <Button variant="danger" className="m-1" onClick={() => { if (window.confirm('Are you sure you wish to delete this rapper? All his albums will also be deleted.')) handleDelete(rapper._id) }}>Delete</Button>
                                                    </Col>
                                                </Row>
                                                {error &&
                                                    <Alert variant="danger">{error}</Alert>
                                                }
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

export default Rappers