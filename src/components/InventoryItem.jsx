import { ListGroup, Button } from 'react-bootstrap'
import { getInventoryItemStyles } from '../Styles'

export default function InventoryItem({ item, isDarkMode, onDelete, onIncrement, onDecrement, onClick }) {
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

    return (
        <ListGroup.Item 
            style={{ ...styles.listItem, cursor: 'pointer' }}
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
            <Button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                }}
                style={{ ...styles.button, textDecoration: 'none' }}
                aria-label="Delete item"
                variant="link"
            >
                🗑️
            </Button>
        </ListGroup.Item>
    )
}


