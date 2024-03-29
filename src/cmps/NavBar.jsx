import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";


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
    const [hamburger,setHamburger] = useState(false)

    const handleComposeClick = () => {
        setSearchParams({ compose: 'new' })
    }

    const hamburgerClick = () => {
        setHamburger(prevHamburger => (!prevHamburger))
    }
    const navItems = [
        { icon: <InboxIcon />, label: "Inbox", path: "/inbox" },
        { icon: <StarOutlineOutlinedIcon />, label: "Starred", path: "/starred" },
        { icon: <SendOutlinedIcon />, label: "Sent", path: "/sent" },
        { icon: <InsertDriveFileOutlinedIcon />, label: "Draft", path: "/draft" },
        { icon: <DeleteOutlineIcon />, label: "Trash", path: "/trash" }
    ]

    return (
        <nav className="nav-bar">
            <div className="nav-bar-logo-toggle">
                <div className="hamburger-button" onClick={hamburgerClick}><MenuOutlinedIcon /></div>
                <div className="gmail-logo"><img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" /></div>
            </div>
            <div className="compose-button" onClick={handleComposeClick}><CreateOutlinedIcon />Compose</div>
            {navItems.map(({ icon, label, path }) => (
                <NavLink key={path} to={path} className="nav-bar-button" >
                    {hamburger ? icon : (
                        <>
                            {icon}
                            <span>{label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>

    )
}