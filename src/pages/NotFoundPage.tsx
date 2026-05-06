import React, { useEffect } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   navigate("/");
    // }, 10);

    // Cleanup the timer on component unmount
    // return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
      />
    </div>
  )
}

export default NotFoundPage