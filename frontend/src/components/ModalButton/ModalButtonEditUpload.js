import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import EditIcon from '@material-ui/icons/Edit';
import AddUpload from '../Uploads/AddUpload';
import UpdateUpload from '../Uploads/UpdateUpload';

const ModalButtonEditUpload = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button type="primary" onClick={showModal} className='btn btn-warning'>
      <EditIcon/>Éditer
      </button>
      <Modal title="Vous pouvez modifier votre post " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UpdateUpload/>
      </Modal>
    </>
  );
};

export default ModalButtonEditUpload;