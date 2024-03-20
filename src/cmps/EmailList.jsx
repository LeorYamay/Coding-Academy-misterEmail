import { EmailPreview } from "./EmailPreview";
import { EmailListNavBar } from "./EmailListNavBar";
import { useEffect, useState } from "react";


export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
    const [selectedEmails,setSelectedEmails] = useState([])
    const onSelectEmail = (emailId) =>{
        if (selectedEmails.some(email=>email.id===emailId))
        {
            setSelectedEmails(selectedEmails.filter(id => id !== emailId))
            return 'empty'
        }
        else
        {
            setSelectedEmails([...selectedEmails, emailId])
            return 'checked'
        }
        
    }
    const onSelectEmails =() =>{
        const isSelected = selectedEmails.length >0
        if (isSelected){
            setSelectedEmails([])
            return 'empty'
        }
        else
        {
            setSelectedEmails(emails.map(email => email.id))
            return 'checked'
        }
    }
    const mapSelectToText = (emailId) => {
        if (selectedEmails.some(email=>email.id===emailId)){
            return 'checked'
        }
        else{
            return 'empty'
        }
    }
    return (
        <div>
            <EmailListNavBar
                emails={emails}
                onUpdateEmail={onUpdateEmail}
                onRemoveEmail={onRemoveEmail}
                onSelectEmails={onSelectEmails}
            />
        <ul className="email-list">
            {
                emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview
                            email={email}
                            onUpdateEmail={onUpdateEmail}
                            onRemoveEmail={onRemoveEmail}
                            onSelectEmail={onSelectEmail}
                            // isSelected={mapSelectToText(email.id)}
                        />
                    </li>)
            }
        </ul>


        </div>
    )
}