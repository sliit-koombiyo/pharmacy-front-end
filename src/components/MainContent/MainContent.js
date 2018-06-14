import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Container, Row} from "reactstrap";
import './MainContent.css'


class MainContent extends Component {
  routes;
  render() {

    return (
      <div className="mainContentDiv">
        <Container fluid>
          <Row>
            {
              this.props.routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))
            }
          </Row>
        </Container>

      </div>
    );

  }
}

export default MainContent;