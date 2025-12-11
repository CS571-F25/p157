import { useState, useContext, useMemo } from 'react'
import { Container, Row, Col, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { InventoryContext } from '../contexts/InventoryContext'
import ShoppingListItem from './ShoppingListItem'
import ShoppingListUndo from './ShoppingListUndo'
import { getPageStyles, getShoppingListStyles } from '../Styles'

export default function ShoppingList({ isDarkMode })
{
    const { items, setQuantityToMinDesiredStock, updateItem } = useContext(InventoryContext)
    const [undoInfo, setUndoInfo] = useState(null)
    const [sortOption, setSortOption] = useState('name') // 'name', 'stock', or 'tag'
    
    const lowQuantityItems = useMemo(() => {
        const filtered = items.filter(item => {
            const minDesiredStock = item.minDesiredStock ?? 1
            return item.quantity < minDesiredStock
        })

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name)
            } else if (sortOption === 'stock') {
                return a.quantity - b.quantity
            } else if (sortOption === 'tag') {
                // Items with tags come first
                const aHasTags = a.tags && a.tags.length > 0
                const bHasTags = b.tags && b.tags.length > 0
                
                if (aHasTags && !bHasTags) return -1
                if (!aHasTags && bHasTags) return 1
                if (!aHasTags && !bHasTags) return a.name.localeCompare(b.name)
                
                // Both have tags - sort by first tag name
                const aFirstTag = a.tags[0] || ''
                const bFirstTag = b.tags[0] || ''
                const tagCompare = aFirstTag.localeCompare(bFirstTag)
                
                // If same tag, sort by name
                if (tagCompare === 0) {
                    return a.name.localeCompare(b.name)
                }
                return tagCompare
            }
            return 0
        })

        return sorted
    }, [items, sortOption])

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h1 className="mb-0" style={pageStyles.heading}>Shopping List</h1>
                        <DropdownButton
                            id="sort-dropdown"
                            title={`Sort: ${sortOption === 'name' ? 'Name' : sortOption === 'stock' ? 'Stock' : 'Tag'}`}
                            variant="outline-secondary"
                            size="sm"
                        >
                            <Dropdown.Item 
                                active={sortOption === 'name'}
                                onClick={() => setSortOption('name')}
                            >
                                Name
                            </Dropdown.Item>
                            <Dropdown.Item 
                                active={sortOption === 'stock'}
                                onClick={() => setSortOption('stock')}
                            >
                                Stock
                            </Dropdown.Item>
                            <Dropdown.Item 
                                active={sortOption === 'tag'}
                                onClick={() => setSortOption('tag')}
                            >
                                Tag
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
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

