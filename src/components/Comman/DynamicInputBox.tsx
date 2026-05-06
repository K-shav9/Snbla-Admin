import React, { useEffect } from 'react';
import { useState } from 'react';
import { Input, Button, Row, Col, Tooltip } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

interface InputItem {
    value: string;
}

function DynamicInputBox({servicesValue, setServicesValue, businessInfo}: any) {
    const [inputList, setInputList] = useState<InputItem[]>(servicesValue || [{ value: '' }]);
    const handleAddInput = () => {
        setInputList([...inputList, { value: '' }]);
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputList = [...inputList];
        newInputList[index].value = value;
        setInputList(newInputList);
        setServicesValue(newInputList);
    };

    const handleRemoveInput = (index: number) => {
        const newInputList = [...inputList];
        newInputList.splice(index, 1);
        setInputList(newInputList);
        setServicesValue(newInputList);
    };


    useEffect(() => {
        setInputList(servicesValue || [{ value: '' }]);
    }, [businessInfo, servicesValue]);

    return (
        <Row gutter={16} style={{marginBottom: '15px'}}>
            {inputList.map((input, index) => {
                return <>
                    <Col lg={21} key={index} style={{ marginBottom: '5px'}}>
                        <Input
                            placeholder='Enter services'
                            value={input.value}
                            maxLength={120}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col lg={1}>
                        {inputList?.length > 1 &&
                        <Tooltip title="Delete">
                            <Button
                                type="primary"
                                size='small'
                                className='btn btn-danger'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemoveInput(index)}
                                style={{ marginLeft: 10, top: '14px' }}
                            />
                        </Tooltip>
                        }
                    </Col>
                </>
            })}
            <Col lg={2} style={{ top: '14px', paddingLeft: '25px', cursor: 'pointer'}}>
                <div className='primary' onClick={handleAddInput}>
                    <Tooltip title="Add more services">
                        <PlusCircleOutlined style={{ fontSize: '20px', fontWeight: 'bold', color: '#474df4'}} />
                    </Tooltip>
                </div>
            </Col>
        </Row>
    );
}

export default DynamicInputBox;