const HOST_API = process.env.NEXT_PUBLIC_HOST_API

export const getFilePath = (path: string) => `${HOST_API}/files/${path}`
