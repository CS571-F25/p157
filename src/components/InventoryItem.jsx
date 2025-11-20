import { ListGroup } from 'react-bootstrap'

export default function InventoryItem({ item, isDarkMode, onDelete, onIncrement, onDecrement }) {
    return (
        <ListGroup.Item 
            style={{
                backgroundColor: isDarkMode ? '#343a40' : '#ffffff',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
                borderColor: isDarkMode ? '#495057' : '#dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <span>{item.name} (Quantity: {item.quantity})</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button
                    onClick={onIncrement}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0 5px',
                        lineHeight: '1'
                    }}
                    aria-label="Increment quantity"
                >
                    +
                </button>
                <button
                    onClick={onDecrement}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0 5px',
                        lineHeight: '1'
                    }}
                    aria-label="Decrement quantity"
                >
                    −
                </button>
                <button
                    onClick={onDelete}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0 5px',
                        lineHeight: '1'
                    }}
                    aria-label="Delete item"
                >
                    🗑️
                </button>
            </div>
        </ListGroup.Item>
    )
}


