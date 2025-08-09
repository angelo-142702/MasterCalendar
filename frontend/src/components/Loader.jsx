import { PulseLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PulseLoader color="#36d7b7" size={15} />
    </div>
  );
};

export default Loader;