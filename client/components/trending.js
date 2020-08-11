import React from 'react'
import Card from 'react-bootstrap/Card'

const Trending = () => {
  return (
    <div className="m-3" href="/products/1">
      <Card style={{width: '18rem'}}>
        <Card.Img
          variant="top"
          src="https://ih1.redbubble.net/image.1193579924.0976/ur,mask_three_quarter,tall_portrait,750x1000.jpg"
        />
        <Card.Body>Great</Card.Body>
      </Card>
      {/* <Card style={{width: '18rem'}}>
      <Card.Img variant="top" src='https://ih1.redbubble.net/image.1193579924.0976/ur,mask_three_quarter,tall_portrait,750x1000.jpg' />
      <Card.Body>
          Great 
      </Card.Body>
    </Card>
    <Card style={{width: '18rem'}}>
      <Card.Img variant="top" src='https://ih1.redbubble.net/image.1193579924.0976/ur,mask_three_quarter,tall_portrait,750x1000.jpg' />
      <Card.Body>
          Great 
      </Card.Body>
    </Card> */}
    </div>
  )
}

export default Trending
