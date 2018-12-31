import React from 'react';
import '../Layout.css'

class InputLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = { task: '' };
  }

  handleChange(event) {
    this.setState({ task: event.target.value });
  }

  handleSubmit() {
    this.props.addTodo(this.state.task);
    this.setState({ task: '' });
  }

  render() {
    return (
      <div>

        <input
          className={'input'}
          type="text"
          placeholder={"task"}
          onChange={(event) => this.handleChange(event)}
          value={this.state.task}
          onKeyDown={(response)=>{
            if (response.key === "Enter"){
              this.handleSubmit()
            }

          }}
        />
        <div className={'submit-wrapper'}>
        <button className={'submit'} type={'submit'} onClick={() => this.handleSubmit()}>Add Todo</button>
      </div>
      </div>
    )
  }
}

export default InputLine;
