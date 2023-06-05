import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import { getImages } from 'service/imageAPI';

export class App extends Component {
  state = {
    queri: '',
    page: 1,
    photos: [],
    showBtn: false,
    isEmpty: false,
    error: '',
    isLoading: false,
    imageURL: '',
  };

  async componentDidUpdate(_, prevState) {
    const { queri, page } = this.state;
    if (prevState.queri !== queri || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await getImages(queri, page);

        this.setState(prev => ({
          photos: [...prev.photos, ...hits],
          showBtn: page < Math.ceil(totalHits / 15),
        }));
      } catch (err) {
        this.setState({ error: err.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = queri => {
    this.setState({
      queri,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
      error: '',
      isLoading: false,
      imageURL: '',
    });
  };

  handleClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  onModal = imageURL => {
    this.setState({ imageURL });
  };

  render() {
    const { photos, showBtn, isLoading, imageURL } = this.state;
    return (
      <div className="app">
        <Searchbar submit={this.handleSubmit} />
        {Boolean(photos.length) && (
          <ImageGallery>
            <ImageGalleryItem photos={photos} click={this.onModal} />
          </ImageGallery>
        )}
        {showBtn && <Button click={this.handleClick} />}
        {isLoading && <Loader />}
        {imageURL && <Modal url={imageURL} offModal={this.onModal} />}
      </div>
    );
  }
}
