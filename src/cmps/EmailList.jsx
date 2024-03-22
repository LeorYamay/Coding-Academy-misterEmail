import { EmailPreview } from "./EmailPreview"
import { EmailListNavBar } from "./EmailListNavBar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useEffectOnUpdate from "../hooks/useEffectOnUpdate"

import { showErrorMsg } from "../services/event-bus.service"

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
    const [selectedEmails, setSelectedEmails] = useState([])
    const params = useParams()

    useEffectOnUpdate(() => {
        setSelectedEmails([])
    }, [params.folderId])

    const onSelectEmail = (emailId) => {
        if (selectedEmails.indexOf(emailId) !== -1) {
            setSelectedEmails(selectedEmails.filter(id => id !== emailId))
        }
        else {
            setSelectedEmails([...selectedEmails, emailId])
        }

    }
    const onSelectEmails = () => {
        const isSelected = selectedEmails.length > 0

        if (isSelected) {
            setSelectedEmails([])
        }
        else {
            setSelectedEmails(emails.map(email => email.id))
        }
    }

    const mapSelectToText = (emailId) => {
        if (selectedEmails.indexOf(emailId) !== -1) {
            return 'checked'
        }
        else {
            return 'empty'
        }
    }

    const mapEmailsSelectedToText = () => {
        return selectedEmails.length === 0 ? 'empty' :
            selectedEmails.length === emails.length ? 'checked' :
                'partial';
    }

    const areRead = () => {
        return emails.some(email => !email.isRead && selectedEmails.indexOf(email.id) !== -1)
    }

    const onUpdateEmails = async (prop) => {
        try {
            for (const emailSelected of selectedEmails) {
                const updatedEmail = { ...emails.find(email => email.id === emailSelected), ...prop }
                await onUpdateEmail(updatedEmail)
            }
        } catch (err) {
            console.log('Error in onUpdateEmails', err)
            showErrorMsg('Error in onUpdateEmails', err)
        }
        setSelectedEmails([])
    }

    const onRemoveEmails = async () => {
        try {
            for (const emailSelected of selectedEmails) {
                const fullEmail = emails.find(email => email.id === emailSelected)
                if (fullEmail.removedAt) {
                    await onRemoveEmail(emailSelected)
                } else {
                    await onUpdateEmail({ ...fullEmail, removedAt: Date.now() })
                }
            }
        } catch (err) {
            console.log('Error in onRemoveEmails', err)
            showErrorMsg('Error in onRemoveEmails', err)
        }
        setSelectedEmails([])
    }

    return (
        <div>
            <EmailListNavBar
                selectedEmails={selectedEmails}
                onUpdateEmails={onUpdateEmails}
                onRemoveEmails={onRemoveEmails}
                onSelectEmails={onSelectEmails}
                isSelected={mapEmailsSelectedToText()}
                areRead={areRead()}
            />
            <ul className="email-list">
                {
                    emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview
                                email={email}
                                onUpdateEmail={onUpdateEmail}
                                onRemoveEmail={onRemoveEmail}
                                onSelectEmail={onSelectEmail}
                                isSelected={mapSelectToText(email.id)}
                            />
                        </li>)
                }
            </ul>


        </div>
    )
}