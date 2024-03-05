import { Outlet, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'


import { EmailIndex } from './pages/EmailIndex.jsx'
import { EmailDetails } from './pages/EmailDetails.jsx'
import { SideBar } from "./cmps/SideBar.jsx"

export function App() {

  return (
    <Router>
      <section className='main-app'>
        <SideBar />
        <main className='container'>
          <Routes>
            <Route path="/email" element={<EmailIndex />}/>
            <Route path="/email/:emailId" element={<EmailDetails />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}


// export default App