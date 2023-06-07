import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ url, offModal }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeEsc);
    console.log('escClose :>> ', 'escClose');

    return () => {
      document.removeEventListener('keydown', closeEsc);
    };
  }, []);

  const closeEsc = e => {
    if (e.key === 'Escape') {
      console.log('Escape');
      offModal('');
    }
  };

  const closeBackdrop = e => {
    if (e.target === e.currentTarget) {
      offModal('');
    }
  };

  return (
    <div className="overlay" onClick={closeBackdrop}>
      <div className="modal">
        <img src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
};
