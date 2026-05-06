/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Button, message, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { calculateCommission } from '../../utils/comman';

const SuperAdminPaymentModal = ({ visible, setVisible, isReferral = false, userData, refetchData }: any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const rewardList = useSelector((state: any) => state?.Business?.rewardList?.data);
  const { isLoading } = useSelector((state: any) => state?.General);

  const [amount, setAmount] = useState<any>();
  const [rewardType, setRewardType] = useState<string>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [rewardId, setRewardId] = useState<number>();

  useEffect(() => {
    // dispatch(getAllRewards({}, () => {}));
  }, []);

  useEffect(()=> {
    const rewardType = rewardList?.find((item:any)=> item?.rewardName === visible?.data?.referrerRewards?.[0]?.offerName )
    !isReferral && form.setFieldsValue({
      amount: +visible?.data?.referralsAmount,
      referralCount: +visible?.data?.outstanding,
      reward: visible?.data?.referrerRewards?.[0]?.offerName,
    });
  }, [visible, amount])

  const updatedRewardList = useMemo(() => {
    const list = rewardList; // !isReferral ? rewardList : visible?.data?.rewards;
    return list?.map((item: any) => {
      if (item?.referrerRewardValue) {
        return {
          ...item,
          label: item?.rewardName, //!isReferral ? item?.rewardName : item?.offerName,
          value: item?.id //!isReferral ? item?.referrerRewardValue : item?.offerValue,
        }
       } else return
    });
    
  }, [visible]); // Use `useMemo` to optimize updatedRewardList calculation

  const getOutcome = (value: string) => {
    switch (value) {
      case 'successful':
        return true;
      case 'un-successful':
        return false;
      case 'pending':
        return false;
      default:
        return false;
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // if business and paying for referral
      if (userData?.data?.roleId === 2 && isReferral) {
        // Submit the form data to your API or perform any other action
        const payload = {
          referralId: visible?.data?.id,
          paidOffer: amount,
          outcome: getOutcome(values?.outcome),
          totalAmountPaid: totalAmount,
          offerId: values?.reward,
        };
        if (rewardType === 'percentage') {
          if (!amount) {
            message.error('Paid offer cannot be empty!');
            return; // Exit if amount is empty
          } else {
            // Proceed to dispatch the action if amount is not empty
            // dispatch(
            //   payReferralAction(payload, (resp: any) => {
            //     if (resp) {
            //       setVisible({ ...visible, show: false });
            //       refetchData();
            //     }
            //   })
            // );
          }
        } else if (rewardType !== 'percentage') {
          // dispatch(
          //   payReferralAction(payload, (resp: any) => {
          //     if (resp) {
          //       setVisible({ ...visible, show: false });
          //       refetchData();
          //     }
          //   })
          // );
        }
      } else if (!isReferral) {
        const payload = {
          referrerCode: visible?.data?.businessCode,
          referralsCount: +visible?.data?.referralsCount || +values?.referralCount,
          amount: +values?.amount,
        };
        if (!values?.amount) {
          message.error('Amount cannot be empty!');
          return; // Exit if amount is empty
        } else {
          console.log("payload ::::::::",payload)
          // dispatch(
          //   payReferrerAction(payload, (resp: any) => {
          //     if (resp) {
          //       setVisible({ ...visible, show: false });
          //       refetchData()
          //     }
          //   })
          // );
        }
      } else {
        console.error('Please fill in all fields');
      }

    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  const handleCancel = () => {
    console.log("cancel")
    setVisible(false);
  };

  const handleRewardChange = (value: any) => {
    const rewardValue = rewardList?.find((item: any) => item?.id === value);
    console.log("Reward change ::::::", rewardValue)
    setRewardType(rewardValue?.referrerRewardType)
    setRewardId(value)
    const referrerAmount = +visible?.data?.invite?.referralsAmount;
  
    if(!isReferral) {
      console.log('referrer')
      const payableAmount =
      rewardValue?.referrerRewardType === 'percentage'
      ? calculateCommission(referrerAmount, +rewardValue?.referrerRewardValue)
      : +rewardValue?.referrerRewardValue ? +rewardValue?.referrerRewardValue : 0;
      setAmount(payableAmount ? payableAmount.toFixed(2) : '');
      console.log('payableAmount ::::::::', rewardValue?.referrerRewardValue, payableAmount)
      form.setFieldsValue({
        amount: payableAmount ? payableAmount.toFixed(2) : '',
      });
    }

    if(isReferral) {
      console.log('referral',rewardType)
      if (rewardValue) {
        const payableAmount =
        rewardValue?.referrerRewardType === 'percentage'
        ? calculateCommission(totalAmount, +rewardValue?.referrerRewardValue)
        : +rewardValue?.referrerRewardValue ? +rewardValue?.referrerRewardValue : 0;
        setAmount(payableAmount ? payableAmount.toFixed(2) : '');
        console.log("payableAmount :::::::;", payableAmount)
        form.setFieldsValue({
          paidOffer: payableAmount ? payableAmount.toFixed(2) : "",
        });
      }
    } else {
      console.error('Invalid rewardValue or referralRewardType');
    }
  };

  const handleChangeTotalAmount =(value:any)=> {
    const rewardValue = rewardList?.find((item: any) => item?.id === rewardId);
    console.log("Total amount", rewardType, rewardValue)
    const amountValue = +value;
    const payableAmount =
    rewardValue?.referrerRewardType === 'percentage'
    ? calculateCommission(amountValue, +rewardValue?.referrerRewardValue)
    : rewardValue?.referrerRewardValue ? +rewardValue?.referrerRewardValue : 0;
    setTotalAmount(value);
    setAmount(amountValue ? payableAmount.toFixed(2) : '');
    console.log("amountValue :::", amountValue, payableAmount)
    payableAmount && form.setFieldsValue({
      paidOffer: amountValue ? payableAmount.toFixed(2) : '',
    });
  }

  const RenderFormInput = () => {
    if (!isReferral) {
      return (
        <>
        <Form.Item
          label="Outstanding Referral Count"
          name="referralCount"
        >
          <Input disabled defaultValue={''} size='large' type="number" placeholder="Enter referral count" />
        </Form.Item>
        <Row>
            <Col lg={12}>
              <Form.Item
                label="Reward Name"
                name="reward"
                rules={[{ required: false, message: 'Please select reward' }]}
              >
                <Select disabled={!isReferral} placeholder="Select reward" onChange={(value: any) => handleRewardChange(value)}>
                <Select.Option disabled={!isReferral} value={""}> No Reward </Select.Option>
                {updatedRewardList?.map((item: any, index: number) => {
                  if(item?.label) {
                    return (
                      <Select.Option  value={item?.value} key={index}>{item?.label} </Select.Option>
                    );
                  }
                })}
                </Select>
              </Form.Item>
            </Col>
            {(rewardType || !isReferral) && <Col lg={11} style={{ marginLeft: '15px' }}>
              <Form.Item
                label="Reward Type"
                name="rewardType"
              >
                <Input disabled={!isReferral} size='large' style={{ height: '48px' }} placeholder="Reward Type" />
              </Form.Item>
            </Col>}

          </Row>
        <Form.Item
          label="Total Amount"
          name="amount"
        >
          <Input defaultValue={''} size='large' type="number" placeholder="Enter total amount" />
        </Form.Item>
      </>
      );
    } else {
      return (
        <>
          <Form.Item
            label="Outcome"
            name="outcome"
            rules={[{ required: true, message: 'Please select outcome' }]}
          >
            <Select placeholder="Select outcome">
              <Select.Option value="successful">Successful</Select.Option>
              <Select.Option value="un-successful">Un-Successful</Select.Option>
            </Select>
          </Form.Item>
          <Row>
            <Col lg={12}>
              <Form.Item
                label="Reward Name"
                name="reward"
                rules={[{ required: false, message: 'Please select reward' }]}
              >
                <Select placeholder="Select reward" onChange={(value: any) => handleRewardChange(value)}>
                <Select.Option value={""}> No Reward </Select.Option>
                {updatedRewardList?.map((item: any, index: number) => {
                  if(item?.label) {
                    return (
                      <Select.Option value={item?.value} key={index}>{item?.label} </Select.Option>
                    );
                  }
                })}
                </Select>
              </Form.Item>
            </Col>
            {rewardType && <Col lg={11} style={{ marginLeft: '15px' }}>
              <Form.Item
                label="Reward Type"
                name="rewardType"
              >
                <Input size='large' style={{ height: '48px' }} placeholder="Reward Type" />
              </Form.Item>
            </Col>}
          </Row>
          <Form.Item
            label="Total Amount You Received"
            name="amount"
          >
            <Input onChange={(evt:any) => handleChangeTotalAmount(evt?.target?.value)} defaultValue={totalAmount} size='large' type="number" placeholder="Enter total amount" />
          </Form.Item>
          <Form.Item
            label="Paid Offer To The Referral"
            name="paidOffer"
            rules={[
              {
                required: false,
                message: 'Please enter paid offer'
              },
            ]}
          >
            <Input size='large' value={amount ? amount : ""} onChange={(evt:any)=> setAmount(evt?.target?.value)} placeholder="Enter paid offer" />
          </Form.Item>
        </>
      );
    }
  };

  return (
    <div>
      <Modal
        title="Make a Payment"
        visible={visible?.show}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="col-lg-12 mt-15">
            <div className="text-end btn-groups-Forms">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  console.log("cancel f")
                  setVisible({ ...visible, show: false });
                  form.setFieldsValue({
                    amount: "",
                    reward: "",
                    rewardType: "",
                    totalAmount: '',
                    paidOffer: '',
                    referralCount: ""
                  });
                }}
              >
                Cancel
              </button>
              <Button
                className="btn btn-primary"
                type="primary"
                onClick={() => form.submit()}
                loading={isLoading}
              >
                {isLoading ? 'Loading...' : 'Pay'}
              </Button>
            </div>
          </div>
        ]}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          {RenderFormInput()}
        </Form>
      </Modal>
    </div>
  );
};

export default SuperAdminPaymentModal;