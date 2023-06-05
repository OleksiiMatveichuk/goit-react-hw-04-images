import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEsc);
  }

  closeEsc = e => {
    if (e.key === 'Escape') {
      console.log('Escape');
      this.props.offModal('');
    }
  };

  closeBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.offModal('');
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.closeBackdrop}>
        <div className="modal">
          <img src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
};
