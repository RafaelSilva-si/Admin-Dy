import styled from 'styled-components';

export const LoadingBlock = styled.div`
	position: absolute;
	z-index: 2;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.5);
	height: 100%;
	display: ${props => (props.loading === 'true' ? 'block' : 'none')};
	padding-top: 30px;
`;

export { LoadingBlock as default };
