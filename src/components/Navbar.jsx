import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router'

export default function NavigationBar() {
    const location = useLocation()
    
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div 
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#212529',
                padding: '20px',
                flexShrink: 0
            }}
        >
            <h4 style={{ color: 'white', marginBottom: '30px', marginTop: '50px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    p157-project
                </Link>
            </h4>
            <Nav className="flex-column">
                <Nav.Link 
                    as={Link} 
                    to="/" 
                    style={{ 
                        color: isActive('/') ? 'white' : 'rgba(255, 255, 255, 0.55)',
                        padding: '10px 0',
                        fontSize: '1.1rem'
                    }}
                >
                    Home
                </Nav.Link>
                <Nav.Link 
                    as={Link} 
                    to="/about"
                    style={{ 
                        color: isActive('/about') ? 'white' : 'rgba(255, 255, 255, 0.55)',
                        padding: '10px 0',
                        fontSize: '1.1rem'
                    }}
                >
                    About Me
                </Nav.Link>
            </Nav>
        </div>
    )
}

