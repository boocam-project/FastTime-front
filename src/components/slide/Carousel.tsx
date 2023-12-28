import './slick.css';
import './slick-theme.css';
import Slider, { CustomArrowProps } from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import CustomArrowProps from 'react-slick';

const Carousel = () => {
  const SampleNextArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
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
