import React from "react";
class ActionForm extends React.Component {
  constructor() {
    super();
  };

  render () {
    return (
      <form>
        <input type="text" placeholder="Новое дело" id="newCase" onChange={this.props.setValue} value={this.props.currentWord}/>
        <button type="submit" onClick={this.props.addCase}>Добавить</button>
      </form>
    )
  }
}

export default ActionForm;