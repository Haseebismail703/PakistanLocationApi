import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../Api/api";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const ManageCountry = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [country, setCountry] = useState([]);
    const [selectCountry, setselectCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [fileList,setFileList] = useState([])
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      getAllCountry();
    }, []);
    const getAllCountry = async () => {
        setTableLoading(true);
        try {
            const response = await axios.get(`${api}/admins/country`, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            // console.log(response)
            const countryData = response.data?.data?.map((data, index) => ({
                key: index + 1,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
            }));
            setCountry(countryData);
        } catch (error) {
            message.error("Failed to fetch country!");
        }finally {
            setTableLoading(false);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        formData.append("name", values.name);
        formData.append("details", values.details);

        try {
            const response = await axios.post(`${api}/admins/country/create`, formData, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });

            if (response.status === 201) {
                message.success("country added successfully!");
                setCreateModalVisible(false);
                getAllCountry();
            } else {
                message.error("Failed to add country!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectCountry) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `${api}/admins/country/update-details/${selectCountry.id}`,
                { name: values.name, details: values.details },
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );
            if (response.status === 200) {
                message.success("Country details updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAllCountry();
            } else {
                message.error("Failed to update Country details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateImages = async (values) => {
        if (!selectCountry) return;

        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }
        try {
            const response = await axios.put(
                `${api}/admins/country/add-pictures/${selectCountry.id}`,
                formData,
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );

            if (response.data) {
                message.success("Country images add successfully!");
                setUpdateImagesModalVisible(false);
                getAllCountry();
            } else {
                message.error("Failed to update country images!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating images. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        try {
            const response = await axios.put(
                `${api}/admins/country/delete-pictures/${selectCountry.id}`,
                { picturesToDelete: [item] },
                {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }
            );
    
            if (response.status === 200) {
                message.success("Country image deleted successfully!");
                getAllCountry();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete country image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting country image. Please try again.");
        }
    };
    
    const columns = [
        { title: "No", dataIndex: "key", key: "key" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button icon={<EyeOutlined />} onClick={() => { setselectCountry(record); setViewModalVisible(true); }}>View</Button>
                    <Button icon={<EditOutlined />} onClick={() => { setselectCountry(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button icon={<PlusOutlined />} onClick={() => { setselectCountry(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => { setselectCountry(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Country</h1></center>
                <Button disabled={country ? true : false} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Country</Button>
                <Table loading={tableLoading}  columns={columns} dataSource={country} pagination={{ pageSize: 5 }} scroll={{"x" : "100%"}} style={{ marginTop: 20 }} />
            </div>

            {/* Create Country Modal */}
            <Modal
                title="Create Country"
                open={createModalVisible}
                onCancel={() => setCreateModalVisible(false)}
                footer={null}
            >
                <Form form={createForm} layout="vertical" onFinish={handleCreate}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true, message: "Please enter details!" }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal>

            {/* Update Details Modal */}
            <Modal
                title="Update Country Details"
                open={updateDetailsModalVisible}
                onCancel={() => setUpdateDetailsModalVisible(false)}
                footer={null}
            >
                <Form form={updateDetailsForm} layout="vertical" onFinish={handleUpdateDetails}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true, message: "Please enter details!" }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form>
            </Modal>

            {/* Add Images Modal */}
            <Modal
                title="Add Country Images"
                open={updateImagesModalVisible}
                onCancel={() => setUpdateImagesModalVisible(false)}
                footer={null}
            >
                <Form form={updateImagesForm} layout="vertical" onFinish={handleUpdateImages}>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form>
            </Modal>

            {/* View Modal */}
            <Modal
                title="Country Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectCountry && (
                    <div>
                        <h3>Name: {selectCountry.name}</h3>
                        <p><strong>Details:</strong> {selectCountry.details}</p>
                        <h4>Images:</h4>
                        {selectCountry.pictures?.length > 0 ? (
                            selectCountry.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`Country ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete model  */}
            <Modal
                title="Delete Country Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectCountry?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectCountry.pictures.map((imgUrl, index) => (
                            <div key={index} style={{ textAlign: "center" , marginLeft : 20 }}>
                                <Image src={imgUrl} width={100} height={100} />
                                <Button
                                    danger
                                    size="small"
                                    style={{ marginTop: 5 }}
                                    onClick={() => handleDelete(imgUrl)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images available.</p>
                )}
            </Modal>

        </>
    );
};

export default ManageCountry;