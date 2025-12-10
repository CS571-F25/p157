import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { getPageStyles } from '../Styles'

export default function InventoryItemModal({ show, item, isDarkMode, updateItem, onHide }) {
    const [editName, setEditName] = useState('')
    const [editQuantity, setEditQuantity] = useState(1)
    const currentItemNameRef = useRef('')

    const styles = getPageStyles(isDarkMode)

    // Update local state when item changes
    useEffect(() => {
        if (item) {
            setEditName(item.name)
            setEditQuantity(item.quantity)
            currentItemNameRef.current = item.name
        }
    }, [item])

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && show) {
                onHide()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [show, onHide])

    const handleNameChange = (e) => {
        const newName = e.target.value
        setEditName(newName)
        if (currentItemNameRef.current && newName.trim() !== '') {
            const oldName = currentItemNameRef.current
            updateItem(oldName, newName.trim(), editQuantity)
            // Update the ref to the new name for future updates
            currentItemNameRef.current = newName.trim()
        }
    }

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 0
        setEditQuantity(newQuantity)
        if (currentItemNameRef.current) {
            // Use currentItemNameRef as both old and new name since we're only changing quantity
            updateItem(currentItemNameRef.current, currentItemNameRef.current, newQuantity)
        }
    }

    const handleSaveChanges = () => {
        if (currentItemNameRef.current && editName.trim() !== '') {
            updateItem(currentItemNameRef.current, editName.trim(), editQuantity)
            onHide()
        }
    }

    if (!item) return null

    return (
        <Modal 
            show={show} 
            onHide={onHide}
            style={styles.modal}
        >
            <Modal.Header closeButton style={styles.modalHeader}>
                <Modal.Title style={styles.modalTitle}>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.modalBody}>
                <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={editName}
                        onChange={handleNameChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSaveChanges()
                            }
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        value={editQuantity}
                        onChange={handleQuantityChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSaveChanges()
                            }
                        }}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer style={styles.modalFooter}>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSaveChanges}
                    disabled={editName.trim() === ''}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

