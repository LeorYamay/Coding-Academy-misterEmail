import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export function SideBar()
{
    // const navigate = useNavigate()
    return <nav className="side-bar">
        <div className="hamburger-button">Hamburger</div>
        <div className="gmail-logo">Gmail</div>
        <div className="compose-button">Compose</div>
        <div className="inbox-button">Inbox</div>
        <div className="starred-side-button">Starred</div>
        <div className="sent-button">Sent</div>
        <div className="draft-button">Draft</div>
        <div className="trash-side-button">Trash</div>
        </nav> 
}