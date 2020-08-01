export const asObject = anecdote => (
  {
    content: anecdote,
    id: () => (100000 * Math.random()).toFixed(0),
    votes: 0
  }
)
