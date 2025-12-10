import { useState, useRef, useContext } from 'react'
import { Container, Row, Col, Form, ListGroup, InputGroup } from 'react-bootstrap'
import InventoryItem from './InventoryItem'
import { InventoryContext } from '../contexts/InventoryContext'
import { getPageStyles } from '../Styles'

export default function Home({ isDarkMode })
{
    const { items, addItem, deleteItem, incrementQuantity, decrementQuantity } = useContext(InventoryContext)
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(1)
    const nameInputRef = useRef(null)

    const styles = getPageStyles(isDarkMode)

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
        <Container className="mt-5" style={styles.container}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={styles.heading}>Inventory</h1>
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
                                style={styles.quantityInput}
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
                                    onIncrement={() => incrementQuantity(item.name)}
                                    onDecrement={() => decrementQuantity(item.name)}
                                />
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}