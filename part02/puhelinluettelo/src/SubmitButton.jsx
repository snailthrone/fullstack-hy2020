import React from 'react';

const SubmitButton = ({ handler, title }) => (
<button onClick={handler} type="submit">{title}</button>
)

export default SubmitButton
