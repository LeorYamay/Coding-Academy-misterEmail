import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { EmailDetailNavBar } from "../cmps/EmailDetailsNavBar";
import { emailService } from "../services/email.service";

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()

    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (err) {
            navigate('/email')
            console.log('Error in loadEmail', err)
        }
    }
    if (!email) return <div>Loading...</div>
    
    return (
        <section className="email-details">
            <EmailDetailNavBar/>
           <div className="email-details-subject">{email.subject}</div>
            <div className="email-details-from">{email.from}</div>
            <div className="email-details-to">{`to ${email.to}`}</div>
            <div className="email-details-sentAt">{email.sentAt}</div>
           <div className="email-details-body">{email.body}</div>
           <div>{email.removedAt}</div>
        </section>
    )
}