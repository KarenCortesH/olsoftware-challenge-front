import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Usuarios from './pages/Usuarios';
import DashboardContent from './pages/DashboardContent ';
// import Home from './pages/Home';



function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			{/* <Route path="/home" element={<Home />} /> */}
			<Route path="/dashboard" element={<DashboardContent />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/usuarios" element={<Usuarios />} />
		</Routes>
	);
}

export default App;
