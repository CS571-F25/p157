// Tag configuration with colors
export const DEFAULT_TAG_COLORS = {
    'Food': '#ff6b6b',
    'Tools': '#4ecdc4',
    'Clothing': '#95e1d3'
}

export const DEFAULT_TAGS = ['Food', 'Tools', 'Clothing']

// Load custom tags from localStorage
export const loadCustomTags = () => {
    try {
        const stored = localStorage.getItem('customTags')
        return stored ? JSON.parse(stored) : {}
    } catch (error) {
        console.error('Error loading custom tags from localStorage:', error)
        return {}
    }
}

// Save custom tags to localStorage
export const saveCustomTags = (customTags) => {
    try {
        localStorage.setItem('customTags', JSON.stringify(customTags))
    } catch (error) {
        console.error('Error saving custom tags to localStorage:', error)
    }
}

// Get all tag colors (default + custom)
export const getAllTagColors = () => {
    const customTags = loadCustomTags()
    return { ...DEFAULT_TAG_COLORS, ...customTags }
}

// Get color for a specific tag
export const getTagColor = (tag) => {
    const allColors = getAllTagColors()
    return allColors[tag] || '#95a5a6' // Default gray color for unknown tags
}

// Get all tags (default + custom)
export const getAllTags = () => {
    const customTags = loadCustomTags()
    const customTagNames = Object.keys(customTags)
    return [...DEFAULT_TAGS, ...customTagNames].sort()
}

