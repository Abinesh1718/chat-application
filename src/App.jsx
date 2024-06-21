import React from 'react';
import Chat from './componants/chat';

function App() {
    return (
        <div className="App" style={{display:'flex',padding:50,margin:50,position:'absolute',top:50}}>
            <header className="App-header">
                <h1>Chat Application</h1>
                <Chat />
            </header>
        </div>
    );
}

export default App;