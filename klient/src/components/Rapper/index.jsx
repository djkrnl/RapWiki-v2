import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import { Link, useParams } from "react-router-dom"

import { Card, Container, Row, Col, Dropdown, Table, Button } from "react-bootstrap";

const Rapper = () => {
    const userToken = localStorage.getItem("token")

    const params = useParams()

    const [rapper, setRapper] = useState({})
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/rappers/" + params.id, {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setRapper(res.data)
            })

        axios.get("http://localhost:8000/api/albums/rapper/" + params.id, {
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
            <Row className="mt-3 mb-3">
                <h1>{rapper.name}</h1>

                <div>
                    <Button href={"/addRapper/" + rapper._id} variant="primary" className="m-1">Edit</Button>
                </div>
            </Row>
            <Dropdown.Divider />
            <Row className="flex-column-reverse flex-md-row mt-3 mb-3">
                <Col xl={9} lg={8} md={7}>
                    <Card className="border-0">
                        <Card.Body>
                            {rapper.description}
                            <Dropdown.Divider className="mt-3 mb-3" />
                            <b>Albums: </b>
                            <ul>
                                {albums.map((album) => (
                                    album.type === "Album" && (
                                        temp += 1,
                                        <li key={album._id}><Link to={"/album/" + album._id} style={{ textDecoration: 'none', color: 'blue' }}>{album.title} ({moment(album.releaseDate).format("YYYY")})</Link></li>
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
                            <b>EPs: </b>
                            <ul>
                                {albums.map((album) => (
                                    album.type === "EP" && (
                                        temp += 1,
                                        <li key={album._id}><Link to={"/album/" + album._id} style={{ textDecoration: 'none', color: 'blue' }}>{album.title} ({moment(album.releaseDate).format("YYYY")})</Link></li>
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
                            <b>Mixtapes: </b>
                            <ul>
                                {albums.map((album) => (
                                    album.type === "Mixtape" && (
                                        temp += 1,
                                        <li key={album._id}><Link to={"/album/" + album._id} style={{ textDecoration: 'none', color: 'blue' }}>{album.title} ({moment(album.releaseDate).format("YYYY")})</Link></li>
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
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={4} md={5}>
                    <Card bg="light" border="secondary">
                        <Card.Body>
                            <Card.Title className="text-center">{rapper.name}</Card.Title>
                            <Table borderless>
                                <tbody>
                                    <tr>
                                        <th scope="row">Full name</th>
                                        <td>{rapper.fullName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Birth date</th>
                                        <td>{moment(rapper.birthDate).format("YYYY-MM-DD")}</td>
                                    </tr>
                                    {rapper.birthCity !== "" &&
                                        <tr>
                                            <th scope="row">Birth city</th>
                                            <td>{rapper.birthCity}</td>
                                        </tr>
                                    }
                                    {rapper.birthCountry !== "" &&
                                        <tr>
                                            <th scope="row">Birth country</th>
                                            <td>{rapper.birthCountry}</td>
                                        </tr>
                                    }
                                    {rapper.deathDate !== null &&
                                        <tr>
                                            <th scope="row">Death date</th>
                                            <td>{moment(rapper.deathDate).format("YYYY-MM-DD")}</td>
                                        </tr>
                                    }
                                    {rapper.deathCity !== "" &&
                                        <tr>
                                            <th scope="row">Death city</th>
                                            <td>{rapper.deathCity}</td>
                                        </tr>
                                    }
                                    {rapper.deathCountry !== "" &&
                                        <tr>
                                            <th scope="row">Death country</th>
                                            <td>{rapper.deathCountry}</td>
                                        </tr>
                                    }
                                    <tr>
                                        <th scope="row">Age</th>
                                        <td>
                                            {rapper.deathDate !== null ? (
                                                <>{moment(rapper.deathDate).diff(rapper.birthDate, 'years')}</>
                                            ) : (
                                                <>{moment().diff(rapper.birthDate, 'years')}</>
                                            )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Country</th>
                                        <td>{rapper.country}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Occupations</th>
                                        <td>{rapper.occupations && rapper.occupations.join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Genres</th>
                                        <td>{rapper.genres && rapper.genres.join(", ")}</td>
                                    </tr>
                                    {rapper.website !== "" &&
                                        <tr>
                                            <th scope="row">Website</th>
                                            <td>{rapper.website}</td>
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

export default Rapper