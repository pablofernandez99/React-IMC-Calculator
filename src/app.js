import React from 'react'


function getIMC(peso, altura) {

  const alturaEnMetros = altura / 100

  return peso / Math.pow(alturaEnMetros, 2)
}

function tryConvert(peso, altura, convert) {
  const inputPeso = parseFloat(peso)
  const inputAltura = parseFloat(altura)

  if (Number.isNaN(inputPeso) || Number.isNaN(inputAltura)) {
    return ''
  }
  const output = convert(inputPeso, inputAltura)
  const rounded = Math.round(output * 10) / 10
  return rounded.toString()
}



class ImcInput extends React.Component {
  constructor(props) {
    super(props)

    this.handlePesochange = this.handlePesochange.bind(this)
    this.handleAlturaChange = this.handleAlturaChange.bind(this)
    this.handleResultChange = this.handleResultChange.bind(this)
  }

  handlePesochange(e) {
    this.props.onPesoChange(e.target.value)
  }

  handleAlturaChange(e) {
    this.props.onAlturaChange(e.target.value)
  }

  handleResultChange(e) {
    this.props.onResultChange(e.target.value)
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-5">
            <form onSubmit={this.props.onSubmit} className="mb-4">
              <div className="form-group">
                <label>
                  Peso en kilogramos:
                  <input type="text" className="form-control" placeholder="ej: 65" value={this.props.peso} onChange={this.handlePesochange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Altura en centimetros:
                  <input type="text" className="form-control" placeholder="ej: 178" value={this.props.altura} onChange={this.handleAlturaChange} />
                </label>
              </div>
              <button className="btn btn-primary">
                Calcular
              </button>
            </form>
            <label>
              Resultado:
              <input className="form-control" value={this.props.imcResult} onChange={this.handleResultChange}/>
            </label>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Composición corporal</th>
                  <th scope="col">Índice de masa corporal (IMC)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Peso inferior al normal</td>
                  <td>Menos de 18.5</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>18.5 - 24.9</td>
                </tr>
                <tr>
                  <td>Peso superior al normal</td>
                  <td>25.0 - 29.9</td>
                </tr>
                <tr>
                  <td>Obesidad</td>
                  <td>Más de 30.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peso: '',
      altura: '',
      resultado: '',
    }

    this.handlePesochange = this.handlePesochange.bind(this)
    this.handleAlturaChange = this.handleAlturaChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResultChange = this.handleResultChange.bind(this)
  }

  handlePesochange(peso) {
    this.setState({
      peso: peso
    })
  }

  handleAlturaChange(altura) {
    this.setState({
      altura: altura
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const peso = this.state.peso
    const altura = this.state.altura


    this.setState({
      resultado: tryConvert(peso, altura, getIMC)
    })
  }
  handleResultChange(result) {
    this.setState({
      resultado: result
    })
  }
 

  render() {
    return (
      <div className="mt-5">
        <ImcInput
          peso={this.state.peso}
          altura={this.state.altura}
          imcResult={this.state.resultado}
          onPesoChange={this.handlePesochange}
          onAlturaChange={this.handleAlturaChange}
          onSubmit={this.handleSubmit}
          onResultChange={this.handleResultChange}
        />
      </div>
    )
  }
}

export default Calculator