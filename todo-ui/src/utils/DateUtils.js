
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Example: Monday, July 1
export function formatToDayMonth(date) {
    const day = DAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]
    const dayNum = date.getUTCDate()
    return `${day}, ${month} ${dayNum}`
}

// Example: July 2024
export function formatToMonthYear(date) {
    const month = MONTHS[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${year}`
}


// Example: 2024-07-01
export function formatToDashes(date) {
    if (typeof date === 'string' && date.match(/\d{2}-\d{2}-\d{2}/)) 
        return date
    return date.toISOString().split("T")[0]
}