import React from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ActionForm extends React.Component {
  render () {
    return (
      <form>
        <input type="text" placeholder="Новая задача" id="newCase" className="coloredInput" />
        <button type="submit" className="tableButton ml-0" onClick={this.props.addCase}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    )
  }
}

export default ActionForm;