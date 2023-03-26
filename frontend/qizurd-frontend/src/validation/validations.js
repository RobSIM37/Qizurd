import * as yup from "yup"

export const loginOrRegisterSchema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().required()
})

export const studentFormSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required()
})

export const quizFormSchema = yup.object().shape({
    quizTitle: yup.string().required(),
    description: yup.string().required(),
    questions: yup.array().required().min(1),
    students: yup.array().required().min(1)
})

export const questionSchema = yup.object().shape({
    questionText: yup.string().required(),
    answer: yup.string().required()
})