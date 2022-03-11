import React from 'react';
import Page from '../../components/Utils/Page/Page';
import Dashboard from '../../components/Dashboard/DashboardCharts';

class DashboardPage extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<Page
				className="dashboard"
				title="Dashboard"
				breadcrumbs={[{ name: 'Dashboard', active: true }]}>
				<Dashboard />
			</Page>
		);
	}
}


export default DashboardPage;
