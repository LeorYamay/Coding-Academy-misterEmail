
import { Link, useParams } from "react-router-dom";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

import { EmailRead } from "./EmailRead";

export function EmailDetailNavBar({email,onUpdateEmail,onRemoveEmail}) {
    const params = useParams()
    const folder = `/${params.folderId}`
    return <nav className="email-details-navbar">
        <Link to={folder}><ArrowBackIcon /></Link>
        <ArchiveOutlinedIcon/>
        <ReportIcon/>
        <div><DeleteOutlineIcon /></div>
        |
        <EmailRead
            email={email}
            onUpdateEmail ={onUpdateEmail}
        />
    </nav>
}