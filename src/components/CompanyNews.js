import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
const CompanyNews = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const symbol = queryParams.get('symbol');
  const [news,setNews] = useState([])
  
    const fetchCompanyNews = async (symbol, startDate, endDate) => {
        try {
            const apiKey = "cn7f9l9r01qgjtj4it20cn7f9l9r01qgjtj4it2g";
            const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&token=${apiKey}`;
    
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error('Failed to fetch company news');
            }
    
            const data = await response.json();
            const first50Elements = data.slice(0, 10)
                
            setNews(first50Elements)
            console.log(first50Elements)

        } catch (error) {
            console.error("Error fetching company news:", error);
        }
    };
    
    // Call the function with appropriate parameters
    
    
   
  useEffect(()=>{
    fetchCompanyNews(symbol, "2020-01-01", "2024-01-01");
    console.log("nws is",news);
  },[])
  return (
    <>
    <h1>latest news for {symbol} </h1>
    <hr/>
    {news.map((item,index)=>(
        <div>
    
          <h4>{item.headline}</h4>
          <p>{item.summary}</p>
          <a href={item.url} > visit site </a>

        </div>
    ))}
    </>
  )
}

export default CompanyNews
