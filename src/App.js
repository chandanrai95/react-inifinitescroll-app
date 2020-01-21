import React, { useState, useEffect, useRef, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { Spinner, Card } from 'react-bootstrap'
import { getUser } from './services/user_service';

const  App = () =>  {

  const [loader, setLoader] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [ dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
      getUsers()
  },[])

  const observerRef = useRef();

  const lastElementRef = useCallback((ele) => {
    if(loader)
    {
      return
    }

    if(observerRef.current)
    {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver( entry => {
      if(entry[0].isIntersecting && hasMore)
      {
        console.log("reach")
        getUsers()
      }
    })

    if(ele) observerRef.current.observe(ele)

  },[loader, hasMore]) 
  const getUsers = useCallback(() => {
    setLoader(true)
    getUser(pageNumber)
    .then((response) => {
        setHasMore(response.remain);
        setDataList( values => ([
          ...values,
          ...response.arr
        ]))
        setPageNumber(pageNumber+1)
    })
    .catch( err => {
      console.log(err)
    })
    .finally(() => setLoader(false))
  },[pageNumber])
// console.log(dataList)
  return (
    <div className="App container" style={{ backgroundColor: 'blue', padding: "10px"}}>
        { 
          dataList.map((ele, idx) => {
            if(dataList.length === idx+1)
            {
              return(
              
                <Card
                className="mb-30 row"
                style={{
                  margin: 0,
                  marginBottom: "3rem",
                  padding: "1.5rem"
                }}
                key={`element${idx}`}
                ref={lastElementRef}
              >
                <div className="column width-12">
                  <div className="left lead" style={{ wordWrap: "break-word" }}>
                    <span className=""></span>
                    <h3>{ele.firstname}</h3>
                  </div>
    
                  <div className="left" style={{ wordWrap: "break-word" }}>
                    <p>
                      {ele.lastname} 
                    </p>
                  </div>
    
                  <div className="left" style={{ wordWrap: "break-word" }}>
                    <p>{ele.email}</p>
                  </div>
                </div>
              </Card>
              )
            }
            else{
              return(
              
                <Card
                className="mb-30 row"
                style={{
                  margin: 0,
                  marginBottom: "3rem",
                  padding: "1.5rem"
                }}
                key={`element${idx}`}
              >
                <div className="column width-12">
                  <div className="left lead" style={{ wordWrap: "break-word" }}>
                    <span className=""></span>
                    <h3>{ele.firstname}</h3>
                  </div>
    
                  <div className="left" style={{ wordWrap: "break-word" }}>
                    <p>
                      {ele.lastname} 
                    </p>
                  </div>
    
                  <div className="left" style={{ wordWrap: "break-word" }}>
                    <p>{ele.email}</p>
                  </div>
                </div>
              </Card>
              )
            }
            
          })
        
        }
        {loader?<Spinner animation="grow"/>:null}
        {hasMore === false?"End of List Reached":null}

    </div>
  );
}

export default App;
