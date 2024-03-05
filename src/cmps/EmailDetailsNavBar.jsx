import { Link } from "react-router-dom";


export function EmailDetailNavBar(){
   return <nav className="email-details-navbar">
        <Link to="/email">Back</Link>
        <div>Mark As UnRead</div>
        <div>Delete</div>
    </nav>
}