import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Library from './components/library';

const libraryBooks = [{
        id: 0,
        book: {
            title: "Crime and Punishment",
            author: "Fydor Dykovski",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png"

        },
        paperCopies: [],
        audioCopies: []
    },
    {
        id: 0,
        book: {
            title: "East of Eden",
            author: "John Steinbeck",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/EastOfEden.jpg"

        },
        paperCopies: [],
        audioCopies: []
    }
]

ReactDOM.render( < Library libraryBooks = {
        libraryBooks
    }
    /> , 
    document.getElementById('root'));
registerServiceWorker();