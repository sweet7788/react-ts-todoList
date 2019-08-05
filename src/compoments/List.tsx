import * as React from 'react'

import './list.styl'

import { ITab, IToDo } from '../interface'

interface IProps {
    name?: string;
    age?: number;
    content?: string;
    tasklist : IToDo[]
    className? : string;
    onTab?: (e: ITab) =>void
    onStatusChange?: (status: IToDo["name"],key: number)=>void
}
// interface ITabs {
//     name:  '全部'|'已完成'|'未完成'
//     value: 'all'|'completed'|'doing'
// }
interface IState {
    currentIndex : number
    tabs : ITab[],
    activeIndex? : number
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
                }],
        } as IState
        
        this.tabClick = this.tabClick.bind(this)
        this.itemClick = this.itemClick.bind(this)
        this.signFinished = this.signFinished.bind(this)
    }
    
    public render(){
        const tabsClass = 'btn flex-grow-1'
        const itemClass = 'd-flex mt-2 justify-content-between border rounded px-3 py-2 list-item'
        return (
            <div>
                <div className="tab d-flex mt-3">
                    {
                        Array.isArray(this.state.tabs) ? this.state.tabs.map((ele,ind)=>{
                            return (
                                <div onClick={ this.tabClick.bind(this,ele as ITab) } key={ind} className={this.state.currentIndex === ind ? tabsClass + ' active' : tabsClass}>
                                    { ele.name as string }
                                </div>
                            )
                        }):''
                    }
                </div>
                {
                    this.props.tasklist.length>0 ?this.props.tasklist.map((ele,ind)=>{
                        return (
                            <div className={typeof(this.state.activeIndex) === 'number'&&this.state.activeIndex === ind ? itemClass + ' active' : itemClass} key = {ind} onClick= {this.itemClick.bind(this,ele as IToDo,ind as number)}>
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
                <div className="myBtn px-2 mt-2" onClick= {this.signFinished}>
                    标记完成
                </div>
            </div>
        )
    }
    public tabClick(tab : ITab){
        this.setState({
            currentIndex: this.state.tabs.findIndex((ele,ind)=>{
                if(ele.name === tab.name){
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
    public signFinished(){
        if(typeof(this.state.currentIndex) === 'number'){
            const onStatusChange = this.props.onStatusChange
            const index = this.state.activeIndex
            if(onStatusChange){
                onStatusChange('completed',typeof(index) === 'number' ? index : -1)
            }
        }
    }
    private itemClick(item: IToDo, ind: number){
        // console.log(item)
        this.setState({
            activeIndex : ind
        })
    }
    
}