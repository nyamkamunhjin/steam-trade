import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';

const userInventory = props => {
  console.log(props);
  if(!props.userInventory) return <h1>fail</h1>;
  const userInventory = props.userInventory.map(item => {
    return (
      <Col xs={2} md={2}>
        <div className="item">
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${
              item.icon_url
            }`}
            fluid
          />
        </div>
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
