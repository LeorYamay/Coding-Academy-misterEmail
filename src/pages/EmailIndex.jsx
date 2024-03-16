import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { emailService } from "../services/email.service"

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailPreview } from "../cmps/EmailPreview.jsx"
import { NavBar } from "../cmps/NavBar.jsx"
import { SearchBar } from '../cmps/SearchBar.jsx'



export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams()
    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Error in loadEmails', err)
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log('Error in onRemoveEmail', err)
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails =>
                emailService.filter(prevEmails.map(currEmail => currEmail.id === updatedEmail.id ? updatedEmail : currEmail)), filterBy)
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
        }
    }
    const onUpdateEmailAndFilter = async (email) => {
        onUpdateEmail(email)
    }

    // console.log('emails' , emails)
    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <SearchBar 
                filterBy ={filterBy}    
                onSetFilter ={onSetFilter}
            />
            <NavBar
            onSetFilter ={onSetFilter}
            />
            <EmailList
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmailAndFilter}
                />
        </section>
    )
}