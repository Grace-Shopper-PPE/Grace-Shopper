import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HomeCarousel from './homepage-carousel'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="home-page">
      {/* <div>
      <h3>Welcome, {email}</h3>
    </div> */}

      <HomeCarousel email={email} />

      {/* <Carousel id='carousel'>



          <Carousel.Item style={{'height':"500px"}}>
          <img
        className="d-block"
        src='https://www.bioworld.com/ext/resources/Stock-images/Devices/personal-protective-equipment-PPE-coronavirus.png?1588286876'
        alt="First slide" style={{'height':"500px"}}
        />
            
    <Carousel.Caption type='first-hero'>
        <h3>  {email ? <div>
          <h3>Welcome, {email}</h3> </div>: <div>Welcome! </div>}</h3>
      <p>Providing you with PPE for both protection and style!</p>
    </Carousel.Caption>
  </Carousel.Item>

      <Carousel.Item style={{'height':"500px"}}>
      <img
        className="d-block"
        src="https://i.etsystatic.com/18717999/r/il/c67c2d/2487349479/il_794xN.2487349479_qr23.jpg"
        alt="First slide" style={{'height':"500px"}}
        />
    <Carousel.Caption>
     <a href={'/products/faceshields'}><h3>Face Shields</h3></a> 
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{'height':"500px"}}>
    <img
      className="d-block"
      src="https://i.etsystatic.com/22156858/r/il/d59eb5/2451874759/il_1588xN.2451874759_kdzz.jpg"
      alt="Third slide" style={{'height':"500px"}}
    />

    <Carousel.Caption>
    <a href={'/products/masks'}><h3>Masks</h3></a> 
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{'height':"500px"}}>
    <img
      className="d-block"
      src="https://media4.s-nbcnews.com/i/newscms/2020_26/3238891/200221-hand-sanitzier-stock-se-1029a_c58229a1a8c62a7f4a939039381d9790.jpg"
      alt="Third slide" style={{'height':"500px"}}
    />

    <Carousel.Caption>
    <a href={'/products/sanitziers'}><h3>Sanitziers</h3></a> 
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.currentUser.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
