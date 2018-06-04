import React, {Component} from 'react';
import {
  Button,
  Card, CardBody, CardSubtitle, CardText, CardTitle
} from 'reactstrap';

class Home extends Component {

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Home</CardTitle>
            <CardSubtitle>Home subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's
              content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  };

}

export default Home;