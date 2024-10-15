// src/TextEntryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TextEntryForm = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [entries, setEntries] = useState([]);
    const [text1Entries, setText1Entries] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const textEntry = { text1, text2 };

        axios.post('http://localhost:8080/api/texts', textEntry)
            .then(response => {
                console.log(response.data);
                setText1('');
                setText2('');
                alert('Your data stored successfully in DataBase');
            })
            .catch(error => {
                console.error('There was an error saving the text entry!', error);
            });
    };

    const fetchAllEntries = () => {
        axios.get('http://localhost:8080/api/texts')
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the text entries!', error);
            });
    };

    const fetchText1Entries = () => {
        axios.get('http://localhost:8080/api/texts/text1')
            .then(response => {
                setText1Entries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the text1 entries!', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Text 1</label>
                    <input
                        type="text"
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                    />
                </div>
                <div>
                    <label>Text 2</label>
                    <input
                        type="text"
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={fetchAllEntries}>GET ALL</button>
            <button onClick={fetchText1Entries}>GET TEXT 1</button>
            <div>
                <h2>All Entries</h2>
                <ul>
                    {entries.map((entry, index) => (
                        <li key={index}>
                            {entry.text1} - {entry.text2}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Text 1 Entries</h2>
                <ul>
                    {text1Entries.map((text1, index) => (
                        <li key={index}>
                            {text1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TextEntryForm;
