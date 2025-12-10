import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getShoppingListItemStyles } from '../Styles'

export default function ShoppingListItem({ item, isDarkMode, onCheck }) {
    const [isChecked, setIsChecked] = useState(false)
    const styles = getShoppingListItemStyles(isDarkMode)

    const handleCheckboxClick = () => {
        if (!isChecked) {
            setIsChecked(true)
            onCheck()
        }
    }

    return (
        <ListGroup.Item style={styles.listItem}>
            <div style={styles.contentContainer}>
                {isChecked ? (
                    <span style={styles.checkmark}>✓</span>
                ) : (
                    <input
                        type="checkbox"
                        checked={false}
                        onChange={handleCheckboxClick}
                        style={styles.checkbox}
                        aria-label="Mark item as purchased"
                    />
                )}
                <span style={styles.itemName}>{item.name}</span>
            </div>
        </ListGroup.Item>
    )
}

