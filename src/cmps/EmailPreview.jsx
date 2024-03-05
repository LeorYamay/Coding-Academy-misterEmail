// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { EmailStarred } from "./EmailStarred";
import "../assets/css/cmps/EmailPreview.css"

export function EmailPreview({ email, onUpdateEmail, onRemoveEmail }) {
    const navigate = useNavigate()

    function onPreviewClick() {
        if (!email.isRead){
            const newEmail = { ...email, isRead: true }
            onUpdateEmail(newEmail)
        }
        navigate(`/email/${email.id}`)
    }

    function toggleReadClick(event) {
        event.stopPropagation()
        const newEmail = { ...email, isRead: !email.isRead }
        onUpdateEmail(newEmail)
    }

    function deleteEmailClick(event) {
        event.stopPropagation()
        if (email.removedAt) {
            onRemoveEmail(email.id)
        }
        else {
            const newEmail = { ...email, removedAt: Date.now() }
            onUpdateEmail(newEmail)
        }
    }

    return (

        <article className={`email-preview ${email.isRead ? 'email-read' : 'email-notread'}`} onClick={onPreviewClick}>
            <EmailStarred
                email={email}
                onUpdateEmail={onUpdateEmail}
            />
            <div className="email-from">{email.from}</div>
            <div className="email-subject">{email.subject}</div>
            <div className="email-body">{email.body}</div>
            <div className="email-button email-archive-button">Archive</div>
            <div onClick={deleteEmailClick}
             className="email-button email-delete-button">Delete</div>
            <div onClick={toggleReadClick}
             className={`email-button email-mark-read-status-button email-mark-${email.isRead ? "unread" : "read"}`}>{`Mark as ${email.isRead ? "unread" : "read"}`}</div>
            <div className="email-sent-date">{email.sentAt}</div>
        </article>
    )
}
