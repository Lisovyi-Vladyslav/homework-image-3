import { Component } from 'react';
import {Searchbar} from '../Searchbar/Searchbar'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { SearchForm } from '../SearchForm/SearchForm'

 export class App extends Component {
   state = {
  search: ''
}
   handlSearcPphoto = (search) => {
    // оновлює стейт
   };
   
  render() {
    const {search} = this.state
    
    return (
      <>
        <Searchbar>
          <SearchForm handlSearcPphoto={this.handlSearcPphoto} />
        </Searchbar>
        <ImageGallery searcPhoto={search} />
      
      </>
          
    );
  }
}
