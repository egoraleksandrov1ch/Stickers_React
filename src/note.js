import React from 'react';

class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            view: true,
            userText: this.props.text,
            posX: this.props.posX,
            posY: this.props.posY,
            deltaX: null,
            deltaY: null,
        };
        this.changeView = this.changeView.bind(this);
        this.setText = this.setText.bind(this);
        this.startMove = this.startMove.bind(this);
        this.endMove = this.endMove.bind(this);
        this.trackMouse = this.trackMouse.bind(this);

    };
    setText(e) {
        this.setState({userText: e.target.value});
    }
    changeView() {
        this.setState({view: !this.state.view}, () => (
            this.props.editNote(this.props.itemIndex, this.state.userText)
        ));
    };
    trackMouse(e) {
        this.setState({posX: e.pageX - this.state.deltaX, posY: e.pageY - this.state.deltaY});
    };
    startMove(e) {
        this.setState({
            deltaX: e.pageX - this.state.posX,
            deltaY: e.pageY - this.state.posY,
        });
        window.addEventListener('mousemove', this.trackMouse);
    };
    endMove(e) {
        window.removeEventListener('mousemove', this.trackMouse);
        this.props.editPos(this.props.itemIndex, this.state.posX, this.state.posY);
    };
    render() {
        return(
            <div
                className='note'
                style = {{top: this.state.posY, left: this.state.posX}}
                onMouseDown = {this.startMove}
                onMouseUp = {this.endMove}
            >
                <div
                    onDoubleClick={this.changeView}
                    style={{display: this.state.view ? 'block' : 'none'}}

                >
                    {this.state.userText}
                </div>
                <textarea
                    onChange={this.setText}
                    value={this.state.userText}
                    onDoubleClick={this.changeView}
                    style={{display: this.state.view ? 'none' : 'block'}}
                >

                </textarea>
            </div>
        )
    };
};

export default Note;