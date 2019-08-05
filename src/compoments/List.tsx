import * as React from 'react'

import './list.styl'

import { ITab, IToDos } from '../interface'

interface IProps {
    name?: string;
    age?: number;
    content?: string;
    tasklist : IToDos[]
    className? : string;
    onTab?: (e: ITab) =>void
}
// interface ITabs {
//     name:  '全部'|'已完成'|'未完成'
//     value: 'all'|'completed'|'doing'
// }
interface IState {
    currentIndex : number
    tabs : ITab[]
}

export default class List extends React.Component<IProps,IState> {
    constructor(props: IProps){
        super(props)
        this.state  = {
            currentIndex : 0,
            tabs: [
                {
                    name: '全部',
                    value: 'all'
                },{
                    name: '已完成',
                    value: 'completed'
                },{
                    name: '未完成',
                    value: 'doing'
                }]
        } as IState
        
        this.tabClick = this.tabClick.bind(this)
    }
    
    public render(){
        const tabsClass = 'btn flex-grow-1'
        return (
            <div>
                <div className="tab d-flex mt-3">
                    {
                        Array.isArray(this.state.tabs) ? this.state.tabs.map((ele,ind)=>{
                            return (
                                <div onClick={ this.tabClick } key={ind} className={this.state.currentIndex === ind ? tabsClass + ' active' : tabsClass}>
                                    { ele.name as string }
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
            currentIndex: this.state.tabs.findIndex((ele,ind)=>{
                if(ele.name === e.currentTarget.innerHTML){
                    return true
                }else{
                    return false
                }
            })
        },()=>{
            if(this.props.onTab){
                this.props.onTab(this.state.tabs[this.state.currentIndex] as ITab)
            }
        })
    }
}