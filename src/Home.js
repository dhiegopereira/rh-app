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
                const posicao = 0
                for(let i = 0, j = 0; i < ponto.length-1; i=i+6, j++) {   
                    horaIni = ponto[i+1].split(':');
                    horaFin = ponto[i+4].split(':');

                    segundosIni = (parseInt(horaIni[0])*3600)+(parseInt(horaIni[1])*60)
                    segundosFin = (parseInt(horaFin[0])*3600)+(parseInt(horaFin[1])*60)
                    
                    horas = parseInt(((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) / 3600)
                    minutos = parseInt((((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) % 3600) / 60)

                    segundosTotal = segundosTotal + (horas*3600)+(minutos*60)

                    this.state.pontos[j] = {
                        batida,
                        horas,
                        minutos
                    }
                    batida++
                } 
                this.state.HorasTrabalhadas = parseInt(segundosTotal / 3600)
                this.state.MinutosTrabalhados = parseInt((segundosTotal % 3600) / 60) 
                this.state.isLoading = false 
                console.log(this.state.pontos)
            }else{
                console.log('vazio')
                this.state.isLoading = true 
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
                    <a className="nav-link" href="#">Ponto<span className="sr-only">(current)</span></a>
                  </li>
                </ul>
                <div className="form-inline my-2 my-lg-0 form-group" >
                  <label>Matrícula:</label>
                  <input ref='matricula' className="form-control mr-sm-2" type="search" placeholder="Matrícula" aria-label="Search"/>
                  <label>Data:</label>
                  <input ref='data' className="form-control mr-sm-2" type="date" placeholder="Search" aria-label="Data" />
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.getPonto()}>Verificar</button>
                </div>
              </div>
            </nav>
        )
    }
    listPoint(value){
        return(
            <div className='row row-content'>                    
                <div className="card  col-md-8 offset-md-2">
                    <div className="card-header bg-transparent">{value.batida}</div>
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
                {   
                    this.state.pontos.map(this.listPoint)
                }
            </>
        )
    }
}

export default Home