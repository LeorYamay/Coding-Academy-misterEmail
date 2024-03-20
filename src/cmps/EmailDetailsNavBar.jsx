
import { Link, useParams } from "react-router-dom";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

import { EmailRead } from "./EmailRead";

export function EmailDetailNavBar({email,onUpdateEmail,onRemoveEmail,}) {
    const params = useParams()
    const folder = `/${params.folderId}`

    const onToggleRead = ()=>{        
        onUpdateEmail({...email,isRead: !email.isRead})
    }

    return <nav className="email-details-navbar">
        <Link to={folder}><ArrowBackIcon /></Link>
        <ArchiveOutlinedIcon/>
        <ReportIcon/>
        <div onClick={onRemoveEmail}><DeleteOutlineIcon /></div>
        |
        <EmailRead
            isRead={email.isRead}
            onToggleRead ={onToggleRead}
        />
    </nav>
}