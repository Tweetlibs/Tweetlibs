import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div>
                <input type="text" id={this.props.movieKey} onChange={this.props.onchange}/>
                <h3>{this.props.speech}</h3>
            </div>
        );
    }
};

export default Input;