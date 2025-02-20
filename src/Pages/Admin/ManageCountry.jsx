import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Admin_nav from "../../Component/AdminCom/AdminNavbar";

const { TextArea } = Input;

const ManageCountry = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [editingCountry, setEditingCountry] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Open modal for adding country
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission for adding country
  const handleSubmit = (values) => {
    const newCountry = {
      key: Date.now().toString(),
      name: values.name,
      details: values.details,
      pictures: values.pictures?.fileList || [],
    };
    setCountries([...countries, newCountry]);
    setIsModalVisible(false);
    form.resetFields();
  };

  // Close modal for adding country
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Open modal for editing country
  const showEditModal = (country) => {
    setEditingCountry(country);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      name: country.name,
      details: country.details,
      pictures: country.pictures,
    });
  };

  // Handle form submission for editing country
  const handleEditSubmit = (values) => {
    const updatedCountries = countries.map((country) =>
      country.key === editingCountry.key
        ? {
            ...country,
            name: values.name,
            details: values.details,
            pictures: values.pictures?.fileList || [],
          }
        : country
    );
    setCountries(updatedCountries);
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  // Close modal for editing country
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  // Handle file upload
  const handleFileUpload = ({ fileList }) => {
    return fileList;
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Pictures",
      dataIndex: "pictures",
      key: "pictures",
      render: (pictures) => (
        <div>
          {pictures.map((pic, index) => (
            <img
              key={index}
              src={pic.thumbUrl}
              alt={`pic-${index}`}
              style={{ width: 50, marginRight: 5 }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button  type="primary" onClick={() => showEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
    <Admin_nav/>
    <br /><br />
    <center>
        <h1 style={{ fontSize: "24px" }}>Create country</h1>
    </center>
    <div style={{ padding: "20px" }}>
      {/* Button to open modal for adding country */}
      <Button disabled type="primary" onClick={showModal}>
        Create Country
      </Button>

      {/* Modal for adding country */}
      <Modal
        title="Create Country"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please enter the details" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Pictures"
            name="pictures"
            rules={[{ required: true, message: "Please upload pictures" }]}
          >
            <Upload
              multiple
              listType="picture"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleFileUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Pictures</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for editing country */}
      <Modal
        title="Edit Country"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleEditSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please enter the details" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Pictures"
            name="pictures"
            rules={[{ required: true, message: "Please upload pictures" }]}
          >
            <Upload
              multiple
              listType="picture"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleFileUpload}
              defaultFileList={editingCountry?.pictures}
            >
              <Button icon={<UploadOutlined />}>Upload Pictures</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Table to display countries */}
      <Table
        columns={columns}
        dataSource={countries}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: "20px" }}
        scroll={{ x: true }} // Make table responsive
      />
    </div>
    </>
  );
};

export default ManageCountry;