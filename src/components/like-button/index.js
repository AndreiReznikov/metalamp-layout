import LikeButton from './LikeButton';

const initializeLikeButton = () => {
  const likeButton = new LikeButton();

  likeButton.init();
};

document.addEventListener('DOMContentLoaded', initializeLikeButton);
