export function capitalize(s: string | undefined): string {
    if (!s) {
        return '';
    }
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
