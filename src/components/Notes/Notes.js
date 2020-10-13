import React, { useState, useEffect, useRef } from "react";

import classes from "./Notes.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import Backdrop from "../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux";

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

  const onBackdropClickHandler = () => {
    setShowModal(false);
  };

  const addNoteHandler = () => {
    let notes = [...note];
    notes.push(currentNote);
    setNote(notes);
    setCurrentNote("");
    console.log(notes);
  };

  const deleteNoteHandler = (indexToDelete) => {
    let notes = [...note].filter((notes, index) => index !== indexToDelete);
    setNote(notes);
    setNoteEditing(null);
  };

  let noteItemContent = note.map((notes, index) => (
    <div className={classes.NotesItem} key={index}>
      {noteEditing === null || noteEditing !== index ? (
        <Card clicked={() => initNoteEditingHandler(index)}>{notes}</Card>
      ) : (
        <Card>
          <Input
            inputType="paragraph"
            value={currentEdit}
            changed={(event) => editNoteHandler(event)}
            placeholder="Edit Note"
          />
          <Button submitNewNote clicked={() => submitEditHandler(index)}>
            <h3>Done</h3>
          </Button>
          <Button submitNewNote clicked={() => deleteNoteHandler(index)}>
            <h3>Delete</h3>
          </Button>
        </Card>
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
      <div className={classes.NotesContainer}>
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
        <Backdrop clicked={onBackdropClickHandler}>{noteItemContent}</Backdrop>
        <Button clicked={onClickHandler}>+</Button>
      </div>
    </Aux>
  );
};

export default Notes;
