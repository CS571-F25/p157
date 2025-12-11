import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getShoppingListItemStyles } from '../Styles'
import { getTagColor, getTagTextColor } from '../utils/tags'

export default function ShoppingListItem({ item, isDarkMode, onCheck }) {
    const [isChecked, setIsChecked] = useState(false)
    const [isFading, setIsFading] = useState(false)
    const styles = getShoppingListItemStyles(isDarkMode)

    const handleCheckboxClick = () => {
        if (!isChecked) {
            setIsChecked(true)
            setIsFading(true)
            // Wait for fade animation to complete before calling onCheck
            setTimeout(() => {
                onCheck()
            }, 500) // 500ms = half a second
        }
    }

    return (
        <ListGroup.Item style={{ ...styles.listItem, ...(isFading ? styles.fading : {}) }}>
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
                {item.tags && item.tags.length > 0 && (
                    <div style={styles.tagContainer}>
                        {item.tags.map((tag, index) => {
                            const tagColor = getTagColor(tag)
                            return (
                                <span
                                    key={index}
                                    style={{
                                        ...styles.tagLabel,
                                        backgroundColor: tagColor,
                                        color: getTagTextColor(tagColor)
                                    }}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                )}
            </div>
        </ListGroup.Item>
    )
}

