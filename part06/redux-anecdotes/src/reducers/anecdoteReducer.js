const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.anecdote]
    case 'INIT_ANECDOTES': 
      return action.data
    case 'VOTE':
      return state.map((anecdote) => {
        if (anecdote.id === action.id) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      }).sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const voteAnecdote = (id) => ({ type: 'VOTE', id })

export const createAnecdote = (anecdote) => ({ type: 'CREATE', anecdote })

export const initAnecdotes = (data) => ({ type: 'INIT_ANECDOTES', data })

export default anecdoteReducer