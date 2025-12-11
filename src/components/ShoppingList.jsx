import { useState, useContext } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { InventoryContext } from '../contexts/InventoryContext'
import ShoppingListItem from './ShoppingListItem'
import ShoppingListUndo from './ShoppingListUndo'
import { getPageStyles, getShoppingListStyles } from '../Styles'

export default function ShoppingList({ isDarkMode })
{
    const { items, setQuantityToMinDesiredStock, updateItem } = useContext(InventoryContext)
    const [undoInfo, setUndoInfo] = useState(null)
    
    const lowQuantityItems = items.filter(item => {
        const minDesiredStock = item.minDesiredStock ?? 1
        return item.quantity < minDesiredStock
    })

    const pageStyles = getPageStyles(isDarkMode)
    const listStyles = getShoppingListStyles(isDarkMode)

    const handleItemCheck = (itemName) => {
        // Find the item to get its current quantity
        const item = items.find(i => i.name === itemName)
        if (item) {
            const previousQuantity = item.quantity
            setQuantityToMinDesiredStock(itemName)
            // Store undo info
            setUndoInfo({
                itemName: itemName,
                previousQuantity: previousQuantity
            })
        }
    }

    const handleUndo = () => {
        if (undoInfo) {
            // Restore the previous quantity
            const item = items.find(i => i.name === undoInfo.itemName)
            if (item) {
                updateItem(undoInfo.itemName, undoInfo.itemName, undoInfo.previousQuantity, item.minDesiredStock)
            }
            setUndoInfo(null)
        }
    }

    const handleDismiss = () => {
        setUndoInfo(null)
    }

    return (
        <Container className="mt-5" style={pageStyles.container}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={pageStyles.heading}>Shopping List</h1>
                    {lowQuantityItems.length > 0 ? (
                        <>
                            <ListGroup>
                                {lowQuantityItems.map((item) => (
                                    <ShoppingListItem
                                        key={item.name}
                                        item={item}
                                        isDarkMode={isDarkMode}
                                        onCheck={() => handleItemCheck(item.name)}
                                    />
                                ))}
                            </ListGroup>
                            {undoInfo && (
                                <ShoppingListUndo
                                    itemName={undoInfo.itemName}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndo}
                                    onDismiss={handleDismiss}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <p>No items need to be restocked.</p>
                            {undoInfo && (
                                <ShoppingListUndo
                                    itemName={undoInfo.itemName}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndo}
                                    onDismiss={handleDismiss}
                                />
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

