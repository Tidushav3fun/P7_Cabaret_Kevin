import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import UploadsDataServices from '../../services/upload.service'
import { Redirect } from 'react-router-dom'
import {
  DeleteOutlined
} from '@ant-design/icons'

const { confirm } = Modal

const ModalDelete = props => {
  const deletePost = uploadId => {
    UploadsDataServices.delete(uploadId)
      .then(response => {
        console.log(response.data)
        return <Redirect to={'/'} />
      })
      .catch(err => {
        console.log(err)
      })
  }

  function showDeleteConfirm () {
    confirm({
      title: 'Voulez-vous vraiment supprimer cet élément ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Ce contenu sera définitivement supprimé',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk () {
        deletePost(props.id)
        window.location.href = `/`
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }

  return (
    <div>
      <DeleteOutlined 
      style={{ fontSize: '20px', marginTop: '10px' }}
        onClick={(e) => {
          e.preventDefault()
          showDeleteConfirm()
          
        }}
        type='dashed'
      />
        
      
    </div>
  )
}

export default ModalDelete
