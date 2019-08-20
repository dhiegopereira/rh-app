import React, { Component } from 'react'
import dateFormat from 'dateformat'

import api from './Api'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }   
        this.menu = this.menu.bind(this)
        this.listPoint = this.listPoint.bind(this)
    }   
    getPonto(){
        //api.loginUser(user).then((res) => {})
        console.log('verificando...', this.refs.mat.value, dateFormat(this.refs.date.value, 'dd/mm/yyyy'))
        
        this.setState({
            isLoading: true
        })
      }
    menu(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <a className="navbar-brand" href="#"><img src='images/logo.png' width='200' /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Ponto<span className="sr-only">(current)</span></a>
                  </li>
                </ul>
                <div className="form-inline my-2 my-lg-0 form-group" >
                  <label>Matrícula:</label>
                  <input ref='mat' className="form-control mr-sm-2" type="search" placeholder="Matrícula" aria-label="Search"/>
                  <label>Data:</label>
                  <input ref='date' className="form-control mr-sm-2" type="date" placeholder="Search" aria-label="Data" />
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.getPonto()}>Verificar</button>
                </div>
              </div>
            </nav>
        )
    }
    listPoint(){
        return(
            <div className='row row-content'>                    
                    <div className="card  col-md-8 offset-md-2">
                        <div className="card-header bg-transparent">Batida 1</div>
                        <div className="card-body">
                            <div className="alert alert-primary" role="alert">
                                <p className='font-weight-bold'>Entrada: 07:45  </p>
                                <p className='font-weight-bold'>Saída: 12:00 </p>
                                <p className='font-weight-bold'>Permanência: 03:15</p>
                            </div>
                        </div>
                        <div className="card-header bg-transparent">Batida 2</div>
                        <div className="card-body">
                            <div className="alert alert-primary" role="alert">
                                <p className='font-weight-bold'>Entrada: 07:45  </p>
                                <p className='font-weight-bold'>Saída: 12:00 </p>
                                <p className='font-weight-bold'>Permanência: 03:15</p>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent font-weight-bold">Horas trabalhadas: 09:27</div>
                    </div>
                </div>
        )
    }
    
    render() {
        return(
            <>                
                {this.menu()}               
                {   this.state.isLoading &&
                    this.listPoint()
                }
            </>
        )
    }
}

export default Home