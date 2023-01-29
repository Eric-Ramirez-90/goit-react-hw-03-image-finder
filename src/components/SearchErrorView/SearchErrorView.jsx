import errorImage from './error.jpg';

const SearchError = ({ message }) => {
  return (
    <div>
      <img src={errorImage} width="320" alt="saddog" />
      <p>{message}</p>
    </div>
  );
};

export default SearchError;
