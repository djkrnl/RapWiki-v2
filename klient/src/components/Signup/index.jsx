import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8000/api/users"
            const { data: res } = await axios.post(url, data)
            navigate("/login", { state: { info: res.message } })
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) setError(error.response.data.message)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <Card className='mt-3 mb-3'>
                        <Card.Header>Sign up</Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                {error &&
                                    <Alert variant="danger">{error}</Alert>
                                }
                                <Form.Group className="mb-3">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} value={data.username} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>First name:</Form.Label>
                                    <Form.Control type="text" placeholder="First name" name="firstName" onChange={handleChange} value={data.firstName} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last name:</Form.Label>
                                    <Form.Control type="text" placeholder="Last name" name="lastName" onChange={handleChange} value={data.lastName} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control type="email" placeholder="E-mail" name="email" onChange={handleChange} value={data.email} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleChange} value={data.password} required />
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit">Sign up</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup

