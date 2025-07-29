import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('receive-changes', newText => {
      setText(newText);
    });

    return () => {
      socket.off('receive-changes');
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('send-changes', newText);
  };

  return (
    <div>
      <h2>Real-Time Document Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="20"
        cols="80"
      ></textarea>
    </div>
  );
}

export default App;
