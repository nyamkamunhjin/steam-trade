import React from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import { dotaItemColors } from '../../constants/constants';

const userInventory = props => {
  if (!props.userInventory) return <h1>fail</h1>;
  let key = 0;
  const userInventory = props.userInventory.map(item => {
    key++;
    const rarity = item.type.split(' ')[0];
    // console.log(`${dotaItemColors[`${rarity}`]}!important`);
    return (
      <Col key={key} xs={6} md={2}>
        <div
          style={{
            border: 'solid 3px',
            borderColor: dotaItemColors[rarity],
            borderRadius: '5px',
            height: '100%'
          }}
        >
          <Card>
            <Card.Img
              variant="top"
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${
                item.icon_url
              }`}
            />
            <Card.Body>
              <Card.Text>
                <strong>{rarity}</strong>
              </Card.Text>
              <Card.Title>{item.market_name}</Card.Title>
              {/* <Button variant="primary">Add</Button> */}
            </Card.Body>
          </Card>
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
