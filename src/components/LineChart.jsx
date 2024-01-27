import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const {Title} =Typography

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  
  const coinPrice=[]
  const coinTimeStamp=[]

  for(let i=0; i<coinHistory?.data?.history?.length; i+=1){
    coinPrice.push(coinHistory?.data?.history[i]?.price)
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i]?.timestamp).toLocaleDateString());
  }

  const data ={
    labels : coinTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)', 
      },
    ],
  };

  const options={
    Plugins: {
      legend: true
    },
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }
  }
  


  return (
    <>
      <Row className='chart-header'>
            <Title level={5} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
              <Title level={5} className='price-change'>{coinHistory?.data?.change}</Title>
              <Title level={5} className='current-price'>Current {coinName} Price: {currentPrice}</Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}

export default LineChart