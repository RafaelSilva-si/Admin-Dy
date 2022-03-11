import React from 'react';
import { Col, Row, Progress } from 'reactstrap';
import Card from '../../Utils/Card/FormCard';
import { Chart } from "react-google-charts";

export const data = [
    [
        "Dias",
        "Lucro",
        "Gastos",
        "Vendas",
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
];

export const options = {
    chart: {
        title: "Gráfico de Vendas,lucros e insumos",
        subtitle: "em 15 dias.",
    },
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <Row>
                    <Col xl={4} lg={4} md={4}>
                        <Card>
                            <div className="text-success" >
                                <p>+ R$2.125,32</p>
                                <p>Vendas de Hoje</p>
                            </div>
                            <Progress
                                color="success" value="87"
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={4}>
                        <Card>
                            <div className="text-danger">
                                <p >- R$965,23</p>
                                <p>Gastos de Hoje</p>
                            </div>
                            <Progress
                                color="danger" value="35"
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={4}>
                        <Card>
                            <div className="text-info">
                                <p>+ R$2.125,32</p>
                                <p>Lucro</p>
                            </div>
                            <Progress
                                color="info" value="87"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col xl={6} lg={6} md={6}>
                        <Card>
                            <Chart
                                chartType="Line"
                                width="100%"
                                height="300px"
                                data={data}
                                options={options}
                            />
                        </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6}>
                       <Card>
                           <p>Avisos</p>
                       </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} >
                       <Card style={{height: '342px'}}>
                           <p>Pedidos</p>
                       </Card>
                    </Col>
                </Row>

            </>
        );
    }
}
export default Dashboard;
