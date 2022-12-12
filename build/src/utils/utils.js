"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateExpired = exports.getUsername = exports.addMinutesToDate = exports.generateOtp = void 0;
const generateOtp = (size) => {
    const zeros = '0'.repeat(size - 1);
    const x = parseFloat('1' + zeros);
    const y = parseFloat('9' + zeros);
    return String(Math.floor(x + Math.random() * y));
};
exports.generateOtp = generateOtp;
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
exports.addMinutesToDate = addMinutesToDate;
function getUsername(email) {
    return email.substring(0, email.lastIndexOf("@"));
}
exports.getUsername = getUsername;
function isDateExpired(date) {
    const now = new Date();
    return date < now;
}
exports.isDateExpired = isDateExpired;
//# sourceMappingURL=utils.js.map