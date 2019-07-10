import React from "react";
class ActionForm extends React.Component {
  constructor() {
    super();
  };

  render () {
    return (
      <form>
        <input type="text" placeholder="Новое дело" id="newCase"/>
        <button type="submit" onClick={this.props.addCase}>Добавить</button>
      </form>
    )
  }
}

export default ActionForm;