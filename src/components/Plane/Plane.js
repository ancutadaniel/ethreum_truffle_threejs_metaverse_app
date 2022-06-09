/* The ground - three js to create this component 
   must have - geometry & material
   position={[0, 0, 0]} of the plane
   args={[50, 50]}  - width and hight of the plane
   return 3D model 
*/

const Plane = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[50, 50]} />
      <meshStandardMaterial color={'#404040'} />
    </mesh>
  );
};

export default Plane;
