import React from 'react';
import { Col, Row, Container, Button, Card } from 'react-bootstrap';

const userInventory = props => {
  if (!props.userInventory) return <h1>fail</h1>;
  const userInventory = props.userInventory.map(item => {
    return (
      <Col key={item.id} xs={6} md={2}>
        <Card>
          <Card.Img
            variant="top"
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${
              item.icon_url
            }`}
          />
          <Card.Body>
            <Card.Title>{item.market_name}</Card.Title>
            {/* <Card.Text>$0.03</Card.Text> */}
            {/* <Button variant="primary">Add</Button> */}
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Container className="userInventory">
      <Row>{userInventory}</Row>
    </Container>
  );
};

export default userInventory;
