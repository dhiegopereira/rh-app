import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';

import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import api from './Api'
import Menu from './Menu'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            startDate: new Date()
        }  
        this.handleChange = this.handleChange.bind(this);      
    }
    handleChange(date) {
        //console.log(date)
        console.log(dateFormat(date, 'dd/mm/yyyy'))
        this.setState({
          startDate: date
        });
      }
    componentDidMount(){
        //api.loginUser(user).then((res) => {})            
    }  
    
    render() {
        return(
            <>
            <Menu/> 
            <section id="intro" className="intro-section"> 
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
            </section>
            </>
        )
    }
}

export default Home