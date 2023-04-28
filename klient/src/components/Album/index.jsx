import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import { Link, useParams } from "react-router-dom"

import { Card, Container, Row, Col, Dropdown, Table, Button } from "react-bootstrap";

const Album = () => {
    const userToken = localStorage.getItem("token")

    const params = useParams()

    const [album, setAlbum] = useState("")
    const [rapper, setRapper] = useState("")

    useEffect(() => {
        axios.get("http://localhost:8000/api/albums/" + params.id, {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setAlbum(res.data)

                axios.get("http://localhost:8000/api/rappers/" + res.data.rapperId, {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                    .then(res => {
                        setRapper(res.data)
                    })
            })
    }, [userToken]);

    /*function rapperName(id) {
        axios.get("http://localhost:8000/api/rappers/" + id, {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setRapper(res.data.name)
            })
            .catch(err => {

            })

        return rapper
    }*/

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <h1>{rapper.name} - {album.title}</h1>
                
                <div>
                    <Button href={"/addAlbum/" + album._id} variant="primary" className="m-1">Edit</Button>
                </div>
            </Row>
            <Dropdown.Divider />
            <Row className="flex-column-reverse flex-md-row mt-3 mb-3">
                <Col xl={9} lg={8} md={7}>
                    <Card className="border-0">
                        <Card.Body>
                            {album.description}
                            <Dropdown.Divider className="mt-3 mb-3" />
                            <h4><Link to={"/rapper/" + rapper._id} style={{ textDecoration: 'none', color: 'blue' }}>{rapper.name}</Link></h4>
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
                                    {rapper.occupations && rapper.occupations.join(", ")}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={4} md={5}>
                    <Card bg="light" border="secondary">
                        <Card.Body>
                            <Card.Title className="text-center">{album.title}</Card.Title>
                            <Table borderless>
                                <tbody>
                                    <tr>
                                        <th scope="row">Release date</th>
                                        <td>{moment(album.releaseDate).format("YYYY-MM-DD")}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Type</th>
                                        <td>{album.type}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Genres</th>
                                        <td>{album.genres && album.genres.join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Duration</th>
                                        <td>{album.duration}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Label</th>
                                        <td>{album.label}</td>
                                    </tr>
                                    {album.studio !== "" &&
                                        <tr>
                                            <th scope="row">Studio</th>
                                            <td>{album.studio}</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Album