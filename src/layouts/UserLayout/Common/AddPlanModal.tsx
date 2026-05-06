import React, { useState } from "react";
import { Modal, Input, Button, Form, Space, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: {
    name: string;
    description: string;
    price: string;
    offer: string;
    duration: string;
    features?: string[];
  }) => void;
  merchant?: any,
}

export const AddPlanModal: React.FC<AddPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  merchant,
}) => {
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    offer: "",
    duration: "1 month",
    features: [""],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...newPlan.features];
    newFeatures[index] = value;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      features: newFeatures,
    }));
  };

  const handleAddFeature = () => {
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      features: [...prevPlan.features, ""],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...newPlan.features];
    newFeatures.splice(index, 1);
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      features: newFeatures,
    }));
  };

  const handleSubmit = () => {
    if (!newPlan.name || !newPlan.price || !newPlan.description) {
      message.error("Please fill in all required fields.");
      return;
    }
    onSubmit(newPlan);
    onClose(); // Close modal after submit
  };

  return (
    <Modal
      title="Add New Offer"
      visible={isOpen}
      onCancel={onClose}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      }
      destroyOnClose
      width={600}
    >
      <Form layout="vertical">
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Offer Name" style={{ flex: 1 }} required>
            <Input
              name="name"
              value={newPlan.name}
              onChange={handleInputChange}
              placeholder="Enter offer name"
            />
          </Form.Item>

          <Form.Item label="Description" style={{ flex: 1 }} required>
            <Input
              name="description"
              value={newPlan.description}
              onChange={handleInputChange}
              placeholder="Enter offer description"
            />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Price" style={{ flex: 1 }} required>
            <Input
              name="price"
              value={newPlan.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item label="Duration" style={{ flex: 1 }} required>
            <Input
              name="duration"
              value={newPlan.duration}
              onChange={handleInputChange}
              placeholder="Enter offer duration"
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Offer" style={{ flex: 1 }} required>
            <Input
              name="offer"
              value={newPlan.offer}
              onChange={handleInputChange}
              placeholder="Enter offer plan"
            />
          </Form.Item>
        </div>

        <Form.Item label="Features">
          {newPlan.features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                style={{ flex: 1 }}
              />
              <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                <Button
                  icon={<MinusOutlined />}
                  type="primary"
                  danger
                  onClick={() => handleRemoveFeature(index)}
                  disabled={newPlan.features.length === 1} // Prevent removing the last feature
                />
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={handleAddFeature}
                />
              </div>
            </div>
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
};


