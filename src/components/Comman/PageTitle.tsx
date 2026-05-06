import { Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    pagTitle: string;
    button?: boolean;
    buttonLink?: string;
    buttonLabel?: string;
    buttonClick?: any;
    isSuperAdmin?: boolean;
}
const PageTitle: React.FC<HeaderProps> = ({ pagTitle, button, buttonLink, buttonLabel, buttonClick, isSuperAdmin=false }) => {
    const navigate = useNavigate();
    const userData = useSelector((state: any) => state?.Auth?.user);
    const userRoleId = userData?.data?.roleId;
    const buttonLabelWithClicks = ['Add Ticket', 'Refer SNBLA', `Add Category`]
    const handleButtonClick =()=> {
        if(buttonLabelWithClicks?.includes(buttonLabel)) {
            buttonClick()
        }
        navigate(buttonLink)
    }

  return (
      <div className='py-10'>
          <div className="d-flex justify-content-between">
              <div className="bodycardheading">
              <div className="mobileView buttonsvgs" onClick={()=> navigate(-1)}>
                            {' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <rect
                                    x="0.4"
                                    y="1.18168"
                                    width="23.2"
                                    height="23.2"
                                    rx="11.6"
                                    stroke="#474df4"
                                    strokeWidth="0.8"
                                />
                                <path
                                    d="M14 8.78168L10 12.7817L14 16.7817"
                                    stroke="#474df4"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                {pagTitle}
              </div>
              {(button && isSuperAdmin) && <Button size='small' style={{height: '39px', fontSize: '12px'}} type='primary' onClick={() => handleButtonClick()} className='btn btn-primary'>{buttonLabel}</Button>}
              {(button && userRoleId !==1) && <Button size='small' style={{height: '39px', fontSize: '12px'}} type='primary' onClick={() => handleButtonClick()} className='btn btn-primary'>{buttonLabel}</Button>}
          </div>
      </div>
  )
}

export default PageTitle