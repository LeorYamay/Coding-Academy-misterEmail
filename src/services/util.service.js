
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    compareStringsIgnoreCase,
    formatDate,
    stringContainsIgnoreCase
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function compareStringsIgnoreCase(string1, string2) {
    const regex = new RegExp(`^${string1}$`, 'i');
    return regex.test(string2);
}
function stringContainsIgnoreCase(mainString, subString) {
    const regex = new RegExp(subString, 'i');
    return regex.test(mainString);
}
function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
        // If the date is today, display the time
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.getFullYear() === today.getFullYear()) {
        // If the date is this year, display the month and day
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
        // If the date is older than this year, display in dd/mm/yy format
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }
}