export const parseBody = (body: any) => {
    return typeof(body) === 'string' ? JSON.parse(body) : body
}