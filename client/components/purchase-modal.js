import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const PurchaseModal = props => {
  const [show, setShow] = useState(false)
  const {checkout} = props
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    checkout()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Purchase
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            You have completed you purchase! Thank you for shopping with us
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>You will receive email confirmation shortly</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <a href="/products">
            <Button variant="primary" onClick={handleClose}>
              Go Back to Prodcuts
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PurchaseModal
