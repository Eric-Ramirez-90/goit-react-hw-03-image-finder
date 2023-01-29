import { Image, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { webformatURL, tags } }) => {
  return (
    <Item className="gallery-item">
      <Image src={webformatURL} alt={tags} />
    </Item>
  );
};

export default ImageGalleryItem;
