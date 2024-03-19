// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { utilService } from "../services/util.service";

import { emailService } from "../services/email.service";

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
    const [searchParams,setSearchParams] = useSearchParams()

    function onPreviewClick() {
        if (!email.isRead){
            const newEmail = { ...email, isRead: true }
            onUpdateEmail(newEmail)
        }
        const folder = params.folderId
        if (folder === 'draft'){
            emailService.updateSearchParamsComposeWithId(email.id,searchParams,setSearchParams)
        }
        else{
            navigate(`/${folder}/${email.id}`)            
        }
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
    const onToggleStar = ()=>{
        onUpdateEmail({...email,isStarred: !email.isStarred})
    }

    const onToggleRead = ()=>{
        onUpdateEmail({...email,isRead: !(email.isRead)})
    }
    const emailClass = `email-preview ${email.isRead ? 'email-read' : 'email-notread'}`;

    return (

        <article className={emailClass} onClick={onPreviewClick}>
            <CheckBoxOutlineBlankOutlinedIcon/>
            <EmailStarred
                isStarred={email.isStarred}
                onToggleStar={onToggleStar}
            />
            {(email.from === emailService.getLoggedInUser().email) ?
                (
                    <div className="email-to">{`to:${email.to}`}</div>
                ) : (
                    <div className="email-from">{email.from}</div>

                )    
            }
            <div className="email-subject">{email.subject}</div>
            <div className="email-body">{email.body}</div>
            <div className="email-button email-archive-button"><ArchiveOutlinedIcon /></div>
            <div onClick={deleteEmailClick}
                className="email-button email-delete-button"><DeleteOutlineIcon /></div>
            <EmailRead buttonType="email-button"
                isRead={email.isRead}
                onToggleRead={onToggleRead}
            />
            <div className="email-sent-date">{utilService.formatDate(email.sentAt)}</div>
        </article>
    )
}
