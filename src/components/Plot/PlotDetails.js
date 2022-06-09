import { Container, Button, Icon, Card } from 'semantic-ui-react';
import * as ACTIONS from '../../redux_hooks/constants';

const PlotDetails = ({ state, dispatch }) => {
  const {
    web3,
    contract,
    account,
    landName,
    landOwner,
    landId,
    cost,
    hasOwner,
  } = state;
  const { SET_ERROR, SET_BUILDINGS } = ACTIONS;

  const buyHandler = async (_id) => {
    try {
      await contract.methods
        .mint(_id)
        .send({ from: account, value: web3.utils.toWei('1', 'ether') });
      const getBuildings = await contract.methods.getBuildings().call();
      const name = getBuildings[_id - 1].name;
      const owner = getBuildings[_id - 1].owner;

      dispatch({
        type: SET_BUILDINGS,
        value: {
          buildings: getBuildings,
          landName: name,
          landOwner: owner,
        },
      });
    } catch (error) {
      dispatch({ type: SET_ERROR, value: error });
    }
  };
  return (
    <Container style={{ position: 'absolute', top: '77px', left: '10px' }}>
      {account && (
        <Card>
          <Card.Content>
            <Card.Header>{landName}</Card.Header>
            <Card.Meta>Land Id: {landId}</Card.Meta>
            <Card.Description>
              <Icon name='user' />
              Land Owner:
              {landOwner !== 'No Owner'
                ? `${landOwner.slice(0, 5)}...${landOwner.slice(38, 42)}`
                : `${landOwner}`}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {!hasOwner && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div className='info_owner'>
                  <h4>Cost: {`${cost} ETH`}</h4>
                </div>
                <Button
                  style={{ width: 'auto' }}
                  inverted
                  color='green'
                  onClick={() => buyHandler(landId)}
                >
                  Buy Property
                </Button>
              </div>
            )}
          </Card.Content>
        </Card>
      )}
    </Container>
  );
};

export default PlotDetails;
