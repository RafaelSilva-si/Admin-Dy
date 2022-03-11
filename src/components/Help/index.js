import React from 'react';
import { Card, CardBody } from 'reactstrap';
import Typography from '../Utils/Typography';

const HelpInfo = ({ ...restProps }) => (
	<Card {...restProps}>
		<CardBody>
			<Typography type="p">
				Encontrou algum problema no sistema ou está com alguma dúvida?
				Entre em contato pelo email abaixo com nossa equipe.
			</Typography>
			<Typography type="p">suporte@sagasistemas.com.br</Typography>
		</CardBody>
	</Card>
);

export default HelpInfo;
