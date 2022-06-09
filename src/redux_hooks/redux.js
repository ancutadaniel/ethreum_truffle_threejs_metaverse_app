import * as ACTIONS from './constants';

export const reducer = (state, action) => {
  const {
    SET_WEB3,
    SET_ERROR,
    SET_LOADING,
    ACCOUNT_CHANGE,
    TOGGLE_NETWORK,
    NETWORK_CHANGE,
    SET_BUILDINGS,
    SET_LAND_ID_NAME,
    SET_LAND_OWNER,
  } = ACTIONS;

  // console.log(action.type, action.value);

  switch (action.type) {
    case SET_WEB3:
      return {
        ...state,
        ...action.value,
      };

    case ACCOUNT_CHANGE:
      const { account, balance } = action.value;
      return {
        ...state,
        account,
        balance,
        loading: false,
      };

    case SET_BUILDINGS:
      return {
        ...state,
        ...action.value,
        hasOwner: true,
      };

    case SET_LAND_ID_NAME: {
      const { landId, landName } = action.value;
      return {
        ...state,
        landId,
        landName,
      };
    }

    case SET_LAND_OWNER:
      const { landOwner, hasOwner } = action.value;
      return {
        ...state,
        landOwner,
        hasOwner,
      };

    case NETWORK_CHANGE:
      const { accountNet, balanceNet, networkId } = action.value;
      return {
        ...state,
        account: accountNet,
        balance: balanceNet,
        networkId,
        loading: false,
        wrongNetwork: false,
      };

    case TOGGLE_NETWORK:
      return {
        ...state,
        wrongNetwork: !state.wrongNetwork,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.value,
      };

    case SET_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
