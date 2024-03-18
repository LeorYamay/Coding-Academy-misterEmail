import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";


import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export function NavBar() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleComposeClick = () => {
        setSearchParams({ compose: 'new' });
    };
    return (
        <nav className="nav-bar">
            <div className="nav-bar-logo-toggle">
                <div className="hamburger-button"><MenuOutlinedIcon /></div>
                <div className="gmail-logo"><img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" /></div>
            </div>
            <div className="compose-button" onClick={handleComposeClick}><CreateOutlinedIcon />Compose</div>
            <div className="inbox-button" onClick={()=>(navigate('/inbox'))}><InboxIcon />Inbox</div>
            <div className="starred-side-button" onClick={()=>(navigate('/starred'))}><StarOutlineOutlinedIcon />Starred</div>
            <div className="sent-button" onClick={()=>(navigate('/sent'))}><SendOutlinedIcon />Sent</div>
            <div className="draft-button" onClick={()=>(navigate('/draft'))}><InsertDriveFileOutlinedIcon />Draft</div>
            <div className="trash-side-button" onClick={()=>(navigate('/trash'))}><DeleteOutlineIcon />Trash</div>
        </nav>

    )
}