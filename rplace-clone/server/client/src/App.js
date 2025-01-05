import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Make sure this matches your server URL

const App = () => {
    const [grid, setGrid] = useState(Array(100).fill(0).map(() => Array(100).fill('#ffffff')));

    useEffect(() => {
        socket.on('pixel_placed', ({ x, y, color }) => {
            setGrid((prevGrid) => {
                const newGrid = [...prevGrid];
                newGrid[y][x] = color;
                return newGrid;
            });
        });

        return () => {
            socket.off('pixel_placed');
        };
    }, []);

    const handleClick = (x, y) => {
        const color = '#'+((1<<24)*Math.random()|0).toString(16); // Random color
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[y][x] = color;
            return newGrid;
        });
        
        socket.emit('place_pixel', { x, y, color });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(100, 20px)' }}>
            {grid.map((row, y) => 
                row.map((color, x) => (
                    <div
                        key={`${y}-${x}`}
                        onClick={() => handleClick(x, y)}
                        style={{ width: '20px', height: '20px', backgroundColor: color, border: '1px solid grey' }}
                    />
                ))
            )}
        </div>
    );
};

export default App;