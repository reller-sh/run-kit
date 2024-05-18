
export const regexpCounter = (reg: RegExp, str: string) => {
    return ((str || '').match(reg) || []).length
}