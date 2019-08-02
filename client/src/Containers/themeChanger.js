import React from "react";
import {connect} from "react-redux";
import {changeTheme} from "../Actions";

class ThemeChanger extends React.Component {

  changeTheme (e) {
    console.log(e.target.id);
    let {dispatch} = this.props;
    dispatch(changeTheme(e.target.id));
  }

  render() {
    const themes = ['-blue', '-dark', '-light', '-nCage', '-red', '-green'];
    return (
      <div className="themeChanger">
        <h4>Выберите тему</h4>
        <div className="themeSwitcher">
          {themes.map((theme, i) => {
              return <div className={`theme ${theme}`} id={theme} key={i} onClick={this.changeTheme.bind(this)} />
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    records: state.todo
  }
}

export default connect(
  mapStateToProps
)(ThemeChanger)
