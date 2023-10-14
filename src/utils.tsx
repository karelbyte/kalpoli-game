
export function sanitizeWord(word: string) {
    return word.replace(/[áéíóúÁÉÍÓÚ]/g, function (match: any) {
        return 'aeiouAEIOU'['áéíóúÁÉÍÓÚ'.indexOf(match)];
    });
}

export const regexOnlyLetters = /^[a-zA-Z\b]+$/;