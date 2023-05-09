import React from 'react';
import { Form, Input, Select, Radio, Checkbox } from 'antd';
import schema1 from '../schemas/schema1.json';
import schema2 from '../schemas/schema2.json';
import { capitalize } from '../utils/string';

interface Props {
  schema: any; // TODO: 根据需要定义具体的 schema 类型
}

const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const schemaMap: Record<string, any> = {
  // TODO: 根据需要添加更多 schema
};

export function SchemaRenderer({ schema }: Props) {
  const { type, title, properties } = schema;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  if (!type || !title || !properties) {
    return null;
  }

  const renderFormItems = () => {
    return Object.entries(properties).map(([key, value]) => {
      const { type, title, description, enum: enumList } = value;
      const fieldName = capitalize(key);

      switch (type) {
        case 'string':
          return (
            <Form.Item {...formItemLayout} label={title} key={fieldName}>
              <Input placeholder={description} />
            </Form.Item>
          );
        case 'number':
          return (
            <Form.Item {...formItemLayout} label={title} key={fieldName}>
              <Input type="number" placeholder={description} />
            </Form.Item>
          );
        case 'boolean':
          return (
            <Form.Item {...formItemLayout} label={title} key={fieldName}>
              <RadioGroup>
                <Radio value>{title}</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </Form.Item>
          );
        case 'array':
          return (
            <Form.Item {...formItemLayout} label={title} key={fieldName}>
              <CheckboxGroup options={enumList} />
            </Form.Item>
          );
        case 'object':
          if (!enumList) {
            console.warn(`${fieldName} 未定义枚举列表`);
            return null;
          }
          return (
            <Form.Item {...formItemLayout} label={title} key={fieldName}>
              <Select>
                {enumList.map((item: any) => (
                  <Option value={item.value} key={item.label}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        default:
          console.warn(`未知类型: ${type}`);
          return null;
      }
    });
  };

  const schemaConfig = schemaMap[`${type}`];
  return (
    <Form>
      <h1>{title}</h1>
      <p>{schemaConfig.description}</p>

      {renderFormItems()}
    </Form>
  );
}