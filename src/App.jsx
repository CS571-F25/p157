import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import AboutMe from './components/AboutMe'
import Home from './components/Home'

function App()
{
	return <HashRouter>
		<Routes>
			<Route path="/" element={<Home></Home>}></Route>
			<Route path="/about" element={<AboutMe></AboutMe>}></Route>
		</Routes>
	</HashRouter>
}

export default App
