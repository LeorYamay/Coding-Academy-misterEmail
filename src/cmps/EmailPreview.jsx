// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { utilService } from "../services/util.service";

import { emailService } from "../services/email.service";

import { EmailStarred } from "./EmailStarred";
import { EmailRead } from "./EmailRead";
import { CheckBox } from "./CheckBox";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';


export function EmailPreview({ email, onUpdateEmail, onRemoveEmail ,onSelectEmail, isSelected }) {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams,setSearchParams] = useSearchParams()

    function onPreviewClick() {
        if (!email.isRead){
            onToggleRead()
        }
        const folder = params.folderId
        if (folder === 'draft'){
            emailService.updateSearchParamsComposeWithId(email.id,searchParams,setSearchParams)
        }
        else{
            navigate(`/${folder}/${email.id}`)            
        }
    }

    function deleteEmailClick(event) {
        event.stopPropagation()
        if (email.removedAt) {
            onRemoveEmail(email.id)
        }
        else {
            onUpdateEmail({ ...email, removedAt: Date.now() })
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
            <CheckBox
                onToggle = {() => onSelectEmail(email.id)}
                isSelected = {isSelected}
                buttonType={"email-button"}
            />
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
