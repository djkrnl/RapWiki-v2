import { useState } from "react"
import { useLocation } from "react-router-dom";
import axios from "axios"
import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")

    const { state } = useLocation()
    var { info } = state || {}

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8000/api/authentication"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            localStorage.setItem("username", data.username)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) setError(error.response.data.message)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <Card className='mt-3 mb-3'>
                        <Card.Header>Log in</Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                {error &&
                                    <Alert variant="danger">{error}</Alert>
                                }
                                {info &&
                                    <Alert variant="success">{info}</Alert>
                                }
                                <Form.Group className="mb-3">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} value={data.username} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required />
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit">Log in</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login