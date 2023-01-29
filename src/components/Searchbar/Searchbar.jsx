import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  Input,
  Label,
  SearchbarHeader,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handlQueryChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (!this.state.searchQuery.trim()) {
      toast.error('enter a search name');
      return;
    }
    this.props.getQueryName(this.state.searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label></Label>
          </Button>

          <Input
            className="input"
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handlQueryChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
