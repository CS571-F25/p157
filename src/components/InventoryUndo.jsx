import { Alert, Button } from 'react-bootstrap'
import { getInventoryUndoStyles } from '../Styles'

export default function InventoryUndo({ itemName, isDarkMode, onUndo, onDismiss }) {
    const styles = getInventoryUndoStyles(isDarkMode)

    return (
        <Alert 
            variant="danger" 
            style={styles.alert}
            className="d-flex justify-content-between align-items-center"
        >
            <span>Removed item {itemName}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    variant="outline-secondary"
                    onClick={onDismiss}
                    style={styles.dismissButton}
                >
                    Dismiss
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={onUndo}
                    style={styles.undoButton}
                >
                    Undo
                </Button>
            </div>
        </Alert>
    )
}

