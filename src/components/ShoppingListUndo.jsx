import { Alert, Button } from 'react-bootstrap'
import { getShoppingListUndoStyles } from '../Styles'

export default function ShoppingListUndo({ itemName, isDarkMode, onUndo, onDismiss }) {
    const styles = getShoppingListUndoStyles(isDarkMode)

    return (
        <Alert 
            variant="success" 
            style={styles.alert}
            className="d-flex justify-content-between align-items-center"
        >
            <span>Restocked item {itemName}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    variant="outline-secondary"
                    onClick={onDismiss}
                    style={styles.dismissButton}
                >
                    Dismiss
                </Button>
                <Button
                    variant="success"
                    onClick={onUndo}
                    style={styles.undoButton}
                >
                    Undo
                </Button>
            </div>
        </Alert>
    )
}

