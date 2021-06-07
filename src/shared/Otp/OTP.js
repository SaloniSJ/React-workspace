import React,{Component} from 'react';
import './OTP.css'

class OTP extends Component{

    onKeyUpEvent=(event)=>{
        event.preventDefault();
        if(event.nativeEvent.srcElement.value.length===1 && event.nativeEvent.srcElement.nextElementSibling!==null){
            event.nativeEvent.srcElement.nextElementSibling.focus()
        }else{
            event.nativeEvent.srcElement.focus();
        }
        if(event.keyCode==8){
            if(event.nativeEvent.srcElement.value.length=='' && event.nativeEvent.srcElement.previousElementSibling!=null){
                event.nativeEvent.srcElement.previousElementSibling.focus()
            }else{
                event.nativeEvent.srcElement.focus();
            }
        }
    }

    render(){
        return (
            <div className="otp mt-2 otpmaindiv">
                <input type="phone" value={this.props.state.id1} name="id1" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                <input type="phone" value={this.props.state.id2} name="id2" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                <input type="phone" value={this.props.state.id3} name="id3" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                <input type="phone" value={this.props.state.id4} name="id4" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                <input type="phone" value={this.props.state.id5} name="id5" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                <input type="phone" value={this.props.state.id6} name="id6" onChange={this.props.onChange} onKeyUp={this.onKeyUpEvent} maxLength="1" />
                {/* {props.helperText?<div></div>:null} */}
            </div>
        )
    }
    
}

export default OTP