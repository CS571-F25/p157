import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router'

export default function NavigationBar({ isDarkMode, toggleTheme }) {
    const location = useLocation()
    
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div 
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: isDarkMode ? '#212529' : '#f8f9fa',
                padding: '20px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            <h4 style={{ color: isDarkMode ? 'white' : '#212529', marginBottom: '30px', marginTop: '50px' }}>
                <Link to="/" style={{ color: isDarkMode ? 'white' : '#212529', textDecoration: 'none' }}>
                    Inventory Manager
                </Link>
            </h4>
            <Nav className="flex-column" style={{ flex: 1 }}>
                <Nav.Link 
                    as={Link} 
                    to="/" 
                    style={{ 
                        color: isActive('/') 
                            ? (isDarkMode ? 'white' : '#212529') 
                            : (isDarkMode ? 'rgba(255, 255, 255, 0.55)' : 'rgba(33, 37, 41, 0.55)'),
                        padding: '10px 0',
                        fontSize: '1.1rem'
                    }}
                >
                    Inventory
                </Nav.Link>
                <Nav.Link 
                    as={Link} 
                    to="/shopping-list"
                    style={{ 
                        color: isActive('/shopping-list') 
                            ? (isDarkMode ? 'white' : '#212529') 
                            : (isDarkMode ? 'rgba(255, 255, 255, 0.55)' : 'rgba(33, 37, 41, 0.55)'),
                        padding: '10px 0',
                        fontSize: '1.1rem'
                    }}
                >
                    Shopping List
                </Nav.Link>
                <Nav.Link 
                    as={Link} 
                    to="/about"
                    style={{ 
                        color: isActive('/about') 
                            ? (isDarkMode ? 'white' : '#212529') 
                            : (isDarkMode ? 'rgba(255, 255, 255, 0.55)' : 'rgba(33, 37, 41, 0.55)'),
                        padding: '10px 0',
                        fontSize: '1.1rem'
                    }}
                >
                    About
                </Nav.Link>
            </Nav>
            <button
                onClick={toggleTheme}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: isDarkMode ? 'white' : '#212529',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    padding: '5px'
                }}
                aria-label="Toggle theme"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
        </div>
    )
}

