import React from "react";
import ActionForm from "../Components/actionForm";
import ListItem from "../Components/listItem";
import TableList from "../Components/tableList";
import Pagination from "../Components/Pagination";
import PaginationItem from "../Components/PaginationItem";
import { connect } from 'react-redux';
import preloaderUrl from '../loader.gif';
import { addCase, setValue, switchDisable, deleteItem, changePage, loadFromServer, clearTable, showDetails, changeDetailsCount, switchPreloader } from '../Actions';

class TodoList extends React.Component {
  addCase(e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input');
    let {dispatch} = this.props;
    dispatch(addCase(input.value));
    input.value = "";
  }

  setValue(e) {
    let {dispatch} = this.props;
    dispatch(setValue(e.target.value));
  }

  switchDisable(index) {
    let {dispatch} = this.props;
    dispatch(switchDisable(index));
  }

  deleteItem(index) {
    let {dispatch} = this.props;
    dispatch(deleteItem(index));
  }

  changePage(number) {
    let {dispatch} = this.props;
    dispatch(changePage(number));
  }

  showDetails(e) {
    e.preventDefault();
    this.props.history.push(`/items/${e.target.id}`);
    let {dispatch} = this.props;
    dispatch(showDetails(e.target.id));
  }

  switchPreloader() {
    let {dispatch} = this.props;
    dispatch(switchPreloader());
  }

  loadFromServer(url) {
    let {dispatch} = this.props;
    dispatch(clearTable());
    fetch(url)
    .then((response) => {
      this.switchPreloader();
      return response.json();
    })
    .then((myJson) => {
      dispatch(loadFromServer(myJson.records));
      this.switchPreloader();
    });
   }

  clearTable() {
    let {dispatch} = this.props;
    this.switchPreloader();
    dispatch(clearTable());
    this.props.history.push(`/`);
    setTimeout(() => {
      this.switchPreloader();
    }, 200)
  }

  uploadFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (!~file.type.indexOf('json')) {
      return false;
    }
    reader.onload = () => {
      const data = reader.result;
      this.loadFromServer(data);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  downloadFile() {
    const {records} = this.props.records;
    // console.log(records.join());
    const jsonObject = {"records":[...records]};
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(
        new Blob([JSON.stringify(jsonObject, null, 2)], {type : 'application/json'})
    );
    a.setAttribute('download', 'userRecords.json');
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  }

  changeDetailsCount(e) {
    this.props.history.push(`/#1`);
    let {dispatch} = this.props;
    dispatch(changeDetailsCount(e.target.value));
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      let {dispatch} = this.props;
      dispatch(changePage(window.location.hash.substr(1)));
    })
  }

  render () {
    let props = this.props.records;
    return (
      <div className="List">
        <header>
          <h2>Список дел</h2>
          <div className="headerForm">
            <ActionForm addCase={this.addCase.bind(this)} />
            <button className="loadFromServer" onClick={this.loadFromServer.bind(this, '/json/records.json')}>Загрузить пример</button>
            <button className="clearButton" onClick={this.clearTable.bind(this)}>Очистить таблицу </button>
            <select defaultValue={10} onChange={this.changeDetailsCount.bind(this)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="headerForm" style={{marginTop: 24}}>
            <input type="file" id="file" onChange={this.uploadFile.bind(this)}/>
            <button className="clearButton" id="download" onClick={this.downloadFile.bind(this)}>Скачать</button>
          </div>
        </header>
        <main>
          <TableList maxItemsOnPage={props.maxItemsOnPage}>
            {props.records.map((record, index) => {
              while (index < (props.maxItemsOnPage * props.activePage) && index >= (props.maxItemsOnPage * (props.activePage - 1))) {
                return <ListItem
                  key={index}
                  num={index + 1}
                  record={record}
                  switchThis={this.switchDisable.bind(this, index)}
                  deleteThis={this.deleteItem.bind(this, index)}
                  showDetails={this.showDetails.bind(this)} />
              }
              return false;
            })}
          </TableList>
          <Pagination props={props}>
            {(() => {
              const num1 = Math.ceil(props.records.length / props.maxItemsOnPage);
              // const num2 = Math.floor(492 / 28);
              // const number = num1 > num2 ? num2 : num1;
              let array = [];
              for (let i = 1; i <= num1; i++) {
                array.push(<PaginationItem i={i} key={i} changePage={this.changePage.bind(this, i)} activePage={props.activePage}/>);
              }
              return array;
            })()}
          </Pagination>
        </main>
        <div className={`preloader__container ${props.showPreloader ? '-active' : ''}`}>
          <img src={preloaderUrl} className="" id="preloader" alt=""/>
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
)(TodoList)
