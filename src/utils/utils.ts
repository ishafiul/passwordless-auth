export const generateOtp = (size: number) => {
    const zeros = '0'.repeat(size - 1);
    const x = parseFloat('1' + zeros);
    const y = parseFloat('9' + zeros);
    return String(Math.floor(x + Math.random() * y));
}

export function addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

export function getUsername(email: string) {
    return email.substring(0, email.lastIndexOf("@"));
}

export function isDateExpired(date: Date) {
    const now = new Date();
    return date < now;
}
