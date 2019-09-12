import React, { Component } from 'react'

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
    dateFormat(){
        const data = new Date(),
              dia  = data.getDate().toString(),
              diaF = (dia.length == 1) ? '0'+dia : dia,
              mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
              mesF = (mes.length == 1) ? '0'+mes : mes,
              anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    getPonto(){
        /*const ponto = {
            'matricula': this.refs.matricula.value == ''? '013915052' : this.refs.matricula.value,
            'dataIni': this.date(this.refs.data.value),
            'dataFim': this.date(this.refs.data.value)
        }*/ 
        const ponto = {
            'matricula': this.refs.matricula.value == ''? '013915052' : this.refs.matricula.value,
            'dataIni': this.refs.data.value == ''? this.dateFormat() : this.date(this.refs.data.value),
            'dataFim': this.refs.data.value == ''? this.dateFormat() : this.date(this.refs.data.value)
        }     
        console.log(ponto)   
        api.getPonto(ponto).then((res) => {
            if(res.data !== ''){   
                           
                this.setState({ 
                    pontos: res.data.pontos,
                    HorasTotal: res.data.HorasTotal,
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
              <a className="nav-link"><h5><span className="badge badge-secondary">Horas trabalhadas: {this.state.HorasTotal} </span></h5></a>
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
                        <div className="col-md-12 form-point" >
                            <label>Matrícula: </label>
                            <input ref='matricula' className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search"/>
                            <label>Data: </label>
                            <input ref='data' className="form-control mr-sm-2" type="date" placeholder="" aria-label="Data" />
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.getPonto()}>Verificar</button>
                        </div>
                          
                    { !this.state.isLoading && this.state.pontos.map(this.listPoint)}
                </div>
            </>
        )
    }
}

export default Home