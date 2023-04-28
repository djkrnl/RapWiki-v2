import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";
import moment from "moment"

const AddAlbum = () => {
    const userToken = localStorage.getItem("token")

    const params = useParams()

    const [data, setData] = useState({
        rapperId: "",
        title: "",
        releaseDate: "",
        type: "",
        genres: [],
        duration: "",
        label: "",
        studio: "",
        description: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            var url = "http://localhost:8000/api/albums"
            if (params.id != null) {
                url = url + "/" + params.id

                const { data: res } = await axios.put(url, data, {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                navigate("/album/" + params.id)
            } else {
                const { data: res } = await axios.post(url, data, {
                    headers: {
                        "X-Access-Token": userToken,
                    }
                })
                navigate("/album/" + res.message)
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) setError(error.response.data.message)
        }
    }

    const types = [
        "Album",
        "EP",
        "Mixtape",
    ]

    const [type, setType] = useState("");

    const handleTypeChange = ({ currentTarget: input }) => {
        setType(input.value)
        setData({ ...data, type: input.value })
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

    const [rappers, setRappers] = useState([])

    useEffect(() => {
        if (params.id != null) {
            axios.get("http://localhost:8000/api/albums/" + params.id, {
                headers: {
                    "X-Access-Token": userToken,
                }
            })
                .then(res => {
                    setType(res.data.type)
                    genres.forEach(function (item, index) {
                        if (res.data.genres.includes(item)) genresCheck[index] = true
                    })
                    setData({
                        ...data,
                        rapperId: res.data.rapperId,
                        title: res.data.title,
                        releaseDate: moment(res.data.releaseDate).format("YYYY-MM-DD"),
                        type: res.data.type,
                        genres: res.data.genres,
                        duration: res.data.duration,
                        label: res.data.label,
                        studio: res.data.studio,
                        description: res.data.description
                    })
                })
        }
    }, [userToken]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/rappers", {
            headers: {
                "X-Access-Token": userToken,
            }
        })
            .then(res => {
                setRappers(res.data)
            })
    }, [userToken, data]);

    return (
        <Container>
            <Row className="justify-content-center mt-3 mb-3">
                <Col md={10} lg={8} xl={6}>
                    <Card>
                        <Card.Header>Add album</Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rapper<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Select name="rapperId" onChange={handleChange} value={data.rapperId}>
                                        <option label="--Choose from list--" />
                                        {rappers.map((rapper) => (
                                            <>
                                                {params.id !== null && rapper._id === data.rapperId ? (
                                                    <option key={rapper._id} value={rapper._id} label={rapper.name} selected />
                                                ) : (
                                                    <option key={rapper._id} value={rapper._id} label={rapper.name} />
                                                )}
                                            </>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Title" name="title" maxLength={200} onChange={handleChange} value={data.title} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Release date<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="date" placeholder="Release Date" name="releaseDate" max={date} onChange={handleChange} value={data.releaseDate} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type<span className="text-danger">*</span>:</Form.Label><br />
                                    <div className="inline-radio">
                                        {types.map((name) => (
                                            <Form.Check inline key={name} label={name} type="radio" name="type" value={name} onChange={handleTypeChange} checked={type === name} />
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
                                    <Form.Label>Duration<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Duration" name="duration" maxLength={10} onChange={handleChange} value={data.duration} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Label<span className="text-danger">*</span>:</Form.Label>
                                    <Form.Control type="text" placeholder="Label" name="label" maxLength={100} onChange={handleChange} value={data.label} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Studio:</Form.Label>
                                    <Form.Control type="text" placeholder="Studio" name="studio" maxLength={100} onChange={handleChange} value={data.studio} />
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

export default AddAlbum

