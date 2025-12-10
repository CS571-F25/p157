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
                <span style={{ margin: '0 5px' }}>{item.quantity}</span>
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
                <div 
                    style={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                        margin: '0 10px'
                    }}
                />
                <span>{item.name}</span>
            </div>
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
        </ListGroup.Item>
    )
}


