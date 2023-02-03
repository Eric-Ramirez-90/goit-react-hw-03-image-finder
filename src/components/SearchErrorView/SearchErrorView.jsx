import errorImage from './error.jpg';
import { Container, ErrorImage, ErrorText } from './SearchErrorView.styled';

const SearchError = ({ message }) => {
  return (
    <Container>
      <ErrorImage src={errorImage} width="320" alt="saddog" />
      <ErrorText>{message}</ErrorText>
    </Container>
  );
};

export default SearchError;
