import BeatLoader from 'react-spinners/BeatLoader';

const override = {
  display: 'block',
  borderColor: '#0e58ea',
  margin: '0 auto',
  width: 200,
};

function LoadingPage({ loading }) {
  return (
    <div>
      <BeatLoader
        color={'#0e58ea'}
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="BeatLoader"
      />
    </div>
  );
}

export default LoadingPage;
