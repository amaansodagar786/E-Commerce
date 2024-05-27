import React from 'react'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Bootstrap = () => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://m.media-amazon.com/images/I/3153CHlzUCL._MCnd_AC_.jpg" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  )
}

export default Bootstrap