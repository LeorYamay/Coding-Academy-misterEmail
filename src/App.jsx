import { Outlet, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'


import { EmailIndex } from './pages/EmailIndex.jsx'
import { EmailList } from './cmps/EmailList.jsx'
import { EmailDetails } from './pages/EmailDetails.jsx'


export function App() {

  return (
    <Router>
      <section className='main-app'>
        <main className='container'>
          <Routes>
            <Route path="/" element={<EmailIndex />}/>
            <Route path="/:emailId" element={<EmailDetails />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}


// export default App