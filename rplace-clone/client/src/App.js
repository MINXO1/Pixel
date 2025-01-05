import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
        });
    }, []);

    return <div>Your Canvas Here</div>;
};

export default App;