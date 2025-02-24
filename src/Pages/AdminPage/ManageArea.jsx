import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image, Spin } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../Api/api";
import axios from "axios";
import usePermission from "../../Hooks/usePermission";

const { TextArea } = Input;
const { Option } = Select;

const ManageArea = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [area, setArea] = useState([]);
    const [selectArea, setselectArea] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [fileList, setFileList] = useState([])
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const user = JSON.parse(localStorage.getItem("admin"));

    let canRead = usePermission("read-operations")
    let canCreate = usePermission("create-operations")
    let canUpdate = usePermission("update-operations")
    let canDelete = usePermission("delete-operations")
    useEffect(() => {
        getCity();
        getAllArea();
    }, []);

    const getCity = async () => {
        try {
            const response = await axios.get(`${api}/admins/cities`, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            setCity(response.data?.data);
        } catch (error) {
            message.error("Failed to fetch divisions!");
        }
    };

    const getAllArea = async () => {
        setTableLoading(true);
        try {
            const response = await axios.get(`${api}/admins/areas`, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            const areaData = response.data?.data?.map((data, index) => ({
                key: index + 1,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                countryId: data.countryId,
            }));
            setArea(areaData);
        } catch (error) {
            message.error("Failed to fetch districts!");
        } finally {
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
        formData.append("cityId", values.cityId);

        try {
            const response = await axios.post(`${api}/admins/areas/create`, formData, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });

            if (response.status === 201) {
                message.success("Area added successfully!");
                setCreateModalVisible(false);
                getAllArea();
            } else {
                message.error("Failed to add Area!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectArea) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `${api}/admins/areas/update-details/${selectArea.id}`,
                { name: values.name, details: values.details },
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );
            if (response.status === 200) {
                message.success("Area updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAllArea();
            } else {
                message.error("Failed to update Area details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async (values) => {
        if (!selectArea) return;

        setLoading(true);
        const formData = new FormData();

        if (fileList) {
            fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        try {
            const response = await axios.put(
                `${api}/admins/areas/add-pictures/${selectArea.id}`,
                formData,
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );

            if (response.data) {
                message.success("Area images add successfully!");
                setUpdateImagesModalVisible(false);
                getAllArea();
            } else {
                message.error("Failed to add Area images!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating images. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        if (!selectArea) return;
        setDeleteLoading(true);
        try {
            const response = await axios.put(
                `${api}/admins/areas/delete-pictures/${selectArea.id}`,
                { picturesToDelete: [item] },
                {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }
            );

            if (response.status === 200) {
                message.success("Area image deleted successfully!");
                getAllArea();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete Area image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting Area image. Please try again.");
        }finally {
            setDeleteLoading(false);
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
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setselectArea(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectArea(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setselectArea(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setselectArea(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Area</h1></center>
                <Button disabled={!canCreate} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Area</Button>
                <Table locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={area} pagination={{ pageSize: 5 }} scroll={{"x" : "100%"}} style={{ marginTop: 20 }} />
            </div>

            { /* Create Area Modal */}
            <Modal
                title="Create Area"
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
                    <Form.Item label="Select a city" name="cityId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a Area">
                            {city && city.map((data) => (
                                <Option key={data._id} value={data._id}>{data.name}</Option>
                            ))}
                        </Select>
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

            {/* Update  Modal */}
            <Modal
                title="Update Area"
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
                title="Add Area Images"
                open={updateImagesModalVisible}
                onCancel={() => setUpdateImagesModalVisible(false)}
                footer={null}
            >
                <Form form={updateImagesForm} layout="vertical" onFinish={handleAddImage}>
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
                title="Area Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectArea && (
                    <div>
                        <h3>Name: {selectArea.name}</h3>
                        <p><strong>Details:</strong> {selectArea.details}</p>
                        <h4>Images:</h4>
                        {selectArea.pictures?.length > 0 ? (
                            selectArea.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`District ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete model  */}
            <Modal
                title="Delete Area Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectArea?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectArea.pictures.map((imgUrl, index) => (
                            <div key={index} style={{ textAlign: "center", marginLeft: 20 }}>
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

export default ManageArea;