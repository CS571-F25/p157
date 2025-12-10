import { ListGroup } from 'react-bootstrap'
import { getInventoryItemStyles } from '../Styles'

export default function InventoryItem({ item, isDarkMode, onDelete, onIncrement, onDecrement, onClick }) {
    const styles = getInventoryItemStyles(isDarkMode)

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
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onIncrement()
                    }}
                    style={styles.button}
                    aria-label="Increment quantity"
                >
                    +
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDecrement()
                    }}
                    style={styles.button}
                    aria-label="Decrement quantity"
                >
                    −
                </button>
                <div style={styles.separator} />
                <span>{item.name}</span>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                }}
                style={styles.button}
                aria-label="Delete item"
            >
                🗑️
            </button>
        </ListGroup.Item>
    )
}


