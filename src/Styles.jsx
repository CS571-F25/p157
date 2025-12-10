// src/Styles.jsx

// Theme colors
const themeColors = {
  dark: {
    background: '#242424',
    text: 'rgba(255, 255, 255, 0.87)',
    sidebarBg: '#212529',
    sidebarText: 'white',
    itemBg: '#343a40',
    itemBorder: '#495057',
    separator: 'rgba(255, 255, 255, 0.3)',
    buttonBg: '#212529',
    buttonText: 'white',
    navLinkInactive: 'rgba(255, 255, 255, 0.55)'
  },
  light: {
    background: '#ffffff',
    text: '#213547',
    sidebarBg: '#f8f9fa',
    sidebarText: '#212529',
    itemBg: '#ffffff',
    itemBorder: '#dee2e6',
    separator: 'rgba(0, 0, 0, 0.3)',
    buttonBg: '#f8f9fa',
    buttonText: '#212529',
    navLinkInactive: 'rgba(33, 37, 41, 0.55)'
  }
}

// App.jsx styles
export const getAppStyles = (isDarkMode, sidebarVisible) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    hamburgerButton: {
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 1001,
      backgroundColor: colors.buttonBg,
      border: 'none',
      color: colors.buttonText,
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '1.5rem'
    },
    appContainer: {
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    },
    sidebarWrapper: {
      width: sidebarVisible ? '15%' : '0%',
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      flexShrink: 0
    },
    mainContainer: {
      flex: 1,
      padding: '20px',
      width: '100%',
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh'
    }
  }
}

// Navbar.jsx styles
export const getNavbarStyles = (isDarkMode) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    sidebar: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: colors.sidebarBg,
      padding: '20px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    title: {
      color: colors.sidebarText,
      marginBottom: '30px',
      marginTop: '50px'
    },
    titleLink: {
      color: colors.sidebarText,
      textDecoration: 'none'
    },
    nav: {
      flex: 1
    },
    getNavLink: (isActive, isDarkMode) => ({
      color: isActive
        ? (isDarkMode ? 'white' : '#212529')
        : (isDarkMode ? 'rgba(255, 255, 255, 0.55)' : 'rgba(33, 37, 41, 0.55)'),
      padding: '10px 0',
      fontSize: '1.1rem'
    }),
    themeToggleButton: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.sidebarText,
      cursor: 'pointer',
      fontSize: '1.5rem',
      padding: '5px'
    }
  }
}

// InventoryItem.jsx styles
export const getInventoryItemStyles = (isDarkMode) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    listItem: {
      backgroundColor: colors.itemBg,
      color: colors.text,
      borderColor: colors.itemBorder,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    controlsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.text,
      cursor: 'pointer',
      fontSize: '1.2rem',
      padding: '0 5px',
      lineHeight: '1'
    },
    quantity: {
      margin: '0 5px'
    },
    separator: {
      width: '1px',
      height: '20px',
      backgroundColor: colors.separator,
      margin: '0 10px'
    }
  }
}

// Inventory.jsx and ShoppingList.jsx shared styles
export const getPageStyles = (isDarkMode) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    container: {
      color: colors.text
    },
    heading: {
      color: colors.text
    },
    quantityInput: {
      width: '80px'
    },
    relevancyLabel: {
      color: colors.text,
      fontSize: '0.875rem',
      opacity: 0.7,
      marginTop: '-0.5rem',
      marginBottom: '1rem'
    },
    addButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s'
    },
    addButtonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
      opacity: 0.6
    },
    addButtonHover: {
      backgroundColor: '#bb2d3b'
    }
  }
}

// ShoppingList.jsx specific styles
export const getShoppingListStyles = (isDarkMode) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    listItem: {
      backgroundColor: colors.itemBg,
      color: colors.text,
      borderColor: colors.itemBorder
    }
  }
}

// AboutMe.jsx styles
export const getAboutMeStyles = (isDarkMode) => {
  const colors = isDarkMode ? themeColors.dark : themeColors.light
  return {
    container: {
      color: colors.text
    }
  }
}

