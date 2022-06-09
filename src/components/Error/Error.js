import { Container, Button, Message, Icon } from 'semantic-ui-react';
import * as ACTIONS from '../../redux_hooks/constants';

const Error = ({ errors, wrongNetwork, dispatch }) => {
  const { SET_ERROR, TOGGLE_NETWORK } = ACTIONS;
  const styleEL = {
    position: 'absolute',
    top: '50vh',
    maxWidth: '500px',
    left: 0,
    right: 0,
    margin: 'auto',
  };
  return (
    <Container>
      {errors && (
        <Message negative style={styleEL}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Message.Header>Code: {errors?.code}</Message.Header>
            <Button
              style={{
                padding: '0px',
                background: 'none',
                color: 'red',
                marginRight: '0px',
              }}
              onClick={() => dispatch({ type: SET_ERROR, value: null })}
            >
              <Icon name='close' />
            </Button>
          </div>
          <p style={{ wordBreak: 'break-word' }}>{errors?.message}</p>
        </Message>
      )}
      {wrongNetwork && (
        <Message negative style={styleEL}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Message.Header>Wrong Network</Message.Header>
            <Button
              style={{
                padding: '0px',
                background: 'none',
                color: 'red',
                marginRight: '0px',
              }}
              onClick={() => dispatch({ type: TOGGLE_NETWORK })}
            >
              <Icon name='close' />
            </Button>
          </div>
          <p>Please select from Metamask - Rinkeby Test Network (id 4)</p>
        </Message>
      )}
    </Container>
  );
};

export default Error;
