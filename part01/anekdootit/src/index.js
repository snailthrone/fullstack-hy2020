import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomNumber = (min, max) => (
  Math.floor(Math.random() * (max - min) + min)
)

const App = ({ anecdotes }) => {
  const [withVotes, setVotes] = useState(anecdotes.map((a) => ({
    text: a,
    votes: 0
  })))
  const [selected, setSelected] = useState(0);

  const currentAnecdote = withVotes[selected];
  const maxVotes = Math.max(...withVotes.map(({ votes }) => votes));
  const mostVoted = withVotes.find(({ votes }) => votes === maxVotes);

  const updateVotes = () => {
    const currentAnecdoteWithVote = { ...currentAnecdote, votes: currentAnecdote.votes + 1};
    let copyOfWithVotes = [...withVotes];
    copyOfWithVotes[selected] = currentAnecdoteWithVote;
    setVotes(copyOfWithVotes);
  }

  return (
    <>
      <h2>Anecdote of the Day</h2>
      <p>{currentAnecdote.text}</p>
      <p>has {currentAnecdote.votes} votes</p>
      <button onClick={updateVotes}>Vote</button>
      <button onClick={() => { setSelected(randomNumber(0, anecdotes.length)) }}>Next Anecdote</button>
      {
        maxVotes > 0 && (
          <>
            <h2>Anecdote with Most Votes</h2>
            <p>{mostVoted.text}</p>
            <p>has {mostVoted.votes} votes</p>
          </>
        )
      }
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)