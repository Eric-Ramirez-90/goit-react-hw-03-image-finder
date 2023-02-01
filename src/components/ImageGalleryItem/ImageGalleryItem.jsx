import { Component } from 'react';
import Modal from '../Modal/Modal';
import { Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { showModal } = this.state;

    return (
      <>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeImageURL}
              alt={tags}
              onClick={this.toggleModal}
            ></img>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
