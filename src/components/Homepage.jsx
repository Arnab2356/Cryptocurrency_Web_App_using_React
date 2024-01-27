import React from 'react';
import millify from 'millify';
import { Typography,Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from '../components'

const Homepage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalState = data?.data?.stats;
  if(isFetching) return 'Loding...';
  return (
    <>
      <Typography.Title level={2} className='heading'>
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalState?.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalState?.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalState?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalState?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Market" value={millify(globalState?.totalMarkets)} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={2} className='show-more'>
          <Link to="/cryptocurrencies">Show More</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={2} className='show-more'>
          <Link to="/news">Show More</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage