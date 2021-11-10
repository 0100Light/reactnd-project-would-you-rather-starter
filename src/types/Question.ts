interface Question {
    id: string,
    author: string,
    timestamp: Date,
    optionOne: {
        votes: string[]
        text: string
    },
    optionTwo: {
        votes: string[],
        text: string
    }
}

export default Question