import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageContainer } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <ImageContainer className="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ImageContainer>
  );
};

export default ImageGallery;
