import { useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { Container, Button } from 'react-bootstrap'
import './App.css'
import AboutMe from './components/AboutMe'
import Inventory from './components/Inventory'
import ShoppingList from './components/ShoppingList'
import Tags from './components/Tags'
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
			const items = storedItems ? JSON.parse(storedItems) : []
			// Ensure all items have minDesiredStock (default to 1 if missing) and tags (default to empty array)
			return items.map(item => ({
				...item,
				minDesiredStock: item.minDesiredStock ?? 1,
				tags: item.tags || []
			}))
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

	const addItem = (itemName, quantity, minDesiredStock = 1, tags = []) => {
		const quantityNum = parseInt(quantity) || 1
		const minDesiredStockNum = parseInt(minDesiredStock) || 1
		const existingItemIndex = items.findIndex(item => item.name === itemName)
		
		let updatedItems
		if (existingItemIndex !== -1) {
			// Item exists, update its quantity
			updatedItems = [...items]
			updatedItems[existingItemIndex] = {
				...updatedItems[existingItemIndex],
				quantity: updatedItems[existingItemIndex].quantity + quantityNum,
				minDesiredStock: updatedItems[existingItemIndex].minDesiredStock ?? 1
			}
		} else {
			// Item doesn't exist, add new item
			updatedItems = [...items, { name: itemName, quantity: quantityNum, minDesiredStock: minDesiredStockNum, tags: tags || [] }]
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
				return { 
					...item, 
					quantity: item.quantity + 1,
					minDesiredStock: item.minDesiredStock ?? 1
				}
			}
			return item
		})
		updateItems(updatedItems)
	}

	const decrementQuantity = (itemName) => {
		const updatedItems = items.map(item => {
			if (item.name === itemName && item.quantity > 0) {
				return { 
					...item, 
					quantity: item.quantity - 1,
					minDesiredStock: item.minDesiredStock ?? 1
				}
			}
			return item
		})
		updateItems(updatedItems)
	}

	const updateItem = (oldName, newName, newQuantity, newMinDesiredStock = null) => {
		const updatedItems = items.map(item => {
			if (item.name === oldName) {
				const parsedQuantity = parseInt(newQuantity)
				return { 
					name: newName, 
					quantity: isNaN(parsedQuantity) ? 1 : parsedQuantity,
					minDesiredStock: newMinDesiredStock !== null ? (parseInt(newMinDesiredStock) || 1) : (item.minDesiredStock ?? 1),
					tags: item.tags || []
				}
			}
			return item
		})
		updateItems(updatedItems)
	}

	const setQuantityToMinDesiredStock = (itemName) => {
		const updatedItems = items.map(item => {
			if (item.name === itemName) {
				const minDesiredStock = item.minDesiredStock ?? 1
				return { 
					...item, 
					quantity: minDesiredStock
				}
			}
			return item
		})
		updateItems(updatedItems)
	}

	const restoreItem = (item) => {
		// Restore an item with its exact properties
		const updatedItems = [...items, item]
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
		<InventoryContext.Provider value={{ items, addItem, deleteItem, incrementQuantity, decrementQuantity, updateItem, setQuantityToMinDesiredStock, restoreItem }}>
			<Button
				onClick={toggleSidebar}
				style={{ ...styles.hamburgerButton, textDecoration: 'none' }}
				aria-label="Toggle sidebar"
				variant="outline-secondary"
			>
				☰
			</Button>
			<div style={styles.appContainer}>
				<div style={styles.sidebarWrapper}>
					<NavigationBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
				</div>
				<Container 
					fluid 
					style={styles.mainContainer}
				>
					<Routes>
						<Route path="/" element={<Inventory isDarkMode={isDarkMode}></Inventory>}></Route>
						<Route path="/about" element={<AboutMe isDarkMode={isDarkMode}></AboutMe>}></Route>
						<Route path="/shopping-list" element={<ShoppingList isDarkMode={isDarkMode}></ShoppingList>}></Route>
						<Route path="/tags" element={<Tags isDarkMode={isDarkMode}></Tags>}></Route>
					</Routes>
				</Container>
			</div>
		</InventoryContext.Provider>
	</HashRouter>
}

export default App
