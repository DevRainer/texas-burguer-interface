import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: grab;

  width: 300px;
  min-height: 200px;
  position: relative;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    gap: 5px;

    p {
      font-size: 18px;
      font-weight: 700;
      color: #f55f09;
      line-height: 1.2;
      margin-top: 40px;

      strong {
        font-size: 22px;
        color: #363636;
        font-weight: 800;
        line-height: 20px;
        justify-content: flex-start;
      }
    }
  }
`;

export const CardImage = styled.img`
  height: 100px;
  position: absolute;
  top: -50px;
`;
