import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export function SideBar()
{
    // const navigate = useNavigate()
    return <nav className="side-bar">
        <div className="hamburger-button">Hamburger</div>
        <div className="gmail-logo">Gmail</div>
        <div className="compose-button"><CreateOutlinedIcon/>Compose</div>
        <div className="inbox-button"><InboxIcon/>Inbox</div>
        <div className="starred-side-button"><StarOutlineOutlinedIcon/>Starred</div>
        <div className="sent-button">Sent</div>
        <div className="draft-button">Draft</div>
        <div className="trash-side-button">Trash</div>
        </nav> 
}