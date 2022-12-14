import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { fetchDonation, fetchClassCategories, checkLoginUserData } from '../redux/user';

// import DetailDonation from "./DonationDetailPage";
import { useNavigate } from 'react-router-dom';

const CardContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  function clickHandler(e, index, condition) {
    console.log(index, condition);
    e.preventDefault();
    if (index === 0) {
      if (condition === 'open') {
        setShow1(true);
      } else {
        setShow1(false);
      }
    } else if (index == 1) {
      if (condition == 'open') {
        setShow2(true);
      } else {
        setShow2(false);
      }
    } else if (index == 2) {
      if (condition == 'open') {
        setShow3(true);
      } else {
        setShow3(false);
      }
    } else if (index == 3) {
      if (condition == 'open') {
        setShow4(true);
      } else {
        setShow4(false);
      }
    } else if (index == 4) {
      if (condition == 'open') {
        setShow5(true);
      } else {
        setShow5(false);
      }
    }
  }
  const { dataDonation, dataClassCategories, loginUserDataNow } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(fetchDonation())
      .then(() => {
        return dispatch(fetchClassCategories());
      })
      .then(() => {
        dispatch(checkLoginUserData());
      });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (!dataDonation) {
    <h1>Loading</h1>;
  }
  let linkDonation1 = `https://invoice-staging.xendit.co/donation/` + dataDonation[0]?.on_demand_link;
  let linkDonation2 = `https://invoice-staging.xendit.co/donation/` + dataDonation[1]?.on_demand_link;
  let linkDonation3 = `https://invoice-staging.xendit.co/donation/` + dataDonation[2]?.on_demand_link;
  let linkDonation4 = `https://invoice-staging.xendit.co/donation/` + dataDonation[3]?.on_demand_link;
  let linkDonation5 = `https://invoice-staging.xendit.co/donation/` + dataDonation[4]?.on_demand_link;
  return (
    <>
      {loginUserDataNow?.role !== 'orphan' && (
        <Container className="content-donasi mt-5 shadow">
          <h2 className="text-center mb-4">
            <b>Donasi</b>
          </h2>
          <Slider {...settings} className="ms-3 me-5">
            {dataDonation?.map((element, index) => {
              return (
                <div>
                  <Card style={{ width: '18rem' }} className="text-center ms-5">
                    <Card.Img variant="top" src={element.imgUrl} style={{ objectFit: 'cover', height: '250px' }} />
                    <Card.Body className="">
                      <Card.Title>{element.name}</Card.Title>
                      <Row>
                        <Col>
                          <Card.Text>
                            <b>Total saat ini </b>
                            <br></br>Rp.{element.totalAmount}
                          </Card.Text>
                        </Col>
                        <Col>
                          <p>
                            <b>
                              Sampai dengan<br></br>
                            </b>
                            {formatDate(element.validUntil)}
                          </p>
                        </Col>
                      </Row>
                      <Button onClick={(e) => clickHandler(e, index, 'open')}> Lihat Detail Donasi</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </Slider>
          <Modal show={show1} onHide={(e) => clickHandler(e, 0, 'close')}>
            <Modal.Header closeButton>
              <Modal.Title>Donasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>Donasi Untuk: </b>
              {dataDonation[0]?.name}
              <br></br>
              <b>Total Donasi: </b>
              {dataDonation[0]?.totalAmount}
              <br></br>
              <b>Sampai Dengan: </b>
              {formatDate(dataDonation[0]?.validUntil)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => clickHandler(e, 0, 'close')}>
                Kembali
              </Button>
              <Button variant="primary" href={linkDonation1}>
                Donasi
              </Button>
            </Modal.Footer>
          </Modal>
          {/* card 2 */}
          <Modal show={show2} onHide={(e) => clickHandler(e, 1, 'close')}>
            <Modal.Header closeButton>
              <Modal.Title>Donasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>Donasi Untuk: </b>
              {dataDonation[1]?.name}
              <br></br>
              <b>Total Donasi: </b>
              {dataDonation[1]?.totalAmount}
              <br></br>
              <b>Sampai Dengan: </b>
              {formatDate(dataDonation[1]?.validUntil)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => clickHandler(e, 1, 'close')}>
                Kembali
              </Button>
              <Button variant="primary" href={linkDonation2}>
                Donasi
              </Button>
            </Modal.Footer>
          </Modal>
          {/* card 3 */}
          <Modal show={show3} onHide={(e) => clickHandler(e, 2, 'close')}>
            <Modal.Header closeButton>
              <Modal.Title>Donasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <b>Donasi Untuk: </b>
              {dataDonation[2]?.name}
              <br></br>
              <b>Total Donasi: </b>
              {dataDonation[2]?.totalAmount}
              <br></br>
              <b>Sampai Dengan: </b>
              {formatDate(dataDonation[2]?.validUntil)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => clickHandler(e, 2, 'close')}>
                Kembali
              </Button>
              <Button variant="primary" href={linkDonation3}>
                Donasi
              </Button>
            </Modal.Footer>
          </Modal>
          {/* card 4 */}
          <Modal show={show4} onHide={(e) => clickHandler(e, 3, 'close')}>
            <Modal.Header closeButton>
              <Modal.Title>Donasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <b>Donasi Untuk: </b>
              {dataDonation[3]?.name}
              <br></br>
              <b>Total Donasi: </b>
              {dataDonation[3]?.totalAmount}
              <br></br>
              <b>Sampai Dengan: </b>
              {formatDate(dataDonation[3]?.validUntil)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => clickHandler(e, 3, 'close')}>
                Kembali
              </Button>
              <Button variant="primary" href={linkDonation4}>
                Donasi
              </Button>
            </Modal.Footer>
          </Modal>
          {/* card 5 */}
          <Modal show={show5} onHide={(e) => clickHandler(e, 4, 'close')}>
            <Modal.Header closeButton>
              <Modal.Title>Donasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <b>Donasi Untuk: </b>
              {dataDonation[4]?.name}
              <br></br>
              <b>Total Donasi: </b>
              {dataDonation[4]?.totalAmount}
              <br></br>
              <b>Sampai Dengan: </b>
              {formatDate(dataDonation[4]?.validUntil)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => clickHandler(e, 4, 'close')}>
                Kembali
              </Button>
              <Button variant="primary" href={linkDonation5}>
                Donasi
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default CardContent;
