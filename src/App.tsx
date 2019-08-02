import * as React from 'react';
import './App.styl';
import './bootstrap.css';

import Input from './compoments/Input'
import List from './compoments/List'

import { IToDos } from './interface'

interface IState {
  taskName: string
  tasklist: IToDos[]
}

class App extends React.Component<object,IState> {
  constructor(props:object){
    super(props)
    
    this.state = {
      taskName: '',
      tasklist: []
    } as IState
    this.onInput = this.onInput.bind(this)
    this.addTask = this.addTask.bind(this)
    this.clearTask = this.clearTask.bind(this)

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
          <List tasklist={this.state.tasklist} />
        </div>
      </div>
    );
  }
  public onInput(e: React.FormEvent<HTMLInputElement>){
    this.setState({
      taskName: e.currentTarget.value
    })
  }
  private addTask(){
    const list = this.state.tasklist
    list.push({
      name:this.state.taskName,
      status: 'doing'
    })
    this.setState({
      tasklist: list as IToDos[]
    })
  }
  private clearTask(){
    // console.log('a')
    this.setState({
      tasklist: []
    })
  }
}

export default App;
