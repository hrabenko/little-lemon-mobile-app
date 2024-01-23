export function checkFirstName(firstName) {
    return firstName && typeof firstName === 'string';
}


export function checkEmail(email) {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ig;
    return regExp.test(email);
}


export function checkPhoneNumber(phoneNumber) {
    const regExp = /^[+]?([0-9]\s?|[0-9]?)([(][0-9]{3}[)]\s?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/ig;
    return regExp.test(phoneNumber);
}
