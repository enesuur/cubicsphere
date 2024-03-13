import React from 'react';
import './SharingModal.css';
export default function ConfirmModal({ openSharingModal, setOpenSharingModal }) {

  const handleModalClick = (event) => {
    setOpenSharingModal(false);
  };

  return (
    <>
      {openSharingModal && (
        <div className='modal-overlay' onClick={handleModalClick} >
          <div className='sharing-content container' onClick={(e) => e.stopPropagation()} >
            <div className='sharing-header'>
              <h1>Share the post</h1>
              <span className='close' onClick={() => setOpenSharingModal(false)}>&times;</span>
            </div>
            <div className='share-social'>
              <button className='share-link'>
                <AiOutlineLink/>
                Share via Link
                </button>
              <button className='share-twitter'>
                <BsTwitter/>
                Share via twitter
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
};