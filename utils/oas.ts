

export const pathReplacer = (path: string, params: Record<string | number, string>) => {
    let newString = path;

    Object.keys(params).forEach(
        (key) => newString
            .replace(`{${key}}`, params[key])
            .replace(`:${key}`, params[key])
    );

    return newString;
}
