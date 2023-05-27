import { Carousel } from 'react-bootstrap';

function SliderImage() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://superdong.com.vn/wp-content/uploads/2019/09/banner1-03-1440x650.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://superdong.com.vn/wp-content/uploads/2019/09/banner1-02-1440x650.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://superdong.com.vn/wp-content/uploads/2023/01/xe-trung-chuyen-can-tho-tran-de.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderImage;
