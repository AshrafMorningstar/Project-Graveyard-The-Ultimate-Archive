/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from "react";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    function handleChange(event) {
        const {name,value} = event.target;
        setNote(prevNote => {
            return {
                ...prevNote,
                [name] : value

            }
        })
    }

    function submitNote(event){
       props.onAdd(note);
       setNote({
           title: "",
           content: ""
       });



        event.preventDefault();

    }
    return (
        <div>
            <form className="create-note">
                <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
                <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
