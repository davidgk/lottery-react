import './App.css';
import web3 from './web3';
import lottery from './lottery';
import {Component} from "react";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {manager:'', account:''}
    }
    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        this.setState({manager})

    }

    render () {
        return (
            <div className="App">
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
            </div>
        );
    }

}

export default App;
