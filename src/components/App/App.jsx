import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchError from 'components/SearchErrorView/SearchErrorView';
import { ContainerApp } from './App.styled';
import { ImageGrid } from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import fetchImages from 'components/Api/service-Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    page: 1,
    perPage: 12,
    error: null,
    totalHits: 0,
    scroll: 0,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const API_KEY = '31766486-572375a92de9bb4d66deb6c09';
    const { page, perPage, scroll } = this.state;

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

          return this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
            totalHits: totalHits,
            scroll: document.documentElement.scrollHeight,
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.scroll !== scroll && page > 1) {
      window.scrollTo({
        top: this.state.scroll - 260,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      page: 1,
      searchQuery,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, totalHits } = this.state;
    return (
      <ContainerApp>
        <Searchbar getQueryName={this.handleFormSubmit} />
        {status === 'pending' && <ImageGrid />}
        {status === 'rejected' && <SearchError message={error.message} />}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'resolved' && totalHits > 12 && (
          <Button onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={3000} rtl />
      </ContainerApp>
    );
  }
}

export default App;
