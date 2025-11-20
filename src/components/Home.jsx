import { useState, useRef } from 'react'
import { Container, Row, Col, Form, ListGroup, InputGroup } from 'react-bootstrap'

export default function Home({ isDarkMode })
{
    const [items, setItems] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(1)
    const nameInputRef = useRef(null)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const itemName = inputValue.trim()
            const quantityNum = parseInt(quantity) || 1
            
            setItems(prevItems => {
                const existingItemIndex = prevItems.findIndex(item => item.name === itemName)
                
                if (existingItemIndex !== -1) {
                    // Item exists, update its quantity
                    const updatedItems = [...prevItems]
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + quantityNum
                    }
                    return updatedItems
                } else {
                    // Item doesn't exist, add new item
                    return [...prevItems, { name: itemName, quantity: quantityNum }]
                }
            })
            
            setInputValue('')
            setQuantity(1)
            nameInputRef.current?.focus()
        }
    }

    return (
        <Container className="mt-5" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547' }}>Inventory</h1>
                    <Form.Group className="mb-3">
                        <InputGroup>
                            <Form.Control
                                ref={nameInputRef}
                                type="text"
                                placeholder="Type an item name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <InputGroup.Text>Qty:</InputGroup.Text>
                            <Form.Control
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                onKeyDown={handleKeyPress}
                                style={{ width: '80px' }}
                            />
                        </InputGroup>
                    </Form.Group>
                    {items.length > 0 && (
                        <ListGroup>
                            {items.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    {item.name} (Quantity: {item.quantity})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}