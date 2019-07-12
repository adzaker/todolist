import React from "react";
import ActionForm from "../Components/actionForm";
import ListItem from "../Components/listItem";
import TableList from "../Components/tableList";
import { connect } from 'react-redux';
import preloaderUrl from '../loader.gif';
import { addCase, switchDisable, deleteItem, changePage, loadFromServer, clearTable, showDetails, changeDetailsCount, switchPreloader, filterList, changeSortingTable } from '../Actions';
import FilterForm from "../Components/filterForm";
import NewPagination from "../Components/NewPagination";
import PaginationArrow from "../Components/PaginationArrow";
import {alertMessage} from "../Constants";

class TodoList extends React.Component {
  addCase(e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input');
    let {dispatch} = this.props;
    dispatch(addCase(input.value));
    input.value = "";
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
    let num = 0;
    if (Number.isInteger(number-0)) {
      num = number - 0;
    }
    let {dispatch} = this.props;
    dispatch(changePage(num));
  }

  changePageInput(e) {
    if (!Number.isInteger(e.target.value-0)) {
      return false;
    }
    let {dispatch} = this.props;
    dispatch(changePage(e.target.value - 0));
    this.props.history.push(`/#${e.target.value - 0}`);
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
    if (!e.target.files.length) {
      return false;
    }
    if (!file.type.includes('json')) {
      alert(alertMessage);
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
    if (!this.props.records.length) return false;
    const {records} = this.props.records;
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

  filterList(e) {
    let {dispatch} = this.props;
    dispatch(filterList(e.target.value));
  }

  changeSortingTable(e) {
    let {dispatch} = this.props;
    dispatch(changeSortingTable(e.target.id, e.target.className));
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
          <h2>Список задач</h2>
          <div className="headerForm">
            <ActionForm addCase={this.addCase.bind(this)} />
            <button className="loadFromServer" onClick={this.loadFromServer.bind(this, '/json/records.json')}>Загрузить пример</button>
            <button className="clearButton" onClick={this.clearTable.bind(this)}>Очистить таблицу </button>
          </div>
          <div className="headerForm" style={{marginTop: 24}}>
            <input type="file" id="file" onChange={this.uploadFile.bind(this)}/>
            <button className="clearButton" id="download" onClick={this.downloadFile.bind(this)}>Скачать</button>
          </div>
          <div className="headerForm" style={{marginTop: 24}}>
            <FilterForm filterList={this.filterList.bind(this)}/>
            <select defaultValue={10} onChange={this.changeDetailsCount.bind(this)} style={{marginLeft: 'auto'}}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </header>
        <main>
          <TableList maxItemsOnPage={props.maxItemsOnPage} sortingTable={props.sortingTable} changeSortingTable={this.changeSortingTable.bind(this)}>
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
          <NewPagination props={props} isRecords={props.records.length}>
            <PaginationArrow
              changePage={this.changePage.bind(this, 1)}
              i = {1}
              direction='1'
              visibility={props.activePage === 1 ? 'hidden' : 'visible'} />
            <PaginationArrow
              changePage={this.changePage.bind(this, props.activePage - 1)}
              i = {props.activePage - 1}
              direction='<'
              visibility={props.activePage === 1 ? 'hidden' : 'visible'} />
            <li>
              <input id="pageInput" type="text" value={props.activePage} onChange={this.changePageInput.bind(this)} />
            </li>
            <PaginationArrow
              changePage={this.changePage.bind(this, props.activePage + 1)}
              i = {props.activePage + 1}
              direction='>'
              visibility={props.activePage === Math.ceil(props.records.length / props.maxItemsOnPage) ? 'hidden' : 'visible'} />
            <PaginationArrow
              changePage={this.changePage.bind(this, Math.ceil(props.records.length / props.maxItemsOnPage))}
              i = {Math.ceil(props.records.length / props.maxItemsOnPage)}
              direction={Math.ceil(props.records.length / props.maxItemsOnPage)}
              visibility={props.activePage === Math.ceil(props.records.length / props.maxItemsOnPage) ? 'hidden' : 'visible'} />
          </NewPagination>
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
