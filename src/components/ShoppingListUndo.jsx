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
            <Button
                variant="outline-success"
                onClick={onUndo}
                style={styles.undoButton}
            >
                Undo
            </Button>
        </Alert>
    )
}

