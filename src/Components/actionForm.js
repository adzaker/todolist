import React from "react";
class ActionForm extends React.Component {
  render () {
    return (
      <form>
        <input type="text" placeholder="Новая задача" id="newCase"/>
        <button type="submit" onClick={this.props.addCase}>Добавить</button>
      </form>
    )
  }
}

export default ActionForm;