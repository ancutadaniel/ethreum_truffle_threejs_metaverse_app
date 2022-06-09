import * as ACTIONS from '../../redux_hooks/constants';

const Plot = ({ position, size, landId, landInfo, dispatch }) => {
  const { SET_LAND_ID_NAME, SET_LAND_OWNER } = ACTIONS;
  const clickHandler = () => {
    dispatch({
      type: SET_LAND_ID_NAME,
      value: { landId, landName: landInfo.name },
    });

    if (landInfo.owner === '0x0000000000000000000000000000000000000000') {
      dispatch({
        type: SET_LAND_OWNER,
        value: { landOwner: 'No Owner', hasOwner: false },
      });
    } else {
      dispatch({
        type: SET_LAND_OWNER,
        value: { landOwner: landInfo.owner, hasOwner: true },
      });
    }
  };

  return (
    <mesh position={position} onClick={clickHandler}>
      <planeBufferGeometry attach='geometry' args={size} />
      <meshStandardMaterial color={'#11E169'} metalness={0.5} roughness={0} />
    </mesh>
  );
};

export default Plot;
