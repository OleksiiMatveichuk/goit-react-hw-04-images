import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import { getImages } from 'service/imageAPI';

export const App = () => {
  const [queri, setQueri] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (!queri) {
      return;
    }
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        const { hits, totalHits } = await getImages(queri, page);

        setPhotos(prev => [...prev, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 15));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [queri, page]);

  const handleSubmit = queri => {
    setQueri(queri);
    setPage(1);
    setPhotos([]);
    setShowBtn(false);
    setIsEmpty(false);
    setError('');
    setIsLoading(false);
    setImageURL('');
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const onModal = url => {
    setImageURL(url);
  };

  return (
    <div className="app">
      <Searchbar submit={handleSubmit} />
      {photos.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem photos={photos} click={onModal} />
        </ImageGallery>
      )}
      {showBtn && <Button click={handleClick} />}
      {isLoading && <Loader />}
      {imageURL && <Modal url={imageURL} offModal={onModal} />}
    </div>
  );
};
