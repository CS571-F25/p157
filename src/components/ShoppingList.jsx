import { useContext } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { InventoryContext } from '../contexts/InventoryContext'

export default function ShoppingList({ isDarkMode })
{
    const { items } = useContext(InventoryContext)
    const lowQuantityItems = items.filter(item => item.quantity < 1)

    return (
        <Container className="mt-5" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547' }}>Shopping List</h1>
                    {lowQuantityItems.length > 0 ? (
                        <ListGroup>
                            {lowQuantityItems.map((item, index) => (
                                <ListGroup.Item 
                                    key={index}
                                    style={{
                                        backgroundColor: isDarkMode ? '#343a40' : '#ffffff',
                                        color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
                                        borderColor: isDarkMode ? '#495057' : '#dee2e6'
                                    }}
                                >
                                    {item.name} (Quantity: {item.quantity})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No items need to be restocked.</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

