import { useState, useRef, useContext, useMemo } from 'react'
import { Button, Container, Row, Col, Form, ListGroup, InputGroup, ButtonGroup, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap'
import Fuse from 'fuse.js'
import InventoryItem from './InventoryItem'
import InventoryItemCard from './InventoryItemCard'
import InventoryItemModal from './InventoryItemModal'
import InventoryUndo from './InventoryUndo'
import InventoryItemUndoAdd from './InventoryItemUndoAdd'
import { InventoryContext } from '../contexts/InventoryContext'
import { getPageStyles } from '../Styles'
import { getAllTags, getTagColor } from '../utils/tags'

export default function Inventory({ isDarkMode })
{
    const { items, addItem, deleteItem, incrementQuantity, decrementQuantity, updateItem, restoreItem } = useContext(InventoryContext)
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [minDesiredStock, setMinDesiredStock] = useState(0)
    const [selectedTag, setSelectedTag] = useState('')
    const [isAddButtonHovered, setIsAddButtonHovered] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [focusedInput, setFocusedInput] = useState(null)
    const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
    const [sortOption, setSortOption] = useState('name') // 'name' or 'stock'
    const [undoInfo, setUndoInfo] = useState(null)
    const [undoAddInfo, setUndoAddInfo] = useState(null)
    const nameInputRef = useRef(null)
    const tagSelectRef = useRef(null)

    const styles = getPageStyles(isDarkMode)

    const handleItemClick = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedItem(null)
    }

    // Use Fuse.js for fuzzy search and apply sorting
    const sortedItems = useMemo(() => {
        let filteredItems = items
        
        // Apply search filter if there's a search query
        if (inputValue.trim()) {
            const fuse = new Fuse(items, {
                keys: [
                    'name',
                    {
                        name: 'tags',
                        getFn: (item) => item.tags ? item.tags.join(' ') : ''
                    }
                ],
                threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
                includeScore: true
            })

            const results = fuse.search(inputValue.trim())
            filteredItems = results.map(result => result.item)
        }

        // Apply sorting
        const sorted = [...filteredItems].sort((a, b) => {
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
    }, [items, inputValue, sortOption])

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            const itemName = inputValue.trim()
            const tags = selectedTag ? [selectedTag] : []
            addItem(itemName, quantity, minDesiredStock, tags)
            // Store undo info for the added item
            setUndoAddInfo({
                itemName: itemName
            })
            setInputValue('')
            setQuantity(1)
            setMinDesiredStock(0)
            setSelectedTag('')
            nameInputRef.current?.focus()
        }
    }

    // Get all unique tags from existing items plus all available tags
    const allTags = useMemo(() => {
        const itemTags = new Set(getAllTags())
        items.forEach(item => {
            if (item.tags && Array.isArray(item.tags)) {
                item.tags.forEach(tag => itemTags.add(tag))
            }
        })
        return Array.from(itemTags).sort()
    }, [items])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // If tag select is focused, prevent adding item (native select will expand on Enter)
            if (focusedInput === 'tag') {
                e.preventDefault()
                e.stopPropagation()
                return
            } else if (inputValue.trim() !== '') {
                handleAddItem()
            }
        }
    }

    const handleDelete = (itemName) => {
        // Find the item to get its full data for potential undo
        const item = items.find(i => i.name === itemName)
        if (item) {
            // Store the full item data for undo
            setUndoInfo({
                item: { ...item }
            })
            deleteItem(itemName)
        }
    }

    const handleUndo = () => {
        if (undoInfo && undoInfo.item) {
            restoreItem(undoInfo.item)
            setUndoInfo(null)
        }
    }

    const handleDismiss = () => {
        setUndoInfo(null)
    }

    const handleUndoAdd = () => {
        if (undoAddInfo && undoAddInfo.itemName) {
            deleteItem(undoAddInfo.itemName)
            setUndoAddInfo(null)
        }
    }

    const handleDismissAdd = () => {
        setUndoAddInfo(null)
    }

    return (
        <>
            {/* Search bar section - always centered and constrained to same width */}
            <Container className="mt-5" style={styles.container}>
                <Row className="justify-content-center">
                    <Col md={6}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h1 className="mb-0" style={styles.heading}>Inventory</h1>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                            <ButtonGroup>
                                <ToggleButton
                                    id="toggle-list"
                                    type="radio"
                                    variant="outline-secondary"
                                    name="view-mode"
                                    value="list"
                                    checked={viewMode === 'list'}
                                    onChange={(e) => setViewMode(e.currentTarget.value)}
                                >
                                    List
                                </ToggleButton>
                                <ToggleButton
                                    id="toggle-grid"
                                    type="radio"
                                    variant="outline-secondary"
                                    name="view-mode"
                                    value="grid"
                                    checked={viewMode === 'grid'}
                                    onChange={(e) => setViewMode(e.currentTarget.value)}
                                >
                                    Grid
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                    </div>
                    <Form.Group className="mb-3">
                        <InputGroup style={{ flexWrap: 'nowrap' }}>
                            <Form.Control
                                ref={nameInputRef}
                                type="text"
                                placeholder="Search or add an item name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                onFocus={() => setFocusedInput('name')}
                                onBlur={() => setFocusedInput(null)}
                                style={{
                                    ...styles.nameInput,
                                    flex: '1 1 auto',
                                    minWidth: 0
                                }}
                                aria-label="Search / Add item"
                            />
                            <InputGroup.Text>Qty:</InputGroup.Text>
                            <Form.Control
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                onKeyDown={handleKeyPress}
                                onFocus={() => setFocusedInput('quantity')}
                                onBlur={() => setFocusedInput(null)}
                                style={{ ...styles.quantityInput, width: '50px', minWidth: '50px', maxWidth: '50px' }}
                                aria-label="Specify Quantity"
                            />
                            <InputGroup.Text>Min:</InputGroup.Text>
                            <Form.Control
                                type="number"
                                min="0"
                                value={minDesiredStock}
                                onChange={(e) => setMinDesiredStock(e.target.value)}
                                onKeyDown={handleKeyPress}
                                onFocus={() => setFocusedInput('minDesiredStock')}
                                onBlur={() => setFocusedInput(null)}
                                style={{ ...styles.quantityInput, width: '50px', minWidth: '50px', maxWidth: '50px' }}
                                aria-label="Specify Minimum Desired Stock"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Form.Select
                                    ref={tagSelectRef}
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    onFocus={() => setFocusedInput('tag')}
                                    onBlur={() => setFocusedInput(null)}
                                    style={styles.tagSelect}
                                    aria-label="Select tag"
                                >
                                    <option value="">No tag</option>
                                    {allTags.map(tag => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </Form.Select>
                                {selectedTag && (
                                    <span
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: getTagColor(selectedTag),
                                            border: '2px solid var(--bs-border-color)',
                                            flexShrink: 0
                                        }}
                                        title={selectedTag}
                                        aria-label={`Selected tag: ${selectedTag}`}
                                    />
                                )}
                            </div>
                            <Button
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
                                    ...(isAddButtonHovered && inputValue.trim() !== '' ? styles.addButtonHover : {}),
                                    textDecoration: 'none'
                                }}
                                aria-label="Add item"
                                variant="danger"
                            >
                                Add
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    {inputValue.trim() !== '' && (
                        <p style={styles.relevancyLabel}>Showing items by relevancy</p>
                    )}
                    </Col>
                </Row>
            </Container>
            {/* Items section - full width in grid mode, centered in list mode */}
            <Container className="mt-3" style={styles.container} fluid={viewMode === 'grid'}>
                {sortedItems.length > 0 && (
                    viewMode === 'list' ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <ListGroup>
                                    {sortedItems.map((item) => (
                                        <InventoryItem 
                                            key={item.name} 
                                            item={item} 
                                            isDarkMode={isDarkMode}
                                            onDelete={() => handleDelete(item.name)}
                                            onIncrement={() => incrementQuantity(item.name)}
                                            onDecrement={() => decrementQuantity(item.name)}
                                            onClick={() => handleItemClick(item)}
                                        />
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            {sortedItems.map((item) => (
                                <Col key={item.name} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
                                    <InventoryItemCard
                                        item={item}
                                        isDarkMode={isDarkMode}
                                        onDelete={() => handleDelete(item.name)}
                                        onIncrement={() => incrementQuantity(item.name)}
                                        onDecrement={() => decrementQuantity(item.name)}
                                        onClick={() => handleItemClick(item)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )
                )}
                {undoInfo && (
                    viewMode === 'list' ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <InventoryUndo
                                    itemName={undoInfo.item.name}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndo}
                                    onDismiss={handleDismiss}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <InventoryUndo
                                    itemName={undoInfo.item.name}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndo}
                                    onDismiss={handleDismiss}
                                />
                            </Col>
                        </Row>
                    )
                )}
                {undoAddInfo && (
                    viewMode === 'list' ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <InventoryItemUndoAdd
                                    itemName={undoAddInfo.itemName}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndoAdd}
                                    onDismiss={handleDismissAdd}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <InventoryItemUndoAdd
                                    itemName={undoAddInfo.itemName}
                                    isDarkMode={isDarkMode}
                                    onUndo={handleUndoAdd}
                                    onDismiss={handleDismissAdd}
                                />
                            </Col>
                        </Row>
                    )
                )}
            </Container>
            <InventoryItemModal
                show={showModal}
                item={selectedItem}
                isDarkMode={isDarkMode}
                updateItem={updateItem}
                onHide={handleCloseModal}
            />
        </>
    )
}

