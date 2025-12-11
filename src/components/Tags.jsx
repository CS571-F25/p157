import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, ListGroup, InputGroup, Button, Badge } from 'react-bootstrap'
import { getPageStyles } from '../Styles'
import { getAllTagColors, getTagColor, getTagTextColor, saveCustomTags, loadCustomTags, DEFAULT_TAGS, DEFAULT_TAG_COLORS } from '../utils/tags'

export default function Tags({ isDarkMode }) {
    const [tags, setTags] = useState({})
    const [newTagName, setNewTagName] = useState('')
    const [newTagColor, setNewTagColor] = useState('#95a5a6')
    const [isAddButtonHovered, setIsAddButtonHovered] = useState(false)
    const nameInputRef = useRef(null)

    const styles = getPageStyles(isDarkMode)

    // Load tags on mount
    useEffect(() => {
        const allTags = getAllTagColors()
        setTags(allTags)
    }, [])

    const handleAddTag = () => {
        if (newTagName.trim() !== '' && !tags[newTagName.trim()]) {
            const tagName = newTagName.trim()
            const updatedTags = {
                ...tags,
                [tagName]: newTagColor
            }
            setTags(updatedTags)
            
            // Save only custom tags (exclude default tags)
            const customTags = { ...loadCustomTags() }
            customTags[tagName] = newTagColor
            saveCustomTags(customTags)
            
            setNewTagName('')
            setNewTagColor('#95a5a6')
            nameInputRef.current?.focus()
        }
    }

    const handleDeleteTag = (tagName) => {
        // Don't allow deleting default tags
        if (DEFAULT_TAGS.includes(tagName)) {
            return
        }
        
        const updatedTags = { ...tags }
        delete updatedTags[tagName]
        setTags(updatedTags)
        
        // Update localStorage
        const customTags = { ...loadCustomTags() }
        delete customTags[tagName]
        saveCustomTags(customTags)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newTagName.trim() !== '') {
            handleAddTag()
        }
    }

    // Separate default and custom tags
    const defaultTags = DEFAULT_TAGS.map(tag => ({
        name: tag,
        color: getTagColor(tag),
        isDefault: true
    }))

    const customTags = Object.keys(tags)
        .filter(tag => !DEFAULT_TAGS.includes(tag))
        .map(tag => ({
            name: tag,
            color: getTagColor(tag),
            isDefault: false
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    const allTagsList = [...defaultTags, ...customTags]

    return (
        <Container className="mt-5" style={styles.container}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4" style={styles.heading}>Tags</h1>
                    <Form.Group className="mb-3">
                        <InputGroup>
                            <Form.Control
                                ref={nameInputRef}
                                type="text"
                                placeholder="Tag name"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                onKeyDown={handleKeyPress}
                                style={styles.nameInput}
                                aria-label="Tag name"
                            />
                            <Form.Control
                                type="color"
                                value={newTagColor}
                                onChange={(e) => setNewTagColor(e.target.value)}
                                style={{ width: '80px', flexShrink: 0 }}
                                aria-label="Tag color"
                            />
                            <Button
                                onClick={handleAddTag}
                                disabled={newTagName.trim() === '' || tags[newTagName.trim()]}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newTagName.trim() !== '') {
                                        handleAddTag()
                                    }
                                }}
                                onMouseEnter={() => !(newTagName.trim() === '' || tags[newTagName.trim()]) && setIsAddButtonHovered(true)}
                                onMouseLeave={() => setIsAddButtonHovered(false)}
                                style={{
                                    ...styles.addButton,
                                    ...(newTagName.trim() === '' || tags[newTagName.trim()] ? styles.addButtonDisabled : {}),
                                    ...(isAddButtonHovered && newTagName.trim() !== '' && !tags[newTagName.trim()] ? styles.addButtonHover : {}),
                                    textDecoration: 'none'
                                }}
                                aria-label="Add tag"
                                variant="danger"
                            >
                                Add
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    {allTagsList.length > 0 && (
                        <ListGroup>
                            {allTagsList.map((tag) => (
                                <ListGroup.Item
                                    key={tag.name}
                                    style={{
                                        ...styles.listItem,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderLeft: `4px solid ${tag.color}`
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Badge
                                            bg=""
                                            style={{
                                                backgroundColor: tag.color,
                                                color: getTagTextColor(tag.color),
                                                padding: '5px 10px',
                                                fontSize: '0.875rem',
                                                border: 'none'
                                            }}
                                        >
                                            {tag.name}
                                        </Badge>
                                        {tag.isDefault && (
                                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                                                (Default)
                                            </span>
                                        )}
                                    </div>
                                    {!tag.isDefault && (
                                        <Button
                                            onClick={() => handleDeleteTag(tag.name)}
                                            style={{ ...styles.button, textDecoration: 'none' }}
                                            aria-label="Delete tag"
                                            variant="link"
                                        >
                                            🗑️
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

