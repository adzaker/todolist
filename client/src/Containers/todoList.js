import React from "react";
import ActionForm from "../Components/actionForm";
import ListItem from "../Components/listItem";
import TableList from "../Components/tableList";
import { connect } from 'react-redux';
import preloaderUrl from '../loader.gif';
import { addCase, switchDisable, deleteItem, changePage, loadFromServer, clearTable, showDetails, changeDetailsCount, switchPreloader, filterList, changeSortingTable, createSecretString } from '../Actions';
import FilterForm from "../Components/filterForm";
import NewPagination from "../Components/NewPagination";
import PaginationArrow from "../Components/PaginationArrow";
import {alertMessage} from "../Constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faFileUpload, faSync, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';

class TodoList extends React.Component {
  addCase(e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input');
    let {dispatch} = this.props;
    dispatch(addCase(input.value));
    input.value = "";
  }

  switchDisable(id) {
    let {dispatch} = this.props;
    dispatch(switchDisable(id));
  }

  deleteItem(id) {
    let {dispatch} = this.props;
    dispatch(deleteItem(id));
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
    if (!this.props.records.records.length) return false;
    const {records} = this.props.records;
    const jsonObject = {"records":[...records]};
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(
        new Blob([JSON.stringify(jsonObject, null, 2)], {type : 'application/json'})
    );
    a.setAttribute('download', '_userRecords.json');
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
    const target = e.target.tagName.toLowerCase() === 'span' ? e.target : e.target.closest('span');
    dispatch(changeSortingTable(target.id, target.className));
  }

  createSecretString(string) {
    let {dispatch} = this.props;
    dispatch(createSecretString(string));
  }

  saveOnServer(e) {
    e.preventDefault();
    const {records} = this.props.records;
    if (!records.length) {
      return false;
    }
    fetch('/userrecords', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(records)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = 'Something went wrong';
          switch (response.status) {
            case 413:
              errorMessage = 'Слишком большой файл для сервера. Попробуйте скачать локально';
              break;
            case 404:
              errorMessage = 'Сервер не отвечает. Попробуйте позднее.';
              break;
            default:
              break;
          }
          throw new Error(errorMessage);
        }
      })
      .then(response => {
        this.createSecretString(response.secretString);
        this.clearTable();
      })
      .catch(error => {
        console.error(error);
        alert(error);
      })
  }

  loadSavedFile(e) {
    e.preventDefault();
    let {dispatch} = this.props;
    const input = e.target.closest('form').querySelector('input');
    if (!input.value.length) {
      return false;
    }
    fetch('/userrecords/secret',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: input.value})
    })
      .then((response) => {
        this.switchPreloader();
        return response.json();
      })
      .then((myJson) => {
        this.clearTable();
        dispatch(loadFromServer(myJson));
        this.switchPreloader();
      });
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
      <div className={`List ${props.theme}`}>
        <header>
          <h2>Список задач</h2>
          <div className="headerForm">
            <input type="file" id="file" onChange={this.uploadFile.bind(this)}/>
            <label htmlFor="file">
              <span className="buttonTitle">Загрузить файл с компьтера</span>
              <FontAwesomeIcon icon={faFileUpload} />
            </label>
            <button className="tableButton" id="download"  onClick={this.downloadFile.bind(this)}>
              <span className="buttonTitle">Скачать файл локально</span>
              <FontAwesomeIcon icon={faFileDownload} />
            </button>
            <button className="tableButton" onClick={this.clearTable.bind(this)}>
              <span className="buttonTitle">Очистить таблицу</span>
              <FontAwesomeIcon icon={faSync}/>
            </button>
          </div>
          <div className="headerForm">
            <button className="tableButton" id="saveOnServer" onClick={this.saveOnServer.bind(this)}>
              <span className="buttonTitle">Отправить на сервер</span>
              <FontAwesomeIcon icon={faDownload}/>
            </button>
            <form>
              <input type="text" id="loadFromServerInput" placeholder="Контрольный идентификатор" className="coloredInput"/>
              <button type="submit" className="tableButton" id="loadFromServerButton" onClick={this.loadSavedFile.bind(this)}>
                <span className="buttonTitle">Загрузить файл с сервера</span>
                <FontAwesomeIcon icon={faUpload}/>
              </button>
            </form>
          </div>
          {props.secretStringValue.length > 0 && <div className="headerForm">
            <label htmlFor="secretString">Ваш идентификатор:</label>
            <input id="secretString" type="text" defaultValue={props.secretStringValue} readOnly="readonly" className="coloredInput"/>
          </div>}
          <div className="headerForm">
            <FilterForm filterList={this.filterList.bind(this)}/>
            <ActionForm addCase={this.addCase.bind(this)} />
            {/*<button className="tableButton" onClick={this.loadFromServer.bind(this, '/testrecords')}>*/}
            {/*  <span className="buttonTitle">Загрузить пример</span>*/}
            {/*</button>*/}
            <select defaultValue={10} onChange={this.changeDetailsCount.bind(this)} className="coloredInput -select">
              <option value="5">5</option>
              <option value="10">10</option>
              {props.records.length >= 25 && <option value="25">25</option>}
              {props.records.length >= 50 && <option value="50">50</option>}
              {props.records.length >= 100 && <option value="100">100</option>}
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
                  switchThis={this.switchDisable.bind(this, record.id)}
                  deleteThis={this.deleteItem.bind(this, record.id)}
                  showDetails={this.showDetails.bind(this)} />
              }
              return false;
            })}
          </TableList>
          <NewPagination props={props} isRecords={props.records.length}>
            <PaginationArrow
              changePage={this.changePage.bind(this, 1)}
              i = {1}
              content='1'
              visibility={props.activePage === 1 ? 'hidden' : 'visible'} />
            <PaginationArrow
              changePage={this.changePage.bind(this, props.activePage - 1)}
              i = {props.activePage - 1}
              content='chevron-left'
              visibility={props.activePage === 1 ? 'hidden' : 'visible'} />
            <li>
              <input id="pageInput" type="text" className="coloredInput" value={props.activePage} onChange={this.changePageInput.bind(this)} />
            </li>
            <PaginationArrow
              changePage={this.changePage.bind(this, props.activePage + 1)}
              i = {props.activePage + 1}
              content='chevron-right'
              visibility={props.activePage === Math.ceil(props.records.length / props.maxItemsOnPage) ? 'hidden' : 'visible'} />
            <PaginationArrow
              changePage={this.changePage.bind(this, Math.ceil(props.records.length / props.maxItemsOnPage))}
              i = {Math.ceil(props.records.length / props.maxItemsOnPage)}
              content={Math.ceil(props.records.length / props.maxItemsOnPage)}
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
