import React, { Component, useEffect } from "react";
import { Overlay, Modalka } from './Modal.styled'

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handlKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handlKeyDown);
//   }

//   handlKeyDown = event => {
//      console.log(event.code)
//       if (event.code === "Escape") {
//         this.props.hendlCloseModal();
//       }
//     };

//   handlBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.hendlCloseModal();
//     }

//     console.log(event.currentTarget)
//     console.log(event.target)
//   }

//   render() {
//     return (
//       <>
//         <div>
//           <Overlay onClick={this.handlBackdropClick}>
//             <Modalka>
//               {this.props.children}
//             </Modalka>
//           </Overlay>
//         </div>
//       </>
//     );
//   }
// }

export const Modal = ({hendlCloseModal, children}) => {
  const handlKeyDown = (event) => {
     if (event.code === "Escape") {
       hendlCloseModal();
     }
   };


  const handlBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      hendlCloseModal();
    }
  }

  useEffect(() => {
     window.addEventListener("keydown", handlKeyDown);

     return () => {
      window.removeEventListener("keydown", handlKeyDown);
    };

  }, [])

    return (
      <>
        <div>
          <Overlay onClick={handlBackdropClick}>
            <Modalka>
              {children}
            </Modalka>
          </Overlay>
        </div>
      </>
    );

}
