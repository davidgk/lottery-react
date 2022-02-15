import web3 from "../web3";


const Subtitle = ({manager, players, balance}) => {
    let aBalance = web3.utils.fromWei(balance, 'ether');
    return (
        <div>
            <p>
                This contract is managed by {manager}.
            </p>
            <p>
                There are currently {players.length} people entered, competing to win {aBalance} ethers!.
            </p>
        </div>
    );
}

export default Subtitle