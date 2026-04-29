import PropTypes from 'prop-types';

import { ContainerButton } from './styles';

export function BackButton({ children, ...props }) {
  return <ContainerButton {...props}>{children}</ContainerButton>;
}

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default BackButton;
