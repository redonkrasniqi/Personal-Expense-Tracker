import React, { useContext } from 'react';
import { Form, Select, Typography, Tooltip, Button } from 'antd';
import { CategoryVisibilityContext, CategoryVisibilitySetterContext } from './NewTransaction';

interface CategoryFormProps {
  form: any; // Add form prop
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form }) => {
  const showCategoryForm = useContext(CategoryVisibilityContext);
  const setCategoryVisibility = useContext(CategoryVisibilitySetterContext);
  const { Option } = Select;
  const categories = [
    'Food & Drinks',
    'Shopping',
    'Housing',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Others',
  ];

  const handleCategoryChange = (value: string) => { // New handler
    form.setFieldsValue({ category: value }); // Update form value
  };

  return (
    <>
      <Tooltip title="We automatically assign the category if left empty" placement="bottom">
        <Button type="text" onClick={() => setCategoryVisibility(!showCategoryForm)}>
          {showCategoryForm ? "Close Category Selection" : "Manually Select Category"}
        </Button>
      </Tooltip>
      {showCategoryForm && (
        <Form.Item name="category" label="Category">
          <Select placeholder="Select category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
          <Typography.Text type="secondary">
            AI will assign category based on the description if left blank
          </Typography.Text>
        </Form.Item>
      )}
    </>
  );
};

export default CategoryForm;