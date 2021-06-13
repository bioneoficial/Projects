import React from 'react';

export default function Error({ children: errorMessage }) {
  return <div className="text-center font-mono text-xl">{errorMessage}</div>;
}
