import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Form, Select, Typography, Tooltip, Button } from 'antd';
import { CategoryVisibilityContext, CategoryVisibilitySetterContext } from './NewTransaction';
import { fetchCategoriesList } from '../../services/transactionService';
import Loading from '../../components/Loading';

interface CategoryFormProps {
  form: any; // Add form prop
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form }) => {
  const showCategoryForm = useContext(CategoryVisibilityContext);
  const setCategoryVisibility = useContext(CategoryVisibilitySetterContext);

  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [_, setCategoriesError] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  const { Option } = Select;

  const loadCategories = useCallback(async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
          const resp = await fetchCategoriesList();
          setCategoriesData(resp);
      } catch (err: any) {
          console.error('Error fetching predictions:', err);
          setCategoriesError(err.message || 'Unknown error');
      } finally {
          setCategoriesLoading(false);
      }
  }, []);

  useEffect(() => {
      if (showCategoryForm) {
          loadCategories();
      }
  }, [showCategoryForm, loadCategories]);

  const handleCategoryChange = (value: string) => { // New handler
    form.setFieldsValue({ category: value }); // Update form value
  };

  if (categoriesLoading){
    return <Loading />;
  }

  return (
    <>
      {!showCategoryForm && (
        <Tooltip title="We automatically assign the category if left empty" placement="bottom">
          <Button type="text" onClick={() => setCategoryVisibility(true)}>
        Manually Select Category
          </Button>
        </Tooltip>
      )}
      {showCategoryForm && (
        <Button type="text" onClick={() => setCategoryVisibility(false)}>
          Close Category Selection
        </Button>
      )}
      {showCategoryForm && (
        <Form.Item name="category" label="Category">
          <Select placeholder="Select category" onChange={handleCategoryChange}>
            {categoriesData.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
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