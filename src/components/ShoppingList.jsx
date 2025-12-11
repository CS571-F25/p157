import { useContext } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { InventoryContext } from '../contexts/InventoryContext'
import ShoppingListItem from './ShoppingListItem'
import { getPageStyles, getShoppingListStyles } from '../Styles'

export default function ShoppingList({ isDarkMode })
{
    const { items, setQuantityToMinDesiredStock } = useContext(InventoryContext)
    const lowQuantityItems = items.filter(item => {
        const minDesiredStock = item.minDesiredStock ?? 1
        return item.quantity < minDesiredStock
    })

    const pageStyles = getPageStyles(isDarkMode)
    const listStyles = getShoppingListStyles(isDarkMode)

    return (
        <Container className="mt-5" style={pageStyles.container}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={pageStyles.heading}>Shopping List</h1>
                    {lowQuantityItems.length > 0 ? (
                        <ListGroup>
                            {lowQuantityItems.map((item) => (
                                <ShoppingListItem
                                    key={item.name}
                                    item={item}
                                    isDarkMode={isDarkMode}
                                    onCheck={() => setQuantityToMinDesiredStock(item.name)}
                                />
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

