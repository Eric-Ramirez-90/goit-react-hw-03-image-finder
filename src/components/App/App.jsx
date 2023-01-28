import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevSate) {
    const prevQuery = prevSate.searchQuery;
    const nextQuery = this.state.searchQuery;
    const API_KEY = '31766486-572375a92de9bb4d66deb6c09';
    const { page } = this.state;

    if (prevQuery !== nextQuery) {
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextQuery}&page=${page}&per_page=12`
      ).then(resp =>
        resp.json().then(images => {
          const { hits } = images;

          this.setState({ images: hits });
        })
      );
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar getQueryName={this.handleFormSubmit} />
        {this.state.images && <ImageGallery images={this.state.images} />}
        <ToastContainer autoClose={3000} rtl />
      </div>
    );
  }
}

export default App;
