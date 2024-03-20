
import { Link, useParams } from "react-router-dom";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import { EmailRead } from "./EmailRead";
import { CheckBox } from "./CheckBox";

export function EmailListNavBar({emails,onUpdateEmail,onRemoveEmail,onSelectEmails}) {
    const params = useParams()
    const folder = `/${params.folderId}`

    const isRead = emails.some(email=>!email.isRead)?false:true

    const onToggleRead = ()=>{        
        // onUpdateEmail({...email,isRead: !email.isRead})
    }

    return <nav className="email-details-navbar">
        <CheckBox
            onToggle ={onSelectEmails}
        />
        <ArchiveOutlinedIcon/>
        <ReportIcon/>
        {/* <div onClick={onRemoveEmail}><DeleteOutlineIcon /></div> */}
        |
        <EmailRead
            isRead={isRead}
            onToggleRead ={onToggleRead}
        />
    </nav>
}