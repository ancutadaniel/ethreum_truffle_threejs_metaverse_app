import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

// Import Assets
import MetalMap from '../../assets/MetalMap.png';
import MetalNormalMap from '../../assets/MetalNormalMap.png';
import * as ACTIONS from '../../redux_hooks/constants';

const Building = ({ position, size, landId, landInfo, dispatch }) => {
  const [surface, color] = useLoader(TextureLoader, [MetalNormalMap, MetalMap]);
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
      <boxBufferGeometry args={size} />
      <meshStandardMaterial map={color} normalMap={surface} metalness={0.25} />
    </mesh>
  );
};

export default Building;
