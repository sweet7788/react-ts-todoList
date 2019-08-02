import * as React from 'react'

import { IToDos } from '../interface'

import './list.styl'

interface IProps {
    name?: string;
    age?: number;
    content?: string;
    tasklist : IToDos[]
    className? : string;
}
interface IState {
    currentIndex : number
    tabsName : string[]
}

export default class List extends React.Component<IProps,IState> {
    constructor(props: IProps){
        super(props)
        this.state  = {
            currentIndex : 0,
            tabsName: ['全部','已完成','未完成']
        } as IState
        
        this.tabClick = this.tabClick.bind(this)
    }
    
    public render(){
        const tabsClass = 'btn flex-grow-1'
        return (
            <div>
                <div className="tab d-flex mt-3">
                    {
                        Array.isArray(this.state.tabsName) ? this.state.tabsName.map((ele,ind)=>{
                            return (
                                <div onClick={ this.tabClick } key={ind} className={this.state.currentIndex === ind ? tabsClass + ' active' : tabsClass}>
                                    { ele }
                                </div>
                            )
                        }):''
                    }
                </div>
                {
                    this.props.tasklist.length>0 ?this.props.tasklist.map((ele,ind)=>{
                        return (
                            <div className="d-flex mt-2 justify-content-between border rounded px-3 py-2" key = {ind}>
                                <div>
                                    { ele.name }
                                </div>
                                <div>
                                    { ele.status }
                                </div>
                            </div>
                        )
                    }):''
                }
                <div className="myBtn px-2 mt-2">
                    标记完成
                </div>
            </div>
        )
    }
    public tabClick(e:React.MouseEvent){
        this.setState({
            currentIndex: this.state.tabsName.indexOf(e.currentTarget.innerHTML)
        })
    }
}