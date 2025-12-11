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

// Calculate relative luminance of a color (0-1, where 1 is brightest)
const getLuminance = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '')
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255
    
    // Apply gamma correction
    const [rLinear, gLinear, bLinear] = [r, g, b].map(val => {
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    
    // Calculate relative luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

// Get appropriate text color (black or white) based on background color
export const getTagTextColor = (backgroundColor) => {
    const luminance = getLuminance(backgroundColor)
    // Use black text for light colors (luminance > 0.3), white for dark colors
    return luminance > 0.3 ? '#000000' : '#ffffff'
}

