import React from 'react';
import Page from '../../components/Utils/Page/Page';
import Help from '../../components/Help';

class HelpPage extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<Page className="help-page" title="Ajuda">
				<Help />
			</Page>
		);
	}
}

export default HelpPage;
