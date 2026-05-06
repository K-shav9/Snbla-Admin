import React from "react";
import { InputNumber, Button, Space } from "antd";

const NumberInputWithControls = ({
  value = 0,
  onChange,
  min = 0,
  max = 100000000,
  step = 1,
  placeholder = "Enter value",
  addonAfter,
}: any) => {
  return (
    <Space>
      <Button
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
      >
        -
      </Button>
      <InputNumber
        value={value}
        onChange={onChange} // Allow free input
        placeholder={placeholder}
        controls={false}
        style={{ width: "100%" }}
      />
      <Button
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
      >
        +
      </Button>
      {addonAfter && <span>{addonAfter}</span>}
    </Space>
  );
};

export default NumberInputWithControls;
