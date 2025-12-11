import { Nav, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router'
import { getNavbarStyles } from '../Styles'

export default function NavigationBar({ isDarkMode, toggleTheme }) {
    const location = useLocation()
    
    const isActive = (path) => {
        return location.pathname === path
    }

    const styles = getNavbarStyles(isDarkMode)

    return (
        <div style={styles.sidebar}>
            <h4 style={styles.title}>
                <Link to="/" style={styles.titleLink}>
                    Inventory Manager
                </Link>
            </h4>
            <Nav className="flex-column" style={styles.nav}>
                <Nav.Link 
                    as={Link} 
                    to="/" 
                    style={styles.getNavLink(isActive('/'), isDarkMode)}
                >
                    Inventory
                </Nav.Link>
                <Nav.Link 
                    as={Link} 
                    to="/shopping-list"
                    style={styles.getNavLink(isActive('/shopping-list'), isDarkMode)}
                >
                    Shopping List
                </Nav.Link>
                <Nav.Link 
                    as={Link} 
                    to="/about"
                    style={styles.getNavLink(isActive('/about'), isDarkMode)}
                >
                    About
                </Nav.Link>
            </Nav>
            <Button
                onClick={toggleTheme}
                style={{ ...styles.themeToggleButton, textDecoration: 'none' }}
                aria-label="Toggle theme"
                variant="link"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </Button>
        </div>
    )
}

