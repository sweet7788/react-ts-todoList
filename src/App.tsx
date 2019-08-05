import * as React from 'react';
import './App.styl';
import './bootstrap.css';

import { ITab, IToDos } from './interface'

import Input from './compoments/Input'
import List from './compoments/List'


interface IState {
  tabName: string
  taskName: string
  tasklist: IToDos[]
  allTaskList: IToDos[]
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
          <List tasklist={this.state.tasklist} onTab={this.onTab}/>
        </div>
      </div>
    );
  }
  public onInput(e: React.FormEvent<HTMLInputElement>){
    this.setState({
      taskName: e.currentTarget.value
    })
  }
  public onTab(tab: ITab){
    const list = this.state.allTaskList.filter(ele=>{
      return ele.status === tab.value || tab.value === 'all'
    })
    this.setState({
      tabName: tab.value,
      tasklist: list as IToDos[]
    })
  }
  private addTask(){
    const list = this.state.tasklist
    list.push({
      name:this.state.taskName,
      status: 'doing'
    })
    this.setState({
      allTaskList: list as IToDos[],
      tasklist: list as IToDos[]
    })
  }
  private clearTask(){
    const tabName: string = this.state.tabName
    const arr: IToDos[] = this.state.tasklist.filter(ele=>{
      return ele.status === tabName
    })
    this.setState({
      allTaskList: arr as IToDos[],
      tasklist: arr as IToDos[]
    })
  }
}

export default App;
