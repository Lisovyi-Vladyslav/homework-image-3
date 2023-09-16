import axios from 'axios';
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Gallery, GalleryItem } from "./ImageGallery.styled"

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { Loader } from '../Loader/Loader'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'

// export class ImageGallery extends Component {
// state = {
//   isLoading: false,
//   photos: [],
//   openModal: false,
//   largeImageURL: null,
//   page: 1,
//   totalHits: 0,
// }
//   hendlOpenModal = (largeImageURL) => {
//     this.setState({
//       openModal: true,
//       largeImageURL: largeImageURL,
//     });
//   }

//   hendlCloseModal = () => {
//     this.setState({
//       openModal: false,
//     });
//   }

//   loadMore = () => {
//     const copyPage = this.state.page;
//     const nextPage = copyPage + 1;

//     this.setState({
//       page: nextPage,
//     })

//     console.log(this.state.page);
// }

// // це будемо розбирати на заняття
//   fetchData = async (currentSearcPhoto, page) => {
//     this.setState({ isLoading: true });

//     // console.log(currentSearcPhoto);
//     // console.log(page);

//     try {
//       const ulr = `https://pixabay.com/api/?q=${currentSearcPhoto}&page=${page}&key=31729330-76a93a375c4da5def12e352a3&image_type=photo&orientation=horizontal&per_page=12`;

//       const photo = await axios.get(ulr);

//       // console.log(photo.data.hits);
//       // console.log(this.state.photos.length)
//       // console.log(photo.data);

//       this.setState({ totalHits: photo.data.totalHits});

//        if (page === 1) {
//        this.setState({ page: 1, photos: [] });
//       }

//       this.setState(prevState => ({ photos: prevState.photos.concat(photo.data.hits) }));
//      } catch (error) {
//        console.log(error)
//      } finally {
//        this.setState({isLoading: false});
//     }
//   }

// componentDidUpdate(prevProps, prevState) {
//     if (this.props.searcPhoto !== prevProps.searcPhoto) {
//       this.fetchData(this.props.searcPhoto, 1);
//       console.log(this.state.searcPhoto)
//     }

//     if (this.state.page !== prevState.page) {
//       this.fetchData(this.props.searcPhoto, this.state.page);
//     }

// }

//   render() {
//    const {
//     photos,
//     isLoading,
//     openModal,
//     largeImageURL,
//     totalHits
//   } = this.state
//     return (
//     <>
//         <Gallery>{
//           photos.map(({ id, webformatURL, largeImageURL }) => (
//             <ImageGalleryItem
//               key={id}
//               webformatURL={webformatURL}
//               largeImageURL={largeImageURL}
//               hendlOpenModal={this.hendlOpenModal}
//             >
//             </ImageGalleryItem>
//         ))

//         }

//     </Gallery>
//         {isLoading && <Loader/>}

//         {openModal
//           &&
//           <Modal hendlCloseModal={this.hendlCloseModal}
//           >

//         <GalleryItem src={largeImageURL} alt="" />
//         </Modal>}

//         {photos.length !== 0
//           && photos.length !== totalHits
//           && <Button  loadMore={this.loadMore}/>
//         }
//     </>);
//   }
// }

export const ImageGallery = ({searcPhoto}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const hendlOpenModal = (largeImageURL) => {
      setOpenModal(true);
      setLargeImageURL(largeImageURL);
    }

  const hendlCloseModal = () => {
      setOpenModal(false);
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }

  const fetchData = async (searcPhoto, page) => {
    setIsLoading(true);

    try {
      const ulr = `https://pixabay.com/api/?q=${searcPhoto}&page=${page}&key=31729330-76a93a375c4da5def12e352a3&image_type=photo&orientation=horizontal&per_page=12`;

      const photo = await axios.get(ulr);
      setTotalHits( photo.data.totalHits);

      if (page === 1) {
        setPhotos([]);
      }
        setPhotos((prevState) => [...prevState, ...photo.data.hits]);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(searcPhoto, 1);
  }, [searcPhoto]);

  useEffect(() => {
    if (page !== 1) {
      fetchData(searcPhoto, page);
    }
  }, [searcPhoto, page]);


      return (
      <>
          <Gallery>{
            photos.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                hendlOpenModal={hendlOpenModal}
              >
              </ImageGalleryItem>
          ))

          }

      </Gallery>
          {isLoading && <Loader/>}

          {openModal
            &&
            <Modal hendlCloseModal={hendlCloseModal}
            >

          <GalleryItem src={largeImageURL} alt="" />
          </Modal>}

          {photos.length !== 0
            && photos.length !== totalHits
            && <Button  loadMore={loadMore}/>
          }
      </>);
  }

ImageGallery.propTypes = {
 searcPhoto: PropTypes.objectOf(PropTypes.string),
};
