import React, { Component } from 'react'


class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }    
    render() {
        return(
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
              <div className="container">
                <div className="navbar-header page-scroll">
                  <a className="navbar-brand page-scroll" href="#page-top">
                      <img src="/images/logo.png" height="50" />
                  </a>
                </div> 
              </div>
            </nav> 
        )
    }
}

export default Menu