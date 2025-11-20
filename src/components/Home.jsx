import { useState, useRef, useContext } from 'react'
import { Container, Row, Col, Form, ListGroup, InputGroup } from 'react-bootstrap'
import InventoryItem from './InventoryItem'
import { InventoryContext } from '../contexts/InventoryContext'

export default function Home({ isDarkMode })
{
    const { items, addItem, deleteItem } = useContext(InventoryContext)
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(1)
    const nameInputRef = useRef(null)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const itemName = inputValue.trim()
            addItem(itemName, quantity)
            setInputValue('')
            setQuantity(1)
            nameInputRef.current?.focus()
        }
    }

    const handleDelete = (itemName) => {
        deleteItem(itemName)
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
                                <InventoryItem 
                                    key={index} 
                                    item={item} 
                                    isDarkMode={isDarkMode}
                                    onDelete={() => handleDelete(item.name)}
                                />
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}