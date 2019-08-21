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
            HorasTrabalhadas: 0,
            MinutosTrabalhados: 0
        }   
        this.menu = this.menu.bind(this)
        this.listPoint = this.listPoint.bind(this)
    }  
    componentDidMount(){
        this.getPonto()
    }
    leftPad(value, totalWidth, paddingChar){
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    } 
    getPonto(){
        const ponto = {
            'matricula': this.refs.matricula.value,
	        'data': dateFormat(this.refs.data.value, 'dd/mm/yyyy')
        }
        console.log(ponto)
        api.getPonto(ponto).then((res) => {
            if(res.data !== ''){
                const ponto = res.data.split(';')

                let batida = 1, horaIni, horaFin, segundosIni, segundosFin, horas, minutos, segundosTotal = 0
                const p = []
                for(let i = 0, j = 0; i < ponto.length-1; i=i+6, j++) {   
                    horaIni = ponto[i+1].split(':');
                    horaFin = ponto[i+4].split(':');

                    segundosIni = (parseInt(horaIni[0])*3600)+(parseInt(horaIni[1])*60)
                    segundosFin = (parseInt(horaFin[0])*3600)+(parseInt(horaFin[1])*60)
                    
                    horas = parseInt(((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) / 3600)
                    minutos = parseInt((((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) % 3600) / 60)

                    segundosTotal = segundosTotal + (horas*3600)+(minutos*60)

                    p[j] = {
                        entrada: ponto[i+1],
                        saida: ponto[i+4],
                        batida,
                        horas,
                        minutos
                    }
                    batida++
                } 
                this.setState({ 
                    pontos: p,
                    HorasTrabalhadas: parseInt(segundosTotal / 3600),
                    MinutosTrabalhados: parseInt((segundosTotal % 3600) / 60),
                    isLoading: false                   
                })                
            }else{
                this.setState({ 
                    pontos: [],
                    HorasTrabalhadas: '00',
                    MinutosTrabalhados: '00',
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
                    <a className="nav-link"><h5><span class="badge badge-secondary">Horas trabalhadas: {this.leftPad(this.state.HorasTrabalhadas, 2)}:{this.leftPad(this.state.MinutosTrabalhados, 2)} </span></h5></a>
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
                        <p className='font-weight-bold'>Entrada: {value.entrada}  </p>
                        <p className='font-weight-bold'>Saída: {value.saida} </p>
                        <p className='font-weight-bold'>Permanência: {this.leftPad(value.horas, 2)}:{this.leftPad(value.minutos, 2)}</p>
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