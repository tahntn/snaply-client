import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: space-between;
  width: 36px;

  span {
    width: 8px;
    height: 8px;
    background-color: #4caf50;
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.5s infinite;
  }

  span:nth-child(1) {
    animation-delay: -0.32s;
  }

  span:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const YourComponent = () => {
  return (
    <LoadingDots>
      <span></span>
      <span></span>
      <span></span>
    </LoadingDots>
  );
};

export default YourComponent;
