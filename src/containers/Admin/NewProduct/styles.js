import ReactSelect from 'react-select';

import styled from 'styled-components';

import { Button } from '../../../components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
export const Form = styled.form`
  border-radius: 20px;
  background-color: ${(props) => props.theme.black};
  padding: 32px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const Label = styled.label`
  color: ${(props) => props.theme.white};
  font-size: 14px;
`;
export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  padding: 0 12px;
  border: none;
`;
export const Error = styled.span`
  color: ${(props) => props.theme.primary};
  font-size: 12px;
`;
export const ImagePreview = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 5px;
`;
export const LabelUpload = styled.label`
  cursor: pointer;
  border: 1px dashed ${(props) => props.theme.white};
  border-radius: 5px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${(props) => props.theme.white};
  margin-top: 20px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.primary}22;
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
  }

  > svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.white};
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Select = styled(ReactSelect)`
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 40px;
`;
