import { useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { Container } from 'react-bootstrap'
import './App.css'
import AboutMe from './components/AboutMe'
import Home from './components/Home'
import ShoppingList from './components/ShoppingList'
import NavigationBar from './components/Navbar'
import { InventoryContext } from './contexts/InventoryContext'
import { getAppStyles } from './Styles'

function App()
{
	const [sidebarVisible, setSidebarVisible] = useState(true)
	const [isDarkMode, setIsDarkMode] = useState(true)
	
	// Load items from localStorage on initial mount
	const loadItemsFromStorage = () => {
		try {
			const storedItems = localStorage.getItem('inventory')
			return storedItems ? JSON.parse(storedItems) : []
		} catch (error) {
			console.error('Error loading items from localStorage:', error)
			return []
		}
	}

	const [items, setItems] = useState(loadItemsFromStorage)

	// Wrapper function to update both state and localStorage
	const updateItems = (newItems) => {
		setItems(newItems)
		try {
			localStorage.setItem('inventory', JSON.stringify(newItems))
		} catch (error) {
			console.error('Error saving items to localStorage:', error)
		}
	}

	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible)
	}

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	const addItem = (itemName, quantity) => {
		const quantityNum = parseInt(quantity) || 1
		const existingItemIndex = items.findIndex(item => item.name === itemName)
		
		let updatedItems
		if (existingItemIndex !== -1) {
			// Item exists, update its quantity
			updatedItems = [...items]
			updatedItems[existingItemIndex] = {
				...updatedItems[existingItemIndex],
				quantity: updatedItems[existingItemIndex].quantity + quantityNum
			}
		} else {
			// Item doesn't exist, add new item
			updatedItems = [...items, { name: itemName, quantity: quantityNum }]
		}
		updateItems(updatedItems)
	}

	const deleteItem = (itemName) => {
		const updatedItems = items.filter(item => item.name !== itemName)
		updateItems(updatedItems)
	}

	const incrementQuantity = (itemName) => {
		const updatedItems = items.map(item => {
			if (item.name === itemName) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})
		updateItems(updatedItems)
	}

	const decrementQuantity = (itemName) => {
		const updatedItems = items.map(item => {
			if (item.name === itemName && item.quantity > 0) {
				return { ...item, quantity: item.quantity - 1 }
			}
			return item
		})
		updateItems(updatedItems)
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

	const styles = getAppStyles(isDarkMode, sidebarVisible)

	return <HashRouter>
		<InventoryContext.Provider value={{ items, addItem, deleteItem, incrementQuantity, decrementQuantity }}>
			<button
				onClick={toggleSidebar}
				style={styles.hamburgerButton}
				aria-label="Toggle sidebar"
			>
				☰
			</button>
			<div style={styles.appContainer}>
				<div style={styles.sidebarWrapper}>
					<NavigationBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
				</div>
				<Container 
					fluid 
					style={styles.mainContainer}
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
