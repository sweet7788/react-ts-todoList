import * as React from 'react'

import './input.styl'

interface IProps{
    className? : string
    placeHolder? : string
    onInput(e: React.FormEvent<HTMLInputElement>) :void
}

export default class Input extends React.Component<IProps>{
    constructor(props:IProps){
        super(props)
    }
    public render(){
        return (
            <div className="contain">
                <div className="input">
                    <input onInput={this.props.onInput} placeholder={this.props.placeHolder}/>
                </div>
            </div>
        )
    }
}