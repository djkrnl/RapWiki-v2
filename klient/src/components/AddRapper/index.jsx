import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";
import moment from "moment"
//import Rapper from "../Rapper";

const AddRapper = () => {
    const userToken = localStorage.getItem("token")

    const params = useParams()

    const [data, setData] = useState({
        name: "",
        fullName: "",
        birthDate: "",
        birthCity: "",
        birthCountry: "",
        deathDate: "",
        deathCity: "",
        deathCountry: "",
        country: "",
        occupations: [],
        genres: [],
        website: "",
        description: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        console.log(data)
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            var url = "http://localhost:8000/api/rappers"
            if (params.id != null) {
                url = url + "/" + params.id

                const { data: res } = await axios.put(url, data, {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                navigate("/rapper/" + params.id)
            } else {
                const { data: res } = await axios.post(url, data, {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                navigate("/rapper/" + res.message)
            }  
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) setError(error.response.data.message)
        }
    }

    const occupations = [
        "Rapper",
        "Producer",
        "Songwriter",
    ]

    const [occupationsCheck, setOccupationsCheck] = useState(
        new Array(occupations.length).fill(false)
    )

    const handleOccupationsChange = (position) => {
        const updatedOccupationsCheck = occupationsCheck.map((item, index) =>
            index === position ? !item : item,
        )

        var updatedOccupationsArray = [];
        occupations.forEach(function (item, index) {
            if (updatedOccupationsCheck[index]) updatedOccupationsArray.push(item);
        });

        setOccupationsCheck(updatedOccupationsCheck);
        setData({ ...data, occupations: updatedOccupationsArray })
    }

    const genres = [
        "Trap",
        "Boom bap",
        "Underground hip-hop",
        "Abstract hip-hop",
        "Jazz rap",
        "Lo-fi hip-hop",
        "Experimental hip-hop",
        "Industrial hip-hop",
        "Drumless",
        "Gangsta rap",
        "West Coast hip-hop",
        "East Coast hip-hop",
        "Emo rap",
        "Rap rock",
        "Cloud rap",
        "Hip house",
        "Hyphy",
        "Hardcore hip-hop",
        "Conscious hip-hop",
        "Southern hip-hop",
        "Memphis rap",
        "Plugg",
        "Drill",
        "Grime",
        "Christian hip-hop",
    ]

    const [genresCheck, setGenresCheck] = useState(
        new Array(genres.length).fill(false)
    )

    const handleGenresChange = (position) => {
        const updatedGenresCheck = genresCheck.map((item, index) =>
            index === position ? !item : item,
        )

        var updatedGenresArray = [];
        genres.forEach(function (item, index) {
            if (updatedGenresCheck[index]) updatedGenresArray.push(item);
        });

        setGenresCheck(updatedGenresCheck);
        setData({ ...data, genres: updatedGenresArray })
    }

    const date = moment().format("YYYY-MM-DD")

    useEffect(() => {
        if (params.id != null) {
            axios.get("http://localhost:8000/api/rappers/" + params.id, {
                headers: {
                    "X-Access-Token": userToken,
                }
            })
                .then(res => {
                    occupations.forEach(function (item, index) {
                        if (res.data.occupations.includes(item)) occupationsCheck[index] = true
                    })
                    genres.forEach(function (item, index) {
                        if (res.data.genres.includes(item)) genresCheck[index] = true
                    })
                    setData({
                        ...data,
                        name: res.data.name,
                        fullName: res.data.fullName,
                        birthDate: moment(res.data.birthDate).format("YYYY-MM-DD"),
                        birthCity: res.data.birthCity,
                        birthCountry: res.data.birthCountry,
                        deathDate: res.data.deathDate != null ? moment(res.data.deathDate).format("YYYY-MM-DD") : "",
                        deathCity: res.data.birthCity,
                        deathCountry: res.data.birthCountry,
                        country: res.data.country,
                        occupations: res.data.occupations,
                        genres: res.data.genres,
                        website: res.data.website,
                        description: res.data.description
                    })   
                })
        }
    }, [userToken]);

    return (
        <Container>
            <Row className="justify-content-center mt-3 mb-3">
                <Col md={10} lg={8} xl={6}>
                    <Card>
                        <Card.Header>Add rapper</Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Name" name="name" maxLength={100} onChange={handleChange} value={data.name} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full name<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Full Name" name="fullName" maxLength={200} onChange={handleChange} value={data.fullName} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Birth date<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="date" placeholder="Birth Date" name="birthDate" max={date} onChange={handleChange} value={data.birthDate} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Birth city:</Form.Label>
                                    <Form.Control type="text" placeholder="Birth City" name="birthCity" maxLength={200} onChange={handleChange} value={data.birthCity} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Birth country:</Form.Label>
                                    <Form.Control type="text" placeholder="Birth Country" name="birthCountry" maxLength={200} onChange={handleChange} value={data.birthCountry} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Death date:</Form.Label>
                                    <Form.Control type="date" placeholder="Death Date" name="deathDate" max={date} onChange={handleChange} value={data.deathDate} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Death city:</Form.Label>
                                    <Form.Control type="text" placeholder="Death City" name="deathCity" maxLength={200} onChange={handleChange} value={data.deathCity} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Death country:</Form.Label>
                                    <Form.Control type="text" placeholder="Death Country" name="deathCountry" maxLength={200} onChange={handleChange} value={data.deathCountry} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Country" name="country" maxLength={200} onChange={handleChange} value={data.country} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Occupations<span className="text-danger">*</span>:</Form.Label><br />
                                    <div className="inline-radio">
                                        {occupations.map((name, index) => (
                                            <Form.Check inline key={name} label={name} type="checkbox" name="occupations" value={name} onChange={() => handleOccupationsChange(index)} checked={occupationsCheck[index]} />
                                        ))}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Genres<span className="text-danger">*</span>:</Form.Label><br />
                                    <div className="inline-radio">
                                        {genres.map((name, index) => (
                                            <Form.Check inline className="w-100" key={name} label={name} type="checkbox" name="genres" value={name} onChange={() => handleGenresChange(index)} checked={genresCheck[index]} />
                                        ))}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website:</Form.Label>
                                    <Form.Control type="text" placeholder="Website" name="website" maxLength={200} onChange={handleChange} value={data.website} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control as="textarea" rows={12} placeholder="Description" name="description" onChange={handleChange} value={data.description} required />
                                </Form.Group>
                                <div className="text-center mb-3">
                                    <Button type="submit">Submit</Button>
                                </div>
                                {error &&
                                    <Alert variant="danger">{error}</Alert>
                                }
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddRapper

