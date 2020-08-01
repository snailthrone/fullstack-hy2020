import { addAnecdote, getAll, vote } from "../services/anecdotes"

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

export const voteAnecdote = anecdote => (
  async dispatch => {
    const { id } = await vote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'VOTE', id })
  }
)

export const createAnecdote = content => (
  async dispatch => {
    const anecdote = await addAnecdote(content)
    dispatch({ type: 'CREATE', anecdote })
  }
)

export const initAnecdotes = () => (
  async dispatch => {
    const data = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
)

export default anecdoteReducer