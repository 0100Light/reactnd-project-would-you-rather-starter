interface User {
    id: string,
    name: string,
    avatarURL: string,
    answers: { [key: string]: string },
    questions: string[]
}

export default User