import { Button, Card, Container, Row, Col } from "react-bootstrap";

const Main = () => {
    const username = localStorage.getItem("username")

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xl={10}>
                    <Card className='mt-3 mb-3 text-center'>
                        <Card.Body>
                            <Card.Title>Welcome, {username}</Card.Title>
                            <Card.Subtitle>What do you want to do today?</Card.Subtitle>
                            <div>
                                <Button href="/addRapper" variant="success" size="lg" className="m-3">Add rapper</Button>
                                <Button href="/addAlbum" variant="info" size="lg" className="m-3 text-white">Add album</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3 mb-3 text-center'>
                        <Card.Body>
                            <Card.Title>Autor projektu: Kornel Szarapajew</Card.Title>
                            <Card.Subtitle>
                                Politechnika Lubelska <br />
                                Wydział Elektrotechniki i Informatyki <br />
                                Informatyka - Inżynieria oprogramowania <br />
                                Grupa 6.8
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Main