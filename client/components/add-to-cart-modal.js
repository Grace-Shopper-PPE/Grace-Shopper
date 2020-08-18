import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CartModal = props => {
  const [show, setShow] = useState(false)
  const {addToCart, id, name, newPrice} = props
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    addToCart(id)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add to Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Added item to Cart!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{name}</h4>
          ${newPrice}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <a href="/cart">
            <Button variant="primary" onClick={handleClose}>
              Go to Cart
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartModal
