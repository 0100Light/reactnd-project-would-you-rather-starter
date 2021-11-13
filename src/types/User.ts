interface User {
    id: string,
    name: string,
    avatarURL: string,
    answers: { [key: string]: string },
    questions: string[]

    // sarahedo: {
    //     id: 'sarahedo',
    //     name: 'Sarah Edo',
    //     avatarURL: "https://placekitten.com/300/300",
    //     answers: {
    //         "8xf0y6ziyjabvozdd253nd": 'optionOne',
    //         "6ni6ok3ym7mf1p33lnez": 'optionTwo',
    //         "am8ehyc8byjqgar0jgpub9": 'optionTwo',
    //         "loxhs1bqm25b708cmbf3g": 'optionTwo'
    //     },
    //     questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    // },
}

export default User