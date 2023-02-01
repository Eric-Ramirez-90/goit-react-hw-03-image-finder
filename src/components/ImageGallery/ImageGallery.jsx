import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageContainer, Item } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <ImageContainer>
      {images.map(image => (
        <Item key={image.id}>
          <ImageGalleryItem image={image} />
        </Item>
      ))}
    </ImageContainer>
  );
};

export default ImageGallery;
