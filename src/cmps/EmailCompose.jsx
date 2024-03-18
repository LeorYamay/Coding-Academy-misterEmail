import { useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { useEffect, useRef, useState } from "react"

import useEffectOnlyOnUpdate from "../hooks/useEffectOnUpdate"

export function EmailCompose() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [email, setEmail] = useState({})
    const [enlarge, setEnlarge] = useState(false)

    const loadedEmail = useRef(false)
    const saveTimeoutRef = useRef();

    useEffect(() => {
        const compose = searchParams.get('compose')

        async function saveEmailWithDelay() {
            // Set a timeout to save the email after 3 seconds
            saveTimeoutRef.current = setTimeout(async () => {
                try {
                    console.log(email.id,compose)
                    const savedEmail = await emailService.save(email)
                    setEmail(savedEmail)
                    if ((!email.id) && (compose === 'new')) {
                        updateSearchParamsComposeWithId(savedEmail)
                    }
                } catch (error) {
                    console.error("Error saving email:", error)
                }
            }, 3000)

        }

        function updateSearchParamsComposeWithId(id) {
            const newParams = new URLSearchParams(searchParams)
            newParams.set('compose', id)
            setSearchParams(newParams)
        }

        async function setComposeEmail() {
            if (email.id != compose) {
                const composeEmail = await emailService.getById(compose)
                try {
                    if (composeEmail.sentAt) {
                        throw ('Email already sent and cannot be edited')
                    }
                    setEmail(composeEmail)
                    console.log("setComposeEmail", composeEmail)
                }
                catch (error) {
                    console.error('An error occured when trying to edit email', error)
                }
            }
        }

        if (!loadedEmail.current) {
            if (compose === 'new') {
                const composeTo = searchParams.get('composeTo')
                setEmail(emailService.createEmail({ from: emailService.getLoggedInUser.email, to: composeTo }))
            }
            else {
                setComposeEmail()
            }
            loadedEmail.current = true
        }

        if (email && loadedEmail.current) {
            // Call saveEmailWithDelay when email changes
            console.log(email)
            clearTimeout(saveTimeoutRef.current)
            saveEmailWithDelay()
        }

        // Cleanup function
        return () => {
            // Clear the timeout when the component is unmounted or email changes
            clearTimeout(saveTimeoutRef.current)
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
        setEmail((prevEmail) => ({
            ...prevEmail,
            sentAt: new Date()
        }))
    }

    return (
        <div className="email-compose-container">
            <form className="email-compose-form">
                <label htmlFor="to">To:</label>
                <input
                    type="text"
                    id="to"
                    name="to"
                    placeholder="recipients"
                    value={[email.to]}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="subject"
                    value={[email.subject]}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="body">Body:</label>
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
            </form>
        </div>

    )
}