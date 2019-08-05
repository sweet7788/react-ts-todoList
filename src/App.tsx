import * as React from 'react';
import './App.styl';
import './bootstrap.css';

import { ITab, IToDo } from './interface'

import Input from './compoments/Input'
import List from './compoments/List'


interface IState {
  tabName: string
  taskName: string
  tasklist: IToDo[]
  allTaskList: IToDo[]
}

class App extends React.Component<object,IState> {
  constructor(props:object){
    super(props)
    
    this.state = {
      allTaskList: [],
      tabName: '全部',
      taskName: '',
      tasklist: [],
      
    } as IState
    this.onInput = this.onInput.bind(this)
    this.addTask = this.addTask.bind(this)
    this.clearTask = this.clearTask.bind(this)
    this.onTab = this.onTab.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
  }
  public render() {
    return (
      <div className="App p-3">
        <div className="title">Todos</div>
        <div className="d-flex justify-content-between">
          <Input className="mr-2" onInput = { this.onInput } placeHolder={"please input the task name"}/>
          <div className="myBtn px-2" onClick = {this.addTask}>
            添加
          </div>
          <div className="myBtn px-2" onClick = {this.clearTask}>
            清空
          </div>
        </div>
        <div>
          <List tasklist={this.state.tasklist} onTab={this.onTab} onStatusChange={ this.onStatusChange }/>
        </div>
      </div>
    );
  }
  public onInput(e: React.FormEvent<HTMLInputElement>){
    this.setState({
      taskName: e.currentTarget.value as string
    })
  }
  public onTab(tab: ITab){
    const list : IToDo[] = this.state.allTaskList.filter(ele=>{
      return ele.status === tab.value || tab.value === 'all'
    })
    this.setState({
      tabName: tab.value as string,
      tasklist: list as IToDo[]
    })
  }
  public onStatusChange(status: IToDo["status"],key : number){
    const allTaskList = this.state.allTaskList
    const tasklist = this.state.tasklist
    tasklist[key].status = status
    allTaskList[key].status = status
    this.setState({
      allTaskList,
      tasklist
    })
  }
  private addTask(){
    const list : IToDo[] = this.state.tasklist
    const name : string = this.state.taskName
    if(name.length !== 0){
      list.push({
        name,
        status: 'doing'
      })
      this.setState({
        allTaskList: list as IToDo[],
        tasklist: list as IToDo[]
      })
    }
  }
  private clearTask(){
    const tabName: string = this.state.tabName
    const arr: IToDo[] = this.state.tasklist.filter(ele=>{
      return ele.status !== tabName
    })
    this.setState({
      allTaskList: arr as IToDo[],
      tasklist: arr as IToDo[]
    })
  }
}

export default App;
