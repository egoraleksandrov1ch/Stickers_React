import React from 'react';
import Note from './note';

class Main extends React.Component{
    constructor() {
        super();
        this.state = {
            notesArr: [],
        };
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.editPos = this.editPos.bind(this);
    };
    editNote(index, newText) {
        let arrCopy = [...this.state.notesArr];
        arrCopy[index].push = newText;
        this.setState({notesArr: arrCopy});
    };
    editPos(index, posX, posY){
        let arrCopy = [...this.state.notesArr];
        arrCopy[index].posX = posX;
        arrCopy[index].posY = posY;
        this.setState({ notesArr: arrCopy });
    };
    addNote() {
        let arrCopy = [...this.state.notesArr];
        let noteObj = {
            posX: 10,
            posY: 10,
            text: 'hi there',
        };
        arrCopy.push(noteObj);
        this.setState( { notesArr: arrCopy } );
    };
    render() {
        let notes = this.state.notesArr.map( (item, index) => (
            <Note 
                key={index}
                text={item.text}
                posX={item.posX}
                posY={item.posY}
                editNote={this.editNote}
                itemIndex={index}
                editPos={this.editPos}
            />
        ) );
        return(
            <div className='board'>
                <button 
                    className='newnote'
                    onClick={this.addNote}>
                    +
                </button>
                {notes}
            </div>
        )
    };
}

export default Main;