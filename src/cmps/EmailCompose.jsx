import { useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { useEffect, useState } from "react"

export function EmailCompose(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [email,setEmail] = useState()
    const [enlarge,setEnlarge] = useState(false)

    useEffect(()=>{
        const compose = searchParams.get('compose')
        if (compose){
            if (compose === 'new'){
                setEmail(emailService.createEmail({from: emailService.getLoggedInUser.email}))
            }
            else
            {
                try{
                    const email = emailService.getById(compose)
                    if (email.sentAt){
                        throw ('Email already sent and cannot be edited')
                    }
                    setEmail(email)
                }
                catch(error){
                    console.error('An error occured when trying to edit email',error)
                }
            }
        }
    },[])

    useEffect(() => {
        let saveTimeout;

        const saveEmailWithDelay = () => {
            // Set a timeout to save the email after 3 seconds
            saveTimeout = setTimeout(() => {
                email.id?emailService.save(email):setEmail(emailService.save(email))
            }, 3000)
        };

        if (email) {
            // Call saveEmailWithDelay when email changes
            saveEmailWithDelay()
        }

        // Cleanup function
        return () => {
            // Clear the timeout when the component is unmounted or email changes
            clearTimeout(saveTimeout);
        };
    }, [email]);
    return(
<div>

</div>

    ) 
}