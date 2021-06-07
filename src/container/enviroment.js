import React, { Component } from 'react'

export default class enviroment extends Component {

    state={
        enviroment:'production',
        APIURL:'http://18.133.81.78:8086/business'
    }

    setEnvironment=(env)=>{
        this.setState({enviroment:env})
    }

    returnAPIURL(){

        if(this.state.enviroment=="production") return "http://18.133.81.78:8086/business" 
        if(this.state.enviroment=="test") return "http://18.133.81.78:8086/business/test"
    }



}
