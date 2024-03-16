import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailPreview } from "../cmps/EmailPreview.jsx"





export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        setFilterBy(emailService.getFilterFromParams(searchParams))
    }, [searchParams])

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

    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <EmailList
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmailAndFilter}
                />
        </section>
    )
}