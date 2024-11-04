import React from 'react'
import './newsletter.css'

import { Container, Row, Col} from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
const Newsletter = () => {
  return  <section className="newsletter">
    <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe to our Newsletter</h2>
                    <div className="newsletter__input">
                        <input type="email" placeholder="Enter your email address" />
                        <button className='btn newsletter__btn'>Subscribe</button>
                    </div>
                    <p>Subscribe to our newsletter and get the latest news and updates regarding our tours and packages.</p>
                </div>
            </Col>

            <Col lg='6'>
                <div className="newsletter__img">
                    <img src={maleTourist} alt="" />
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Newsletter
