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
    error: null,
    totalHits: 0,
    totalPages: 0,
    scroll: 0,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const { page, scroll, searchQuery } = this.state;

    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const images = await fetchImages(searchQuery, page);

        const { hits, totalHits } = images;

        if (!totalHits) {
          throw new Error(`This search "${nextQuery}" is not found`);
        }

        return this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
          totalPages: Math.round(totalHits / 12),
          scroll: document.documentElement.scrollHeight,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }

      if (prevState.scroll !== scroll && page > 1) {
        window.scrollTo({
          top: this.state.scroll - 260,
          behavior: 'smooth',
        });
      }
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
    const { images, error, status, totalPages, page } = this.state;

    return (
      <ContainerApp>
        <Searchbar getQueryName={this.handleFormSubmit} />
        {status === 'pending' && <ImageGrid />}
        {status === 'rejected' && <SearchError message={error.message} />}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'resolved' && totalPages > page && (
          <Button onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={3000} rtl />
      </ContainerApp>
    );
  }
}

export default App;
