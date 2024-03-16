import { useState } from 'react'
import { Outlet, Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'


import { EmailIndex } from './pages/EmailIndex.jsx'
import { EmailDetails } from './pages/EmailDetails.jsx'

import { EmailList } from './cmps/EmailList.jsx'
import { SearchBar } from './cmps/SearchBar.jsx'
import { NavBar } from "./cmps/NavBar.jsx"



export function App() {

  return (
    <Router>
      <section className='main-app'>
        <SearchBar/>
        <NavBar/>
        <main className='container'>
          <Routes>
          <Route path="/" element={<Navigate to="/inbox" />} />
            <Route path="/:folderId" element={<EmailIndex />}/>
            <Route path="/:folderId/:emailId" element={<EmailDetails />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}


// export default App