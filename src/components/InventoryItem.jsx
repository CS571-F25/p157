import { ListGroup } from 'react-bootstrap'
import { getInventoryItemStyles } from '../Styles'

export default function InventoryItem({ item, isDarkMode, onDelete, onIncrement, onDecrement }) {
    const styles = getInventoryItemStyles(isDarkMode)

    return (
        <ListGroup.Item style={styles.listItem}>
            <div style={styles.controlsContainer}>
                <button
                    onClick={onIncrement}
                    style={styles.button}
                    aria-label="Increment quantity"
                >
                    +
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                    onClick={onDecrement}
                    style={styles.button}
                    aria-label="Decrement quantity"
                >
                    −
                </button>
                <div style={styles.separator} />
                <span>{item.name}</span>
            </div>
            <button
                onClick={onDelete}
                style={styles.button}
                aria-label="Delete item"
            >
                🗑️
            </button>
        </ListGroup.Item>
    )
}


