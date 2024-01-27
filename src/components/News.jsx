import React, {useState} from 'react'
import { Select, Typography, Row, Col, Card, Avatar } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text, Title} = Typography;
const {option} = Select;

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const demoImage ='http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptosNewsList, isFetching} = useGetCryptosNewsQuery({newsCategory , count: simplified ? 6 : 12 });
  const {data } = useGetCryptosQuery(100);
  const[cryptosNews, setCryptosNews] = useState(cryptosNewsList?.news?.news || [])

  if(isFetching) return 'Loding.....'
  return (
    <>
    
    <Row gutter={[24, 24]} className='cryptoNews-card-container'>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch
            className='Select-Crypto'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <option value={coin.name}>{coin.name}</option>)}
          </Select>
      </Col>
    )}

      {cryptosNews?.map((news,i) =>(
        <Col xs={24} sm={12} lg={8} className='crypto-card' key={i}>
            <Card hoverable className='news-card'>
                <a href={news.link} target="_blank" rel="noreferrer">
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>{news?.props?.title}</Title>
                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.props?.image || demoImage} alt='news' />
                  </div>
                  <p>
                    {news.description > 100
                      ? `${news.description.substring(0,100)}....`
                      : news.description

                    }
                  </p>
                  <div className='provider-container'>
                    <div>
                      <Avatar src={<img src={url} alt="news" />} />
                      <Text className='provider-name'>{news?.source}</Text>
                    </div>
                      <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
            </Card>
        </Col>
      ))}
    </Row>
  </>
  )
}

export default News