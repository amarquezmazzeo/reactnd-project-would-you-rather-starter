import { receiveQuestions } from "./questions"
import { receiveUsers } from "./users"
import { setAuthedUser } from "./authedUser"

import { getInitialData } from "../utils/api"

const AUTHED_ID = 'sarahedo'

export function handleInitialData() {
    return (dispatch) => {
        // todo: show loading bar while data gets pulled
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                // todo: hide loading bar at completion
            })
    }
}
