export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
  export function formatQuestion (question, author, authedUser) {
    const { id , optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author

    const vote = optionOne.votes.includes(authedUser) ? 'one'
        : optionTwo.votes.includes(authedUser) ? 'two'
        : null
  
    return {
      name,
      id,
      timestamp,
      votesOne: optionOne.votes.length,
      votesTwo: optionTwo.votes.length,
      textOne: optionOne.text,
      textTwo: optionTwo.text,
      avatar: avatarURL,
      vote
      }
    }