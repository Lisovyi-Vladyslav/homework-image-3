import { useState } from 'react';
import {Searchbar} from '../Searchbar/Searchbar'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { SearchForm } from '../SearchForm/SearchForm'

//  export class App extends Component {
//    state = {
//     search: '',
//   }

//    handlSearcPphoto = (search) => {
//     this.setState({search: search});

//     console.log(search);
//    };

//   render() {
//     const {search} = this.state

//     return (
//       <>
//         <Searchbar>
//           <SearchForm handlSearcPphoto={this.handlSearcPphoto} />
//         </Searchbar>

//         <ImageGallery searcPhoto={search} />
//       </>
//     );
//   }
// }

export const App = () => {
  const [search, setSearch] = useState('');

  const handlSearcPphoto = (search) => {
    setSearch(search)
  };

   return (
     <>
       <Searchbar>
         <SearchForm handlSearcPphoto={handlSearcPphoto} />
       </Searchbar>

       <ImageGallery searcPhoto={search} />
     </>
   );
}
