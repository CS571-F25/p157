import { useContext } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { InventoryContext } from '../contexts/InventoryContext'
import { getPageStyles, getShoppingListStyles } from '../Styles'

export default function ShoppingList({ isDarkMode })
{
    const { items } = useContext(InventoryContext)
    const lowQuantityItems = items.filter(item => item.quantity < 1)

    const pageStyles = getPageStyles(isDarkMode)
    const listStyles = getShoppingListStyles(isDarkMode)

    return (
        <Container className="mt-5" style={pageStyles.container}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={pageStyles.heading}>Shopping List</h1>
                    {lowQuantityItems.length > 0 ? (
                        <ListGroup>
                            {lowQuantityItems.map((item, index) => (
                                <ListGroup.Item 
                                    key={index}
                                    style={listStyles.listItem}
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

