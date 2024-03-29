import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    filter,
    getLoggedInUser,
    getFilterFromSearchParams,
    getFilterFromFolder,
    updateSearchParamsComposeWithId
}

const STORAGE_KEY = 'emails'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
function getLoggedInUser(){
    return loggedinUser
}
_createEmails()

async function query(filterBy) {
    const emails = await storageService.query(STORAGE_KEY);
    return await filter(emails, filterBy)
}

function filter(emails, filterBy) {
    if (filterBy) {
        const { subject, body, hasText, doesNotHaveText, isRead, isStarred, sentBefore, sentAfter, inTrash, from, to, draft } = filterBy
        return emails.filter((email) => {
            const isSubjectMatch = subject ? utilService.stringContainsIgnoreCase(email.subject, subject) : true
            const isBodyMatch = body ? utilService.stringContainsIgnoreCase(email.body,body) : true
            const isReadMatch = !(isRead == null) ? email.isRead === isRead : true
            const isStarredMatch = !(isStarred == null) ? email.isStarred === isStarred : true;
            const isSentBefore = sentBefore ? sentBefore < email.sentAt : true;
            const isSentAfter = sentAfter ? sentAfter > email.sentAt : true;
            const isDraft = (draft == null) || (email.sentAt == null)
            const isInTrashMatch = (inTrash == null) || (inTrash ? !!(email.removedAt) : !(email.removedAt));
            const isFromMatch = from ? utilService.stringContainsIgnoreCase(email.from, from) : true;
            const isToMatch = to ? utilService.stringContainsIgnoreCase(email.to, to) : true;
            const isTextMatch = hasText ?
                [email.subject, email.body, email.from, email.to].some(prop => utilService.stringContainsIgnoreCase(prop, hasText))
                : true
            const isTextExcludeMatch = doesNotHaveText ?
                !([email.subject, email.body, email.from, email.to].some(prop => utilService.stringContainsIgnoreCase(prop, doesNotHaveText)))
                : true
            const fitlerRes = isSubjectMatch &&
                isBodyMatch &&
                isReadMatch &&
                isStarredMatch &&
                isDraft &&
                isSentBefore &&
                isSentAfter &&
                isInTrashMatch &&
                isFromMatch &&
                isToMatch &&
                isTextMatch &&
                isTextExcludeMatch
            return fitlerRes
        })
    }
    console.log("emails.length after",emails.length)
    return emails
}

function getFilterFromSearchParams(searchParams) {
    const paramsArray = Array.from(searchParams.entries())
    const filterBy = {}
    for (const [key, value] of paramsArray) {
        filterBy[key] = value;
    }
    return filterBy
}

function updateSearchParamsComposeWithId(id,searchParams,setSearchParams) {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('compose', id)
    setSearchParams(newParams)
}

function getFilterFromFolder(folder){
    const filterBy = {inTrash:false}
    switch (folder){
        case 'inbox':
            return {...filterBy,to:getLoggedInUser().email}
            break
        case 'starred':
            return {...filterBy,isStarred:true}
            break
        case 'sent':
            return {...filterBy,from:getLoggedInUser().email}
            break
        case 'draft':
            return {...filterBy,draft:true}
            break
        case 'trash':
            return {...filterBy,inTrash:true}
            break
    }
}

function getDefaultFilter() {
    return {
        inTrash: false
    }
}
function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail({ subject = '', body = '', isRead = false, isStarred = false, sentAt = null, removedAt = null, from = '', to = '' }) {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = []
        const randomEmailNumber = Math.floor(Math.random() * 30 + 5)
        for (let i = 0; i < randomEmailNumber; i++) {
            emails.push(_createRandomEmail())
        }
        utilService.saveToStorage(STORAGE_KEY, emails)
    }

    function _createRandomEmail() {
        const isFromLoggedInUser = _getRandomBoolean()
        const email = {
            id: utilService.makeId(),
            subject: _generateRandomSubject(),
            body: _generateRandomBody(),
            isRead: _getRandomBoolean(),
            isStarred: _getRandomBoolean(),
            sentAt: _getRandomDateInPast()
        }
        if (isFromLoggedInUser) {
            email.from = loggedinUser.email
            email.to = _generateRandomEmail()
        }
        else {
            email.to = loggedinUser.email
            email.from = _generateRandomEmail()
        }
        return email
    }
}


function _generateRandomSubject() {
    const subjects = [
        'Important Update',
        'Meeting Tomorrow',
        'Hello from the Team',
        'Your Invoice',
        'Upcoming Event',
        'Project Status',
        'Action Required',
    ];

    const randomIndex = Math.floor(Math.random() * subjects.length)
    return subjects[randomIndex]
}


function _generateRandomBody() {
    const greetings = ['Dear', 'Hello', 'Hi', 'Greetings']
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    const randomBody = `${randomGreeting},
  
  ${loremIpsum}
  
  Sincerely,
  Your Name`

    return randomBody
}

function _generateRandomEmail() {
    const isFromLoggedInUser = _getRandomBoolean(0.25)
    if (isFromLoggedInUser) {
        return loggedinUser.email
    } else {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'testmail.com']
        const usernameLength = Math.floor(Math.random() * 10) + 5

        const username = _generateRandomString(usernameLength);
        const domain = domains[Math.floor(Math.random() * domains.length)]

        return `${username}@${domain}`

    }
}

function _generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function _getRandomBoolean(rate = 0.5) {
    return Math.random() < rate
}

function _getRandomDateInPast() {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);

    // Set the range for the past date (e.g., 1 year ago)
    pastDate.setFullYear(currentDate.getFullYear() - 1);

    // Generate a random number of milliseconds within the past year
    const randomMilliseconds = Math.floor(Math.random() * (currentDate - pastDate));

    // Set the random date
    pastDate.setTime(currentDate.getTime() - randomMilliseconds);

    return pastDate;
}