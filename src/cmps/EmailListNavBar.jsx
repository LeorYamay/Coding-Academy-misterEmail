
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

export function EmailListNavBar({ selectedEmails, onUpdateEmails, onRemoveEmails, onSelectEmails, isSelected, areRead }) {
    const params = useParams()

    const folder = `/${params.folderId}`

    const onToggleRead = () => {
        onUpdateEmails({ isRead: areRead })
    }

    return (
        <nav className="email-details-navbar">
            <CheckBox
                onToggle={onSelectEmails}
                isSelected={isSelected}
                buttonType={"email-details-navbar-item"}
            />
            {isSelected != 'empty' && (
                <div className="navbar-items">
                    <div className="email-details-navbar-item">
                        <ArchiveOutlinedIcon />
                    </div>
                    <div className="email-details-navbar-item">
                        <ReportIcon />
                    </div>
                    <div className="email-details-navbar-item" onClick={onRemoveEmails}><DeleteOutlineIcon /></div>
                    <EmailRead
                        isRead={areRead}
                        onToggleRead={onToggleRead}
                        buttonType={"email-details-navbar-item"}
                    />
                </div>
            )}
        </nav>
    )
}