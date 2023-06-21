import { useContext } from 'react';
import Popup from '../Popup';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext/ApiServiceContext';
import Preloader from '../../Preloader/Preloader';

const PopupVideo = ({ isOpen, name, onClose, link = 'https://youtube.com/watch?v=dQw4w9WgXcQ' }) => {
  const { isLoading } = useContext(ApiServiceContext);

  const replaceLink = (link) => {
    if (link.includes('youtube')) {
      return link.replace('/watch?v=', '/embed/');
    } else if (link.includes('vimeo')) {
      return link.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return link;
  };

  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
    >
      {isLoading && <Preloader />}
      {!isLoading && <iframe
        className='popup__iframe'
        src={replaceLink(link)}
        title={name}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />}
    </Popup>
  );
};

export default PopupVideo;
