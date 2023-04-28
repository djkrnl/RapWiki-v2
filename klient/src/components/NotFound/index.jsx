import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="mt-3 mb-3 text-center">
                    <h1>404 Not Found</h1>
                </Col>
            </Row>
        </Container>
    )
}
export default NotFound