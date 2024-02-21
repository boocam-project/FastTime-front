import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Slider, { CustomArrowProps } from 'react-slick';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
const Carousel = () => {
  const SampleNextArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return <FaChevronRight className={className} style={{ ...style }} onClick={onClick} />;
  };

  const SamplePrevArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return <FaChevronLeft className={className} style={{ ...style }} onClick={onClick} />;
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 400,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplaySpeed: 0,
    // cssEase: 'linear',
  };

  return (
    <>
      <Slider {...settings}>
        <div className="slideItem">
          <img src="/test.png" alt="슬라이드이미지1" />
        </div>
        <div className="slideItem">
          <h3>slide2</h3>
        </div>
        <div className="slideItem">
          <h3>slide3</h3>
        </div>
        <div className="slideItem">
          <h3>slide4</h3>
        </div>
        <div className="slideItem">
          <h3>slide5</h3>
        </div>
        <div className="slideItem">
          <h3>slide6</h3>
        </div>
      </Slider>
    </>
  );
};

export default Carousel;
