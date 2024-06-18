import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  animation: ${props => props.$isOpen ? fadeIn : fadeOut} 100ms linear;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition-delay: ${props => props.$isOpen ? '0s' : '100ms'};
  
`;

const ModalContent = styled.div`
  background-color: #2e4d58;
  background: linear-gradient(163deg, rgba(189,139,159,1) 0%, rgba(46,77,88,1) 100%);
  padding: 20px;
  border-radius: 1em;
  max-width: 90%; // Adjust the maximum width of the modal content
  max-height: 90vh; // Adjust the maximum height of the modal conte
  overflow: auto; // Enable scrolling if content exceeds modal size
`;


const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;