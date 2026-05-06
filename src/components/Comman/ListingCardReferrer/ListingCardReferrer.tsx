import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import './index.css'
import { BankOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { capitalizeAfterComma, capitalizeFirstLetter, isAdminEmail } from '../../../utils/comman';

function ListingCardReferrer({ data, index, isReferral, handleModal, handlEmailSent, handleSendEmailReminder, handleDeleteAdminReferrer }: any) {
  const userData = useSelector((state: any) => state?.Auth?.user?.user || state?.Auth?.user?.data);
  const userRoleId = userData?.roleId;
  const [outstandingData, setOutstandingData] = useState([])
  const [outstandingLoading, setOutstandingLoading] = useState(false);
  const isPayButton = (data?.businessCode === userData?.businessCode);
  const services = data?.rewards?.map((item:any)  => item?.offerName).join(', ')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()


  const columns: any = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (text: any) => <>{text}</>,
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        render: (text: any) => <>{text}</>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text: any) => <>{text}</>,
    },
    {
        title: 'Mobile',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        render: (text: any) => <>{text}</>,
    },
    {
      title: 'Date Referred',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <>{text && moment(text).format('DD/MM/YYYY')}</>,
  },
    {
        title: 'Contacted date',
        dataIndex: 'contactedDate',
        key: 'contactedDate',
        render: (text: any) => <>{text && moment(text).format('DD/MM/YYYY')}</>,
    }
];


  if (userRoleId !== 1)  {
    columns.push({
      title: 'Paid Offer',
      dataIndex: 'paidOffer',
      key: 'paidOffer',
      render: (text: any) => <>{text}</>,
    })
  }



 
  const showModal = (data: any) => {
    setIsModalVisible(true);
    const adminId = userRoleId === 1 ? data?.adminId : data?.invite?.referrerId
    // getOutstandingReferrals(adminId)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div key={index}>
      <div className="feature-card">
        <div className="card-header1">
          {!isReferral ?
          <div>
            <h2 className="card-title1">{data?.invite?.firstName ?? data?.invite?.firstName} {data?.invite?.lastName ?? data?.invite?.lastName}</h2>
            <div className='label-value'>
              <div>Mobile</div>
              <div className='list-Value'>
                {isAdminEmail(data?.email) ? "" : (data?.invite?.mobileNumber ?? data?.invite?.mobileNumber)}
              </div>
            </div>
            <div className='label-value'>
              <div>Email</div>
              <div className='list-Value text-break'>
                {isAdminEmail(data?.email) ? "" : (data?.invite?.email ?? data?.invite?.email)}
              </div>
            </div>
            <div className='label-value'>
              <div>Business Name</div>
              <div className='list-Value text-break'>
                {isAdminEmail(data?.invite?.email) ? "SNBLA Network" : (data?.invite?.referrerBusinessDetails?.businessName ?? data?.invite?.referrerBusinessDetails?.businessName)}
              </div>
            </div>

            <div className='label-value'>
              <div>No Of Referrals</div>
              <div className='list-Value'>{data?.referralsCount}</div>
            </div>
            <div className='label-value'>
              <div>Date Started</div>
              <div className='list-Value'>{data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY') : ""}</div>
            </div>
              {userRoleId !== 1 &&
                <div className='label-value'>
                  <div>Last Date Of Referrals</div>
                  <div className='list-Value'>{data?.invite?.user?.referrals?.length ? moment(data?.invite?.user?.referrals?.[0]?.createdAt).format('DD/MM/YYYY') : ""}</div>
                </div>
              }
            <div className='label-value'>
              <div>Business Service</div>
              <div className='list-Value' style={{ marginLeft: '10px' }}>
                {isAdminEmail(data?.invite?.email) ? "Co-Founder" : <span title={data?.invite?.referrerBusinessDetails?.services}>{data?.invite?.referrerBusinessDetails?.services && (capitalizeFirstLetter(capitalizeAfterComma(data?.invite?.referrerBusinessDetails?.services)))}</span>}
              </div>
            </div>
          </div>
          : 
          <div>
            <h2 className="card-title1">{data?.firstName ?? data?.firstName} {data?.lastName ?? data?.lastName}</h2>
            <div className='label-value'>
              <div>Mobile</div>
              <div className='list-Value'>
                {(data?.mobileNumber ?? data?.mobileNumber)}
              </div>
            </div>
            <div className='label-value'>
              <div>Email</div>
              <div className='list-Value text-break'>
                {(data?.email ?? data?.email)}
              </div>
            </div>
            <div className='label-value'>
              <div>Business Name</div>
              <div className='list-Value text-break'>
                {(data?.businessName ?? data?.businessName)}
              </div>
            </div>

            <div className='label-value'>
              <div>Referred By</div>
              <div className='list-Value'>
                { data?.sender?.contactName || `${data?.sender?.firstName ? data?.sender?.firstName : ''} ${data?.sender?.lastName ? data?.sender?.lastName : ''}`}
              </div>
            </div>
            <div className='label-value'>
              <div>Date Referred</div>
              <div className='list-Value'>{data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY') : ""}</div>
            </div>
            <div className='label-value'>
              <div>Contacted Date</div>
              <div className='list-Value'>{data?.contactedDate && moment(data?.contactedDate).format('DD/MM/YYYY')}</div>
            </div>
            <div className='label-value'>
              <div>Services</div>
              <div className='list-Value' style={{ marginLeft: '10px' }}>
                {services}
              </div>
            </div>
          </div>
          }
        </div>
        <div className='footer-wrapper'>
          <div className='card-service'>
            {!isReferral ?
              <div className="services-list">
                <div className='label-value'>
                  <div>Outstanding Payment</div>
                  <div className='ml-15'>{isAdminEmail(data?.invite?.email) ? "" : <>
                    {data?.outstanding > 0 && <Tag color='red' style={{ cursor: "pointer", textDecoration: "underLine" }} onClick={(e) => showModal(data)}>{data?.outstanding}</Tag>}
                    {data?.outstanding === 0 && <Tag color='green'>{data?.outstanding}</Tag>}
                  </>}
                  </div>
                </div>
                {userRoleId !== 1 && <div className='label-value'>
                  <div>Total Income Referred</div>
                  <div className='ml-15 text-right font-weight-bold'>
                    {isAdminEmail(data?.invite?.email) ? "" : <>{data?.totalIncome}</>}</div>
                </div>
                }
                {userRoleId !== 1 && getStatusTagReferrer(data, handleSendEmailReminder)}
              </div>
              :
              <div className="services-list">
                {userRoleId !== 1 && <div className='label-value'>
                  <div>Paid Offer</div>
                  <div className='ml-15'>{data?.paidOffer}
                  </div>
                </div>
                }
              {OutcomeTags(data, userRoleId, handlEmailSent, isPayButton)}
            </div>
          }
          </div>
          <div className="footer">
            {!isReferral ?
              <Space size="middle">
                {userRoleId !==1 && <Button type='default' disabled={!data?.outstanding} className='btn btn-outline-primary-md' onClick={() => handleModal({ show: true, data: data })}>
                  <BankOutlined /> Pay
                </Button>}
                {userRoleId ===1 && 
                <Popconfirm title="Are you sure you want to mark it as paid?" onConfirm={() => handleModal({ show: true, data: data })} onCancel={()=>console.log("Cancelled!!")}>
                  <Button type='default' disabled={data?.outstanding === 0}  className='btn btn-outline-primary-md'>
                    <BankOutlined /> Pay
                  </Button>
                </Popconfirm>
                }
                {(userRoleId !== 3 && isAdminEmail(data?.invite?.email)) ? "" :
                  <Popconfirm
                    title={userRoleId === 2 ? `Are you sure you want to delete this referrer ?` : `Are you sure you want to delete this referrer? Once you click "OK," all data related to this referrer, including Business, Referrer, and Referral, will be permanently deleted from the system.`}
                    onConfirm={() => handleDeleteAdminReferrer(data)}
                    onCancel={() => console.log("Not sure")}
                    placement="top"
                    overlayStyle={{ width: 400 }}
                  >
                    <DeleteOutlined style={{ color: 'rgb(244, 117, 35)', cursor: 'pointer' }} />
                  </Popconfirm>
                }
              </Space>
              :
              <Space size="middle">
                {userRoleId === 3 &&
                  <Link to={'/view-referral'} state={{ isView: true, data, adminId: 1 }}>
                    <EyeOutlined style={{ fontSize: '18px', textAlign: 'right', marginLeft: '15px' }} />
                  </Link>}
                {(userRoleId === 2 && isPayButton) &&
                  <Button type='default' disabled={data?.outcome === "success" || data?.outcome === 'fail' || data?.isEmailSent === false} className='btn btn-outline-primary-md' onClick={() => handleModal({ show: true, data: data })}>
                    <BankOutlined /> Pay
                  </Button>
                }
                {userRoleId ===1 && 
                <Popconfirm title="Are you sure you want to pay ?" onConfirm={() => handleModal({ show: true, data: data })} onCancel={()=>console.log("Cancelled!!")}>
                  <Button type='default' disabled={data?.outcome === "success"} className='btn btn-outline-primary-md'>
                    <BankOutlined /> Pay
                  </Button>
                </Popconfirm>
                }
              </Space>
            }
          </div>
        </div>
      </div>
       {/* Modal */}
       <Modal
        title="Outstanding Payments"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Optional: You can add custom footer buttons
        width={850}
      >
        <Table dataSource={outstandingData} loading={outstandingLoading} columns={columns} pagination={false} scroll={{ x: 700 }} />
      </Modal>
    </div>
  );
}

export default ListingCardReferrer;

function getStatusTagReferrer(data: any, handleSendEmailReminder: any) {
    return (
        <div className="label-value">
            {data?.invite?.isRegistered ? (
                <Tag color="green">Active</Tag>
            ) : !data?.invite?.emailReminderSent ? (
                <Tooltip title="Send reminder email to the invited referrer">
                    <Popconfirm
                        title="Send email reminder"
                        onConfirm={() => handleSendEmailReminder(data)}
                    >
                        <Tag color="red" style={{ cursor: 'pointer' }}>
                            Invited
                        </Tag>
                    </Popconfirm>
                </Tooltip>
            ) : (
                <Tag color="red">Invited</Tag>
            )}
        </div>
    );
}

function OutcomeTags(data: any, userRoleId: any, handlEmailSent: any, isPayButton: any) {
    let tagElement;
    switch (true) {
      // Successfull tag on outcome success
        case data?.outcome === 'success':
        tagElement = (
          <Tag color="green" style={{ fontSize: '9px' }}>
            Successful
          </Tag>
        );
        break;
      case data?.outcome === true:
        tagElement = (
          <Tag color="green" style={{ fontSize: '9px' }}>
            Successful
          </Tag>
        );
        break;

            // Completed tage when email is sent to the referrer
        case data?.outcome === 'pending' && data?.isEmailSent:
            tagElement = (
                <Tag color="orange" style={{ fontSize: '9px' }}>
                    Completed
                </Tag>
            );
            break;

            // Pending tag when referral sent by the referrers and its clickable
        case data?.outcome === 'pending' &&
            userRoleId === 2 &&
            !data?.selfSend &&
            !data?.isEmailSent && isPayButton:
            tagElement = (
                <Tooltip
                    title={
                        data?.isEmailSent
                            ? 'Email sent'
                            : 'Send email to the referrer'
                    }
                >
                    <Popconfirm
                        title="Are you sure the referral has contacted you? If yes, send email to the referrer."
                        onConfirm={() => handlEmailSent(data)}
                    >
                        <Tag
                            color="red"
                            style={{ fontSize: '9px', cursor: 'pointer' }}
                        >
                            Pending
                        </Tag>
                    </Popconfirm>
                </Tooltip>
            );
            break;
            // Self referral tag when business itself send the referral
        case ( data?.selfSend && data?.outcome === 'pending' ):
            tagElement = (
                <Tag color="yellow" style={{ fontSize: '9px' }}>
                    Self Referral
                </Tag>
            );
            break;

        case data?.outcome === 'pending':
            tagElement = (
                <Tag color="red" style={{ fontSize: '9px' }}>
                    Pending
                </Tag>
            );
            break;

        case data?.outcome === 'fail':
            tagElement = (
                <Tag color="red" style={{ fontSize: '9px' }}>
                    Un-Successfull
                </Tag>
            );
            break;

        default:
            tagElement = null;
    }

    return (
        <div className="label-value">
            <div>Outcome</div>
            <div className="ml-15 text-right font-weight-bold">{tagElement}</div>
        </div>
    );
}

