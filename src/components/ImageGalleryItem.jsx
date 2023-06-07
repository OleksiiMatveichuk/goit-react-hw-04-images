import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ photos, click }) => {
  return (
    <>
      {photos.map(el => (
        <li className="imageGalleryItem" key={el.id}>
          <img
            className="imageGalleryItem-image"
            src={el.webformatURL}
            alt={el.largeImageURL}
            onClick={() => click(el.largeImageURL)}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  photos: PropTypes.array.isRequired,
};
