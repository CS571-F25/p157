import { Card, Button } from 'react-bootstrap'
import { getInventoryItemCardStyles } from '../Styles'

export default function InventoryItemCard({ item, isDarkMode, onDelete, onIncrement, onDecrement, onClick }) {
    const styles = getInventoryItemCardStyles(isDarkMode)
    const minDesiredStock = item.minDesiredStock ?? 1
    const isLowStock = item.quantity < minDesiredStock

    const handleCardClick = (e) => {
        // Don't trigger if clicking on buttons
        if (e.target.tagName === 'BUTTON') {
            return
        }
        onClick()
    }

    return (
        <Card 
            style={{ ...styles.card, cursor: 'pointer' }}
            onClick={handleCardClick}
        >
            <Card.Body>
                <div style={styles.cardHeader}>
                    <Card.Title style={isLowStock ? { ...styles.cardTitle, ...styles.lowStockName } : styles.cardTitle}>
                        {item.name}
                    </Card.Title>
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
                </div>
                <div style={styles.quantitySection}>
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
                        <span style={isLowStock ? { ...styles.quantity, ...styles.lowStockName } : styles.quantity}>
                            {item.quantity}
                        </span>
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
                    <div style={styles.minStockLabel}>
                        Min: {item.minDesiredStock ?? 1}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

