import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state = {
      stocks: [],
      displayStocks: [],
      portfolioStocks: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        stocks: data,
        diaplayStocks: data
      })
    })
  }

  addPortfolio = (stock) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  removeStock = (stock) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(s => s !== stock)
    })
  }

  filterStocks = (type) => {
    if(type !== 'All'){
      this.setState({
        displayStocks: this.state.stocks.filter(stock => stock.type === type)
      })
    } else{
      this.setState({
        displayStocks: this.state.stocks
      })
    }
  }

  sortStocks = (sortBy) => {
    let array = []
    switch(sortBy) {
      case 'Alphabetically':
        array = this.state.displayStocks.sort( (a,b) => a.name > b.name ? 1 : -1)
        break
      case 'Price':
        array = this.state.displayStocks.sort( (a,b) => a.price > b.price ? 1 : -1)
        break
      default:  
    }
    this.setState({
      displayStocks: array
    })
  }

  render() {
    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} sortStocks={this.sortStocks} />
          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} addPortfolio={this.addPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
