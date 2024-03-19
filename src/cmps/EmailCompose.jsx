import { useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { useEffect, useRef, useState } from "react"

import useEffectOnlyOnUpdate from "../hooks/useEffectOnUpdate"

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function EmailCompose() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [email, setEmail] = useState({})
    const [enlarge, setEnlarge] = useState(false)

    const loadedEmail = useRef(false)
    const saveTimeoutRef = useRef();

    let compose = searchParams.get('compose')
    useEffect(() => {
        compose = searchParams.get('compose')
        async function saveEmailWithDelay() {
            // Set a timeout to save the email after 3 seconds
            saveTimeoutRef.current = setTimeout(async () => {
                try {
                    const savedEmail = await emailService.save(email)
                    setEmail(savedEmail)
                    if ((!email.id) && (compose === 'new')) {
                        emailService.updateSearchParamsComposeWithId(email.id,searchParams,setSearchParams)
                    }
                } catch (error) {
                    console.error("Error saving email:", error)
                }
            }, 3000)

        }

       

        async function setComposeEmail() {
            if (email.id != compose) {
                const composeEmail = await emailService.getById(compose)
                try {
                    if (composeEmail.sentAt) {
                        throw ('Email already sent and cannot be edited')
                    }
                    setEmail(composeEmail)
                }
                catch (error) {
                    console.error('An error occured when trying to edit email', error)
                }
            }
        }

        if (!loadedEmail.current) {
            if (compose === 'new') {
                const composeTo = searchParams.get('composeTo')
                setEmail(emailService.createEmail({ from: emailService.getLoggedInUser().email, to: composeTo }))
            }
            else {
                setComposeEmail()
            }
            loadedEmail.current = true
        }
        if ((Object.keys(email).length>0) && loadedEmail.current) {
            clearTimeout(saveTimeoutRef.current)
            saveEmailWithDelay()
        }

        return () => {
            // Clear the timeout when the component is unmounted or email changes
            // clearTimeout(saveTimeoutRef.current)
        }
    }, [email])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmail((prevEmail) => ({
            ...prevEmail,
            [name]: value
        }))
    }

    const handleSend = () => {
        emailService.save({
            ...email,
            sentAt: new Date()
        })
        resetSearchParams()
    }
    const handleDiscard = () =>{
        emailService.remove(email.id)
        resetSearchParams()
    }

    return (compose && (
        <div className="email-compose-container">
            <form className="email-compose-form">
            <label className="email-compose-header">{email.subject}</label>
            <br />
                <input
                    type="text"
                    id="to"
                    name="to"
                    placeholder="recipients"
                    value={[email.to]}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="subject"
                    value={[email.subject]}
                    onChange={handleChange}
                />
                <br />
                <textarea
                    id="body"
                    name="body"
                    value={[email.body]}
                    onChange={handleChange}
                />
                <br />
                <button type="button" onClick={handleSend}>
                    Send
                </button>

                <button type="button" onClick={handleDiscard}>
                    <DeleteOutlineIcon/>
                </button>
            </form>
        </div>
    )

    )

    function resetSearchParams() {
        const newParams = new URLSearchParams(searchParams)
        newParams.delete('compose')
        newParams.delete('composeTo')
        setSearchParams(newParams)
    }
}

export function EmailComposeWrapper(){
    const [searchParams] = useSearchParams();
    const compose = searchParams.get('compose')
  
    return compose ? <EmailCompose /> : null
  };
  
