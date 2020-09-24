import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {runStripe, updateInventory} from '../store/checkout'
import {fetchCart} from '../store/cart'

const PurchaseModal = props => {
  const [show, setShow] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleToken = token => {
    props.placeOrder(Number(props.total) * 100, token)
    setShow(false)
    setShowConfirmation(true)
  }

  if (props.order === 'success') {
    props.clearItems(props.cart)
    props.refreshCart()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Purchase
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you ready to checkout? You will be charged ${props.total}.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StripeCheckout
            stripeKey="pk_test_51HULZXAqmDSJ1Z7dqhphCEdrTg2wwSsTW7DN4OOhQBCC2aZcnpBVGlExJJgereUcS6fMWyvhu9cHFvl5oEpzxHch00a4nzTZ3k"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={Number(props.total) * 100}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <a href="/products">
            <Button variant="primary" onClick={handleClose}>
              Go Back to Products
            </Button>
          </a>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>
            Your purchase is complete. Please check your inbox for a
            confirmation.
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  )
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  placeOrder: (total, token) => dispatch(runStripe(total, token)),
  clearItems: () => dispatch(updateInventory()),
  refreshCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(PurchaseModal)
