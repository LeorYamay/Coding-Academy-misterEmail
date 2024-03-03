import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter
}

const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    const emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { subject, body, isRead, isStarred, sentBefore,sentAfter,inTrash,from,to} = filterBy
        sentBefore = sentBefore || new Date()
        sentAfter = sentAfter || Date.now()+1000
        const trashFilter = !(inTrash)?true:
        emails = emails.filter(email => email.body.toLowerCase().includes(body.toLowerCase())
        &&(isRead != null)?email.isRead===isRead:true
        &&(isStarred != null)?email.isStarred===isStarred:true
        && sentBefore<email.sentAt
        && sentAfter>email.sentAt
        && inTrash === null || !!inTrash === !!email.removedAt
        && email.from.toLowerCase()===from.toLowerCase()
        &&email.to.toLowerCase() === to.toLowerCase()
        )
    }
    return emails
}

function getDefaultFilter() {
    return {
        subject: '',
        body: '',
        isStarred:false
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

function createEmail({subject = '', body = '', isRead = false, isStarred = false, sentAt = new Date(), removedAt = null, from = '', to = ''}) {
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
        return {
            id: utilService.makeId(),
            subject: _generateRandomSubject(),
            body: _generateRandomBody(),
            isRead: _getRandomBoolean(),
            isStarred: _getRandomBoolean(),
            from: _generateRandomEmail(),
            to: _generateRandomEmail()
        }
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

    const randomIndex = Math.floor(Math.random() * subjects.length);
    return subjects[randomIndex];
}


function _generateRandomBody() {
    const greetings = ['Dear', 'Hello', 'Hi', 'Greetings'];
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const randomBody = `${randomGreeting},
  
  ${loremIpsum}
  
  Sincerely,
  Your Name`;

    return randomBody;
}

function _generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'testmail.com'];
    const usernameLength = Math.floor(Math.random() * 10) + 5; // Random username length between 5 and 14 characters

    const username = _generateRandomString(usernameLength);
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${username}@${domain}`;
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

function _getRandomBoolean() {
    return Math.random() < 0.5; // Will return true approximately 50% of the time
}