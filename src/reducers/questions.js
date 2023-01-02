import {
  RECEIVE_QUESTIONS,
  SUBMIT_VOTE,
  ADD_QUESTION,
} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }

    case SUBMIT_VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.vote]: {
            ...state[action.id][action.vote],
            votes: state[action.id][action.vote].votes.concat([
              action.authedUser,
            ]),
          },
        },
      }
    case ADD_QUESTION:
      const question = action.question
      return {
        ...state,
        [question.id]: {
          ...question,
        },
      }

    default:
      return state
  }
}
