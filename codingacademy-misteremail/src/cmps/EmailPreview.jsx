import { Link } from "react-router-dom";
import { EmailStarred } from "./EmailStarred";
import "../assets/css/cmps/EmailPreview.css"

export function EmailPreview({email}){
    return <article className={`email-preview ${email.isRead ? 'email-read' : 'email-notread'}`}>
        {/* <Link to={`/email/${email.id}`}> */}
           <EmailStarred isStarred ={email.isStarred}/>
           <div className="email-from">{email.from}</div>
           <div className="email-subject">{email.subject}</div>
           <div className="email-body">{email.body}</div>
        {/* </Link> */}
    </article>
}
