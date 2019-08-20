import React, { Component } from 'react'
import convert from 'xml-js'
import dateFormat from 'dateformat'

import api from './Api'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            pontos: []
        }   
        this.menu = this.menu.bind(this)
        this.listPoint = this.listPoint.bind(this)
    }  
    leftPad(value, totalWidth, paddingChar){
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    } 
    getPonto(){
        const ponto = {
            'mat': this.refs.mat.value,
            'dat': dateFormat(this.refs.date.value, 'dd/mm/yyyy')
        }
        api.getPonto(ponto).then((res) => {
            const response = res.data         
            const dataTime = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 2}))
            if(dataTime.string._text){
                const ponto = dataTime.string._text.split(';')
                let batida = 1, HorasTrabalhadas, MinutosTrabalhados, horaIni, horaFin, segundosIni, segundosFin, horas, minutos, segundosTotal = 0
                for(let i = 0; i < ponto.length-1; i=i+6) {   
                    horaIni = ponto[i+1].split(':');
                    horaFin = ponto[i+4].split(':');
                    segundosIni = (parseInt(horaIni[0])*3600)+(parseInt(horaIni[1])*60)
                    segundosFin = (parseInt(horaFin[0])*3600)+(parseInt(horaFin[1])*60)          
                    horas = parseInt(((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) / 3600)
                    minutos = parseInt((((segundosIni > segundosFin) ? segundosIni - segundosFin : segundosFin - segundosIni) % 3600) / 60)
                    segundosTotal = segundosTotal + (horas*3600)+(minutos*60)  
                    console.log('Batida: ', batida + '->' + this.leftPad(horas, 2) + ':' + this.leftPad(minutos, 2))
                    batida++
                } 
                HorasTrabalhadas = parseInt(segundosTotal / 3600)
                MinutosTrabalhados = parseInt((segundosTotal % 3600) / 60)
                console.log('Horas Total: ', this.leftPad(HorasTrabalhadas, 2) + ":" + this.leftPad(MinutosTrabalhados, 2))
            }else{
                console.log('Sem registro para esta data: ', dateFormat(this.refs.date.value, 'dd/mm/yyyy'))
            }
        })
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
                  <input ref='dat' className="form-control mr-sm-2" type="date" placeholder="Search" aria-label="Data" />
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