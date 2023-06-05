import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="overlay">
      <Audio
        height="80"
        width="80"
        radius="10"
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
};
