import React, { FC } from 'react';

type Props = {
  total: number;
};

const Total: FC<Props> = ({ total }) => <p>Number of exercises {total}</p>;

export default Total;
