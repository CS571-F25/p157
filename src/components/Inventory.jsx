import { useState, useRef, useContext, useMemo } from 'react'
import { Container, Row, Col, Form, ListGroup, InputGroup } from 'react-bootstrap'
import Fuse from 'fuse.js'
import InventoryItem from './InventoryItem'
import InventoryItemModal from './InventoryItemModal'
import { InventoryContext } from '../contexts/InventoryContext'
import { getPageStyles } from '../Styles'

export default function Inventory({ isDarkMode })
{
    const { items, addItem, deleteItem, incrementQuantity, decrementQuantity, updateItem } = useContext(InventoryContext)
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [minDesiredStock, setMinDesiredStock] = useState(1)
    const [isAddButtonHovered, setIsAddButtonHovered] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const nameInputRef = useRef(null)

    const styles = getPageStyles(isDarkMode)

    const handleItemClick = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedItem(null)
    }

    // Use Fuse.js for fuzzy search
    const sortedItems = useMemo(() => {
        if (!inputValue.trim()) {
            return items
        }

        const fuse = new Fuse(items, {
            keys: ['name'],
            threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
            includeScore: true
        })

        const results = fuse.search(inputValue.trim())
        return results.map(result => result.item)
    }, [items, inputValue])

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            const itemName = inputValue.trim()
            addItem(itemName, quantity, minDesiredStock)
            setInputValue('')
            setQuantity(1)
            setMinDesiredStock(1)
            nameInputRef.current?.focus()
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            handleAddItem()
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
                                placeholder="Search or add an item name"
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
                            <InputGroup.Text>Min:</InputGroup.Text>
                            <Form.Control
                                type="number"
                                min="1"
                                value={minDesiredStock}
                                onChange={(e) => setMinDesiredStock(e.target.value)}
                                onKeyDown={handleKeyPress}
                                style={styles.quantityInput}
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                disabled={inputValue.trim() === ''}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && inputValue.trim() !== '') {
                                        handleAddItem()
                                    }
                                }}
                                onMouseEnter={() => !(inputValue.trim() === '') && setIsAddButtonHovered(true)}
                                onMouseLeave={() => setIsAddButtonHovered(false)}
                                style={{
                                    ...styles.addButton,
                                    ...(inputValue.trim() === '' ? styles.addButtonDisabled : {}),
                                    ...(isAddButtonHovered && inputValue.trim() !== '' ? styles.addButtonHover : {})
                                }}
                                aria-label="Add item"
                            >
                                Add
                            </button>
                        </InputGroup>
                    </Form.Group>
                    {inputValue.trim() !== '' && (
                        <p style={styles.relevancyLabel}>Showing items by relevancy</p>
                    )}
                    {sortedItems.length > 0 && (
                        <ListGroup>
                            {sortedItems.map((item, index) => (
                                <InventoryItem 
                                    key={index} 
                                    item={item} 
                                    isDarkMode={isDarkMode}
                                    onDelete={() => handleDelete(item.name)}
                                    onIncrement={() => incrementQuantity(item.name)}
                                    onDecrement={() => decrementQuantity(item.name)}
                                    onClick={() => handleItemClick(item)}
                                />
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
            <InventoryItemModal
                show={showModal}
                item={selectedItem}
                isDarkMode={isDarkMode}
                updateItem={updateItem}
                onHide={handleCloseModal}
            />
        </Container>
    )
}

