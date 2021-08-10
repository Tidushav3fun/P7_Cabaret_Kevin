import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Comments from './../Comments/Comments';


const ModalButton = () => {
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
      <Button type="primary" onClick={showModal}>
        Afficher commentaires
      </Button>
      <Modal title="Commentaires" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Comments/>
      </Modal>
    </>
  );
};

export default ModalButton;