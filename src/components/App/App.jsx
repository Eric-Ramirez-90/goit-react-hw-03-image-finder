import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchError from 'components/SearchErrorView/SearchErrorView';
import { FidgetSpinner } from 'react-loader-spinner';
import { ContainerApp } from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    page: 1,
    perPage: 12,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const API_KEY = '31766486-572375a92de9bb4d66deb6c09';
    const { page, perPage } = this.state;

    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextQuery}&page=${page}&per_page=${perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`This search "${nextQuery}" is not found`)
          );
        })
        .then(images => {
          const { hits, totalHits } = images;

          if (!totalHits) {
            throw new Error(`This search "${nextQuery}" is not found`);
          }

          return this.setState({ images: hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      page: 1,
      searchQuery,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status } = this.state;
    return (
      <ContainerApp>
        <Searchbar getQueryName={this.handleFormSubmit} />
        {status === 'idle' && <div>Enter a search name</div>}
        {status === 'pending' && <FidgetSpinner />}
        {status === 'rejected' && <SearchError message={error.message} />}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'resolved' && (
          <div>
            <button type="button" onClick={this.loadMore}>
              Load more
            </button>
          </div>
        )}
        <ToastContainer autoClose={3000} rtl />
      </ContainerApp>
    );
  }
}

export default App;
