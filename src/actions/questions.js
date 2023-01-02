import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_VOTE = 'SUBMIT_VOTE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function submitVote({ id, authedUser, vote }) {
  return {
    type: SUBMIT_VOTE,
    id,
    authedUser,
    vote,
  }
}

function newQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleSubmitVote(info) {
  const { id, authedUser, vote } = info
  return (dispatch) => {
    return saveQuestionAnswer({
      qid: id,
      authedUser,
      answer: vote,
    }).then(dispatch(submitVote(info)))
  }
}

export function handleAddQuestion(question) {
  const { authedUser, optionOneText, optionTwoText } = question
  return (dispatch) => {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((formattedQuestion) => dispatch(newQuestion(formattedQuestion)))
  }
}
