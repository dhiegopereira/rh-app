import React, { Component } from 'react'
import convert from 'xml-js'
import dateFormat from 'dateformat'
import axios from 'axios'

import api from './Api'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            pontos: [],
            HorasTotal: 0,
        }   
        this.menu = this.menu.bind(this)
        this.listPoint = this.listPoint.bind(this)
    }  
    componentDidMount(){
        this.getPonto()
    } 
    date(str){ 
        return str.split("-").reduce(function(p, c){ return c + "/" +p })
    }
    getPonto(){
        const ponto = {
            'matricula': this.refs.matricula.value,
            'dataIni': this.date(this.refs.data.value),
            'dataFim': this.date(this.refs.data.value)
        }
        api.getPonto(ponto).then((res) => {
            if(res.data !== ''){               
                this.setState({ 
                    pontos: res.data.pontos,
                    HorasTotal:res.data.HorasTotal,
                    isLoading: false                   
                })                
            }else{
                this.setState({ 
                    pontos: [],
                    HorasTrabalhadas: '00:00',
                    isLoading: true                   
                })  
            }
                    
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
                    <a className="nav-link"><h5><span class="badge badge-secondary">Horas trabalhadas: {this.state.HorasTotal} </span></h5></a>
                  </li>
                </ul>
                <div className="form-inline my-2 my-lg-0 form-group" >
                  <label>Matrícula: </label>
                  <input ref='matricula' className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search"/>
                  <label>Data: </label>
                  <input ref='data' className="form-control mr-sm-2" type="date" placeholder="" aria-label="Data" />
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.getPonto()}>Verificar</button>
                </div>
              </div>
            </nav>
        )
    }
    listPoint(value){
        return(                            
            <div className="card  col-md-8 offset-md-2">
                <div className="card-header bg-transparent">Batida {value.batida}</div>
                <div className="card-body">
                    <div className="alert alert-primary" role="alert">
                        <p className='font-weight-bold'>Data: {value.data}</p>
                        <p className='font-weight-bold'>Entrada: {value.entrada}</p>
                        <p className='font-weight-bold'>Saída: {value.saida}</p>
                        <p className='font-weight-bold'>Permanência: {value.permanencia}</p>
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        return(
            <>                
                {this.menu()}    
                <div className='row row-content'>        
                { !this.state.isLoading && this.state.pontos.map(this.listPoint)}
                </div>
            </>
        )
    }
}

export default Home