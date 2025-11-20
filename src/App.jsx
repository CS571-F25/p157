import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { Container } from 'react-bootstrap'
import './App.css'
import AboutMe from './components/AboutMe'
import Home from './components/Home'
import NavigationBar from './components/Navbar'

function App()
{
	const [sidebarVisible, setSidebarVisible] = useState(true)

	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible)
	}

	return <HashRouter>
		<button
			onClick={toggleSidebar}
			style={{
				position: 'fixed',
				top: '10px',
				left: '10px',
				zIndex: 1001,
				backgroundColor: '#212529',
				border: 'none',
				color: 'white',
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
				<NavigationBar />
			</div>
			<Container 
				fluid 
				style={{ 
					flex: 1,
					padding: '20px',
					width: '100%'
				}}
			>
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/about" element={<AboutMe></AboutMe>}></Route>
				</Routes>
			</Container>
		</div>
	</HashRouter>
}

export default App
