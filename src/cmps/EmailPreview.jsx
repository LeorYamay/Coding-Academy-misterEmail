// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

import { utilService } from "../services/util.service";

import { EmailStarred } from "./EmailStarred";
import { EmailRead } from "./EmailRead";
import "../assets/css/cmps/EmailPreview.css";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';


export function EmailPreview({ email, onUpdateEmail, onRemoveEmail }) {
    const navigate = useNavigate()
    const params = useParams()

    function onPreviewClick() {
        if (!email.isRead){
            const newEmail = { ...email, isRead: true }
            onUpdateEmail(newEmail)
        }
        const currentPathname = location.pathname
        navigate(`/${params.folderId}/${email.id}`)
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

    const emailClass = `email-preview ${email.isRead ? 'email-read' : 'email-notread'}`;

    return (

        <article className={emailClass} onClick={onPreviewClick}>
            <CheckBoxOutlineBlankOutlinedIcon/>
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
