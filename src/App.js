import './App.css';
import web3 from './web3';
import lottery from './lottery';
import {Component} from "react";
import "./App.css"
import SubtitleInfo from "./components/subtitleInfo";

class App extends Component{
    state = {
        manager: '',
        players: [],
        balance : '',
        value: '',
        message:''
    };

    async componentDidMount() {
        try {
            const manager = await lottery.methods.manager().call();
            this.setState({manager})
            await this.setPlayersAndBalance();
        } catch (e) {
            console.log(e)
        }
    }

    async setPlayersAndBalance() {
        const players = await lottery.methods.getPlayers().call();
        const balance = String(await lottery.methods.balance().call());
        this.setState({ players, balance})
    }

    onSubmit = async (formSubmissionEvent) => {
        formSubmissionEvent.preventDefault();
        const accounts = await web3.eth.getAccounts();
        let value = web3.utils.toWei(this.state.value, 'ether');
        this.setState({message: 'Waiting on transaction success...'})
        // this line taks in real world 15''
        await lottery.methods.enter().send({
            from: accounts[0],
            value
            });
        this.setState({message: 'You have been entered!'})
        await this.setPlayersAndBalance();
    }

    pickAWinner = async () =>  {
        debugger;
        const accounts = await web3.eth.getAccounts();
        this.setState({message: 'Waiting on transaction success...'})
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[0],
            });
            const lastWinner =  await lottery.methods.winner().call();
            this.setState({message: 'A winner has been picked! it was ' + lastWinner  })
            await this.setPlayersAndBalance();
        } catch (e) {
            console.log(e)
            this.setState({message: 'Transaction Fail: ' +  e.message })
        }
    }

    render () {
        return (
            <div className="App">
                <h2>Lottery Contract</h2>
                <SubtitleInfo balance={this.state.balance} manager={this.state.manager} players={this.state.players}/>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label>Amount of ether to enter: </label>
                        <input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </div>
                    <button className="button">Enter</button>
                </form>
                <hr/>
                <h4>Time to pick a winner ?</h4>
                <button onClick={this.pickAWinner} className="button">Pick a Winner</button>
                <hr/>
                <h1> {this.state.message}</h1>
                <hr/>
            </div>
        );
    }

}

export default App;
