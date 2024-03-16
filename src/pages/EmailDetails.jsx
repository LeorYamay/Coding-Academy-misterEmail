import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { emailService } from "../services/email.service";

import { EmailDetailNavBar } from "../cmps/EmailDetailsNavBar";

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()

    }, [params.emailId])

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmail(updatedEmail)
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
        }
    }

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (err) {
            const folder = `/${params.folderId}`
            navigate(folder)
            console.log('Error in loadEmail', err)
        }
    }
    if (!email) return <div>Loading...</div>
    console.log(params)
    return (
        <section className="email-details">
            <EmailDetailNavBar
                email = {email}
                onUpdateEmail ={onUpdateEmail}
            />
           <div className="email-details-subject">{email.subject}</div>
            <div className="email-details-from">{email.from}</div>
            <div className="email-details-to">{`to ${email.to}`}</div>
            <div className="email-details-sentAt">{email.sentAt}</div>
           <div className="email-details-body">{email.body}</div>
           <div>{email.removedAt}</div>
        </section>
    )
}