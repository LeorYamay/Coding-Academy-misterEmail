// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

import { utilService } from "../services/util.service";

import { EmailStarred } from "./EmailStarred";
import { EmailRead } from "./EmailRead";
import "../assets/css/cmps/EmailPreview.css"

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';


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
            debugger
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
            <div className="email-button email-archive-button"><ArchiveOutlinedIcon /></div>
            <div onClick={deleteEmailClick}
                className="email-button email-delete-button"><DeleteOutlineIcon /></div>
            <EmailRead className="email-button"
                email={email}
                onUpdateEmail={onUpdateEmail}
            />
            <div className="email-sent-date">{utilService.formatDate(email.sentAt)}</div>
        </article>
    )
}
