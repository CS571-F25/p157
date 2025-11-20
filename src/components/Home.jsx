import { useState } from 'react'
import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap'

export default function Home(props)
{
    const [items, setItems] = useState([])
    const [inputValue, setInputValue] = useState('')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setItems([...items, inputValue.trim()])
            setInputValue('')
        }
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4">Item List</h1>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Type an item name and press Enter"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </Form.Group>
                    {items.length > 0 && (
                        <ListGroup>
                            {items.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    {item}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}