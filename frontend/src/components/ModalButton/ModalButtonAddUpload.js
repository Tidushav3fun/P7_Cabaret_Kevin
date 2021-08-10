import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddUpload from './../Uploads/AddUpload'
import { Link } from 'react-router-dom'

function ModalButtonAddUpload () {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => setShow(true)

  const reload = () => {
    window.location.reload()
  }

  return (
    <>
      <button className='btn btn-grad' onClick={handleShow}>
        Upload +
      </button>

      <Modal show={show} onHide={handleClose} onExit={reload}>
        <Modal.Header closeButton>
          <Modal.Title>Postez ce que vous voulez 💻</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUpload />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Fermer fenêtre
          </Button>
          <Link to='/'>
            <Button variant='primary' onClick={handleClose}>
              Retour à l'accueil
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalButtonAddUpload

// import React, { useState } from 'react';
// import { Modal } from 'antd';
// import AddIcon from '@material-ui/icons/Add';
// import AddUpload from '../Uploads/AddUpload';

// const ModalButtonAddUpload = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const reload = () => {
//     window.location.reload()
//   }

//   return (
//     <>
//       <button type="primary" onClick={showModal} className='btn btn-light'>
//       <AddIcon/>Upload
//       </button>
//       <Modal title="Postez ce que vous voulez 💻 " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} onExit={reload}>
//         <AddUpload/>
//       </Modal>
//     </>
//   );
// };

// export default ModalButtonAddUpload;
