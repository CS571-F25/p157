import { useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { getInventoryItemStyles } from '../Styles'
import { getTagColor, getTagTextColor } from '../utils/tags'

export default function InventoryItem({ item, isDarkMode, onDelete, onIncrement, onDecrement, onClick }) {
    const [isFading, setIsFading] = useState(false)
    const styles = getInventoryItemStyles(isDarkMode)
    const minDesiredStock = item.minDesiredStock ?? 1
    const isLowStock = item.quantity < minDesiredStock

    const handleItemClick = (e) => {
        // Don't trigger if clicking on buttons
        if (e.target.tagName === 'BUTTON') {
            return
        }
        onClick()
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        if (!isFading) {
            setIsFading(true)
            // Wait for fade animation to complete before calling onDelete
            setTimeout(() => {
                onDelete()
            }, 500) // 500ms = half a second
        }
    }

    return (
        <ListGroup.Item 
            style={{ ...styles.listItem, ...(isFading ? styles.fading : {}), cursor: 'pointer' }}
            onClick={handleItemClick}
        >
            <div style={styles.controlsContainer}>
                <div style={styles.quantityControls}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onIncrement()
                        }}
                        style={{ ...styles.button, ...styles.incrementButton, textDecoration: 'none' }}
                        aria-label="Increment quantity"
                        variant="link"
                    >
                        +
                    </Button>
                    <span style={isLowStock ? { ...styles.quantity, ...styles.lowStockName } : styles.quantity}>{item.quantity}</span>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDecrement()
                        }}
                        style={{ ...styles.button, ...styles.decrementButton, textDecoration: 'none' }}
                        aria-label="Decrement quantity"
                        variant="link"
                    >
                        −
                    </Button>
                </div>
                <div style={styles.separator} />
                <span style={isLowStock ? styles.lowStockName : {}}>{item.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {item.tags && item.tags.length > 0 && (
                    <div style={styles.tagContainer}>
                        {item.tags.map((tag, index) => {
                            const tagColor = getTagColor(tag)
                            return (
                                <span
                                    key={index}
                                    style={{
                                        ...styles.tagLabel,
                                        backgroundColor: tagColor,
                                        color: getTagTextColor(tagColor)
                                    }}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                )}
                <Button
                    onClick={handleDelete}
                    style={{ ...styles.button, ...styles.deleteButton, textDecoration: 'none' }}
                    aria-label="Delete item"
                    variant="link"
                >
                    🗑️
                </Button>
            </div>
        </ListGroup.Item>
    )
}


