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
            <Card.Body style={styles.cardBody}>
                <Card.Title style={isLowStock ? { ...styles.cardTitle, ...styles.lowStockName } : styles.cardTitle}>
                    {item.name}
                </Card.Title>
                <div style={styles.cardFooter}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onIncrement()
                        }}
                        style={{ ...styles.button, ...styles.footerButton, textDecoration: 'none' }}
                        aria-label="Increment quantity"
                        variant="link"
                    >
                        +
                    </Button>
                    <span style={isLowStock ? { ...styles.quantity, ...styles.lowStockName, ...styles.footerButton } : { ...styles.quantity, ...styles.footerButton }}>
                        {item.quantity}
                    </span>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDecrement()
                        }}
                        style={{ ...styles.button, ...styles.footerButton, textDecoration: 'none' }}
                        aria-label="Decrement quantity"
                        variant="link"
                    >
                        −
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        style={{ ...styles.button, ...styles.footerButton, textDecoration: 'none' }}
                        aria-label="Delete item"
                        variant="link"
                    >
                        🗑️
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

