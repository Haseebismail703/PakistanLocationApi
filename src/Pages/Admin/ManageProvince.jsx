import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select } from "antd";
import { UploadOutlined, EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Admin_nav from "../../Component/AdminCom/AdminNavbar";

const { TextArea } = Input;
const { Option } = Select;

const ManageProvince = () => {
    const [isModalVisible, setIsModalVisible] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [form] = Form.useForm();
    
    const showModal = (type, province = null) => {
        setSelectedProvince(province);
        setIsModalVisible(type);
    };

    const handleCancel = () => {
        setIsModalVisible(null);
        form.resetFields();
    };

    const handleSubmit = (values) => {
        const picturesArray = values.pictures?.fileList || [];
    
        const newProvince = {
            key: Date.now().toString(),
            name: values.name,
            details: values.details,
            country: values.country,
            pictures: picturesArray.map(file => ({
                url: URL.createObjectURL(file.originFileObj),
                thumbUrl: URL.createObjectURL(file.originFileObj),
            })),
        };
    
        setProvinces([...provinces, newProvince]);
        handleCancel();
    };
    

    const handleUpdate = (values) => {
        setProvinces(provinces.map(prov => prov.key === selectedProvince.key ? { ...prov, ...values } : prov));
        handleCancel();
    };

    const columns = [
        { title: "No", dataIndex: "key", key: "key", render: (_, __, index) => index + 1 },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button icon={<EyeOutlined />} onClick={() => showModal("view", record)}>View</Button>
                    <Button icon={<PlusOutlined />} onClick={() => showModal("addImage", record)}>Add Image</Button>
                    <Button icon={<EditOutlined />} onClick={() => showModal("update", record)}>Update</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => showModal("deleteImage", record)}>Delete Image</Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Admin_nav />
            <div style={{ padding: 20 }}>
                <center>
                   <h1 style={{fontSize : 30}}>Manage Provinces</h1> 
                </center>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal("create")}>Create Province</Button>
                <Table columns={columns} dataSource={provinces} pagination={{ pageSize: 5 }} style={{ marginTop: 20 }} />
            </div>

            <Modal title={isModalVisible === "create" ? "Create Province" : "Update Province"} open={isModalVisible === "create" || isModalVisible === "update"} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" form={form} onFinish={isModalVisible === "create" ? handleSubmit : handleUpdate} initialValues={selectedProvince}>
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item>
                    <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                        <Select placeholder="Select a country">
                            <Option value="USA">USA</Option>
                            <Option value="Canada">Canada</Option>
                            <Option value="UK">UK</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload multiple listType="picture" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">{isModalVisible === "create" ? "Submit" : "Update"}</Button>
                </Form>
            </Modal>

            <Modal title="Province Details" open={isModalVisible === "view"} onCancel={handleCancel} footer={null}>
                <p><strong>Name:</strong> {selectedProvince?.name}</p>
                <p><strong>Details:</strong> {selectedProvince?.details}</p>
                <p><strong>Country:</strong> {selectedProvince?.country}</p>
                <div>
                    {selectedProvince?.pictures?.map((pic, index) => (
                        <img key={index} src={pic.url} alt="Province" width={100} style={{ margin: "5px", borderRadius: "5px" }} />
                    ))}
                </div>
            </Modal>

            <Modal title="Add Image" open={isModalVisible === "addImage"} onCancel={handleCancel} footer={null}>
                <Upload multiple listType="picture" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                </Upload>
            </Modal>

            <Modal title="Delete Images" open={isModalVisible === "deleteImage"} onCancel={handleCancel} footer={null}>
                {selectedProvince?.pictures?.map((pic, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <img src={pic.url} alt="" width={100} style={{ borderRadius: "5px" }} />
                        <Button danger onClick={() => {}}>Delete</Button>
                    </div>
                ))}
            </Modal>
        </>
    );
};

export default ManageProvince;