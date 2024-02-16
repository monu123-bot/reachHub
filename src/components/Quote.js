import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
const axios = require('axios');

const Quote = () => {

    const [mostRecrntClosingPrices,setmostRecrntClosingPrices] = useState([])
    const [symbols,setSymbol] = useState([])
    const [isWait,setIsWait] = useState(false)
    const [count,setCount] = useState(0)

    // const getStocksList = () => {

    //     // console.log(process.env.API_KEY)
    //     const finnhub = require('finnhub');

    //     const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    //     api_key.apiKey = "cn7f9l9r01qgjtj4it20cn7f9l9r01qgjtj4it2g"
    //     const finnhubClient = new finnhub.DefaultApi()
    //     finnhubClient.quote("AAPL", (error, data, response) => {

    //         console.log(data)
    //     });
    // }

    const fetchListOfSymbols = async ()=>{
           console.log('inside')
            try {
                const apiKey = "cn7f9l9r01qgjtj4it20cn7f9l9r01qgjtj4it2g";
                const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`;
        
                const response = await fetch(url);
        
                if (!response.ok) {
                    throw new Error('Failed to fetch stock symbols');
                }
        
                const data = await response.json();
                const first50Elements = data.slice(0, 10)
                setSymbol(first50Elements)
                console.log(first50Elements); // Output the response data containing the stock symbols
            } catch (error) {
                console.error("Error fetching stock symbols:", error);
            }
        
        
    }
    const getRecentClosingPrice =async (symbol)=>{
        
         // You can change this to any stock symbol you want
         console.log('get closing prices')
         const apiKey = "cn7f9l9r01qgjtj4it20cn7f9l9r01qgjtj4it2g";
            const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
            console.log('starting...')
            const response = await fetch(url);
            console.log('ending...')
            if (!response.ok) {
                throw new Error('Failed to fetch stock quote');
            }
    
            const data = await response.json();
            // setmostRecrntClosingPrices(data)
            console.log(data); // Output the response data containing the stock quote
            return data["pc"]
        
    }
    const sortBySymbol = () => {
        
        const sortedSymbols = symbols.slice().sort((a, b) => a.displaySymbol.localeCompare(b.displaySymbol));
    setSymbol(sortedSymbols);
    console.log(sortedSymbols)
        
    };
    
    // Sort stocks by recentClosingPrice
    const sortByRecentClosingPrice = () => {
        const newarr = [...symbols]; // Create a copy of the symbols array
    newarr.sort((a, b) => a.recentClosingPrice - b.recentClosingPrice);
    setSymbol(newarr);
    console.log(newarr);
    };
    const getMostRecentClosingPrices = async () => {
            setIsWait(true)
            setCount(0)
            const apiKey = "cn7f9l9r01qgjtj4it20cn7f9l9r01qgjtj4it2g";
            const newData = []
            for (let i = 0; i < symbols.length; i++) {
                const symbol = symbols[i].symbol;
                const recentClosingPrice = await getRecentClosingPrice(symbol);
                symbols[i].recentClosingPrice = recentClosingPrice;
                newData.push(symbols[i])
                setCount(count+1)
        
            }
            console.log(symbols)
            setSymbol(newData)
            setIsWait(false)
            setCount(0)
    };
    useEffect(()=>{
        // getStocksList()
        fetchListOfSymbols()
    },[])

    return (
        <>

{isWait ? `Fetching ...${count*10}%` : ""}
          <div>
            
          <table style={{ borderCollapse: 'collapse', width: '90%',margin:"10%" }}>
  <thead>
    <tr style={{ borderBottom: '1px solid #ddd' }}>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Symbol</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Recent Closing Price</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>News</th>
    </tr>
  </thead>
  <tbody>
    {symbols.map((stock, index) => (
      <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{stock.displaySymbol}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{stock.recentClosingPrice}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
      
        <Link to={`/news?symbol=${stock.displaySymbol}`}>
             News
          </Link>


        </td>
      </tr>
    ))}
  </tbody>
</table>


          </div>
         <button onClick={()=>{sortBySymbol()}} >sort by symbol</button>
         <button onClick={()=>{sortByRecentClosingPrice()}} >sort by closing price</button>
          <button onClick={()=>{getMostRecentClosingPrices()}} > fetch most recent closing prices</button>
        </>
    )
}

export default Quote
