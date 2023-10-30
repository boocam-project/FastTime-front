import { useState } from 'react';
import MobileMenu from './MobileMenu';
import Header2 from './Header2';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false); // "닫기" 버튼 클릭 시 메뉴를 닫음
  };

  return (
    <>
      {isMenuOpen && <MobileMenu onClose={handleMenuClose} />}
      <Header2 />
    </>
  );
};

export default Header;
