import React from 'react';
import {
    BookOutlined,
    HomeOutlined,
    CarOutlined,
    HeartOutlined,
    GiftOutlined,
    ShoppingOutlined,
    ToolOutlined,
    LaptopOutlined,
    SmileOutlined,
    AppstoreOutlined
  } from "@ant-design/icons";
  
  const categoryIcons = {
    education: BookOutlined,
    home_furniture: HomeOutlined,
    travel: CarOutlined,
    health_wellness: HeartOutlined,
    jewelry: GiftOutlined,
    auto: ToolOutlined,
    toys_electronics: LaptopOutlined,
    fashion_apparel: ShoppingOutlined,
    fitness: SmileOutlined,
    other: AppstoreOutlined,
    null: AppstoreOutlined
  };
  
  export const getCategoryIcon = (categoryKey) => {
    const IconComponent = categoryIcons[categoryKey] || AppstoreOutlined;
    return <IconComponent />;
  };
  