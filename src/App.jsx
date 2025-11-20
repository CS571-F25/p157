import { useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { Container } from 'react-bootstrap'
import './App.css'
import AboutMe from './components/AboutMe'
import Home from './components/Home'
import ShoppingList from './components/ShoppingList'
import NavigationBar from './components/Navbar'
import { InventoryContext } from './contexts/InventoryContext'

function App()
{
	const [sidebarVisible, setSidebarVisible] = useState(true)
	const [isDarkMode, setIsDarkMode] = useState(true)
	const [items, setItems] = useState([])

	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible)
	}

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	const addItem = (itemName, quantity) => {
		const quantityNum = parseInt(quantity) || 1
		setItems(prevItems => {
			const existingItemIndex = prevItems.findIndex(item => item.name === itemName)
			
			if (existingItemIndex !== -1) {
				// Item exists, update its quantity
				const updatedItems = [...prevItems]
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity: updatedItems[existingItemIndex].quantity + quantityNum
				}
				return updatedItems
			} else {
				// Item doesn't exist, add new item
				return [...prevItems, { name: itemName, quantity: quantityNum }]
			}
		})
	}

	const deleteItem = (itemName) => {
		setItems(prevItems => prevItems.filter(item => item.name !== itemName))
	}

	useEffect(() => {
		if (isDarkMode) {
			document.body.style.backgroundColor = '#242424'
			document.body.style.color = 'rgba(255, 255, 255, 0.87)'
		} else {
			document.body.style.backgroundColor = '#ffffff'
			document.body.style.color = '#213547'
		}
	}, [isDarkMode])

	return <HashRouter>
		<InventoryContext.Provider value={{ items, addItem, deleteItem }}>
			<button
				onClick={toggleSidebar}
				style={{
					position: 'fixed',
					top: '10px',
					left: '10px',
					zIndex: 1001,
					backgroundColor: isDarkMode ? '#212529' : '#f8f9fa',
					border: 'none',
					color: isDarkMode ? 'white' : '#212529',
					padding: '10px',
					cursor: 'pointer',
					borderRadius: '4px',
					fontSize: '1.5rem'
				}}
				aria-label="Toggle sidebar"
			>
				☰
			</button>
			<div style={{ display: 'flex', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
				<div style={{ width: sidebarVisible ? '15%' : '0%', transition: 'width 0.3s ease-in-out', overflow: 'hidden', flexShrink: 0 }}>
					<NavigationBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
				</div>
				<Container 
					fluid 
					style={{ 
						flex: 1,
						padding: '20px',
						width: '100%',
						backgroundColor: isDarkMode ? '#242424' : '#ffffff',
						color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547',
						minHeight: '100vh'
					}}
				>
					<Routes>
						<Route path="/" element={<Home isDarkMode={isDarkMode}></Home>}></Route>
						<Route path="/about" element={<AboutMe isDarkMode={isDarkMode}></AboutMe>}></Route>
						<Route path="/shopping-list" element={<ShoppingList isDarkMode={isDarkMode}></ShoppingList>}></Route>
					</Routes>
				</Container>
			</div>
		</InventoryContext.Provider>
	</HashRouter>
}

export default App
