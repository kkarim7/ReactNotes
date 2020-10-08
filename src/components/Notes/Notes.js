import React, { useState, useEffect, useRef } from "react";

import Aux from "../../hoc/Aux";
import classes from "./Notes.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import NoteItem from "./NoteItem/NoteItem";

const Notes = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [noteEditing, setNoteEditing] = useState(null);
  const [currentEdit, setCurrentEdit] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      setNote(notes);
    }
  }, []);

  const prevStateRef = useRef();

  useEffect(() => {
    prevStateRef.current = note;
    if (prevStateRef.length !== note.length) {
      const json = JSON.stringify(note);
      localStorage.setItem("notes", json);
    }

    note.forEach((notes, index) => {
      if (prevStateRef[index] !== notes) {
        const json = JSON.stringify(note);
        localStorage.setItem("notes", json);
      }
    });
    // return function cleanUp() {
    //   prevStateRef.current = note;
    //   if (prevStateRef.length !== note.length) {
    //     const json = JSON.stringify(note);
    //     localStorage.setItem("notes", json);
    //   }
    // };
  });

  const onClickHandler = () => {
    setShowModal(!showModal);
  };

  const addNoteHandler = () => {
    let notes = [...note];
    notes.push(currentNote);
    setNote(notes);
    setCurrentNote("");
    console.log(notes);
  };

  const deleteNoteHandler = (indexToDelete) => {
    let notes = [...note].filter((thatNote, index) => index !== indexToDelete);
    setNote(notes);
  };

  let noteItemContent = note.map((notes, index) => (
    <div className={classes.NotesItem} key={index}>
      {noteEditing === null || noteEditing !== index ? (
        <Aux>
          <div onClick={() => initNoteEditingHandler(index)}>{notes}</div>
          <Button clicked={() => initNoteEditingHandler(index)}>Edit</Button>
          <Button clicked={() => deleteNoteHandler(index)}>Delete</Button>
        </Aux>
      ) : (
        <div>
          <Modal show={!showModal}>
            <Input
              value={currentEdit}
              changed={(event) => editNoteHandler(event)}
              placeholder="Edit Note"
            />
            <Button clicked={() => submitEditHandler(index)}>Done</Button>
            <Button clicked={() => deleteNoteHandler(index)}>Delete</Button>
          </Modal>
        </div>
      )}
    </div>
  ));

  const initNoteEditingHandler = (index) => {
    setNoteEditing(index);
    setCurrentEdit(note[index]);
  };

  const editNoteHandler = (event) => {
    setCurrentEdit(event.target.value);
  };

  const submitEditHandler = (index) => {
    let notes = [...note];
    notes[index] = currentEdit;
    setNote(notes);
    setNoteEditing(null);
  };

  return (
    <Aux>
      <h1>Notes App</h1>
      <Modal show={showModal}>
        <Input
          value={currentNote}
          changed={(event) => setCurrentNote(event.target.value)}
          placeholder="Note"
        />
        <Button
          clicked={() => {
            onClickHandler();
            addNoteHandler();
          }}
          submitNewNote
        >
          <h2>Add Note</h2>
        </Button>
      </Modal>
      <div className={classes.NotesContainer}>
        <div className={classes.NotesMasonry}>{noteItemContent}</div>
        <Button clicked={onClickHandler}>+</Button>
      </div>
    </Aux>
  );
};

export default Notes;
