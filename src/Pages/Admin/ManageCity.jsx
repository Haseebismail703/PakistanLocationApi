import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../Api/api";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const ManageCity = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [areaTypeModalVisible, setAreaTypeModalVisible] = useState(false);
    const [division, setdivisions] = useState([]);
    const [selectCity, setselectCity] = useState(null);
    const [districts, setDistricts] = useState('');
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const [form] = Form.useForm();
    const user = JSON.parse(localStorage.getItem("admin"));
    useEffect(() => {
        getDistricts();
        getAllCities();
    }, []);

    const getDistricts = async () => {
        try {
            const response = await axios.get(`${api}/admins/districts`, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            // console.log(response.data?.data);
            setDistricts(response.data?.data);
        } catch (error) {
            message.error("Failed to fetch District!");
        }
    };

    const getAllCities = async () => {
        setTableLoading(true)
        try {
            const response = await axios.get(`${api}/admins/cities`, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            const cityData = response.data?.data?.map((data, index) => ({
                key: index + 1,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                countryId: data.countryId,
                areaType: data.areaType
            }));
            setdivisions(cityData);
        } catch (error) {
            message.error("Failed to fetch divisions!");
        } finally {
            setTableLoading(false)
        }
    };

    const handleCreate = async (values) => {
        console.log(values)
        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }
        formData.append("districtId", values.districtId);
        formData.append("name", values.name);
        formData.append("details", values.details);
        formData.append("areaType", values.areaType);

        try {
            const response = await axios.post(`${api}/admins/cities/create`, formData, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });

            if (response.status === 201) {
                message.success("Cties added successfully!");
                setCreateModalVisible(false);
                getAllCities();
            } else {
                message.error("Failed to add Cties!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectCity) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `${api}/admins/cities/update-details/${selectCity.id}`,
                { name: values.name, details: values.details },
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );

            if (response.status === 200) {
                message.success("Cities updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAllCities();
            } else {
                message.error("Failed to update Cities");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async (values) => {
        if (!selectCity) return;
        setLoading(true);
        const formData = new FormData();
        if (fileList) {
            fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }
        try {
            const response = await axios.put(
                `${api}/admins/cities/add-pictures/${selectCity.id}`,
                formData,
                { headers: { Authorization: `Bearer ${user?.accessToken}` } }
            );

            if (response.data) {
                message.success("Cities images updated successfully!");
                setUpdateImagesModalVisible(false);
                getAllCities();
            } else {
                message.error("Failed to update Cities images!");
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
                `${api}/admins/cities/delete-pictures/${selectCity.id}`,
                { picturesToDelete: [item] },
                {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }
            );

            if (response.status === 200) {
                message.success("Cities image deleted successfully!");
                getAllCities();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete Cities image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting Cities image. Please try again.");
        }
    };

    const columns = [
        { title: "No", dataIndex: "key", key: "key" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Area Type", dataIndex: "areaType", name: "areaType" },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button icon={<EyeOutlined />} onClick={() => { setselectCity(record); setViewModalVisible(true); }}>View</Button>
                    <Button icon={<EditOutlined />} onClick={() => { setselectCity(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button icon={<EditOutlined />} onClick={() => { setselectCity(record); setAreaTypeModalVisible(true); updateDetailsForm.setFieldsValue(record); }}>Update Area type</Button>
                    <Button icon={<PlusOutlined />} onClick={() => { setselectCity(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => { setselectCity(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    const handleUpdateareaType = async (values) => {
        if (!selectCity) return;
        setLoading(true);
        try {
            const response = await axios.put(`${api}/admins/cities/update-area-type/${selectCity.id}`, { areaType: values.areaType }, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            if (response.status === 200) {
                message.success("Area Type updated successfully!");
                setAreaTypeModalVisible(false);
                getAllCities();
            } else {
                message.error("Failed to update Area Type!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage City</h1></center>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create City</Button>
                <Table loading={tableLoading} columns={columns} dataSource={division} scroll={{ "x": "100%" }} pagination={{ pageSize: 5 }} style={{ marginTop: 20 }} />
            </div>

            { /* Create Division Modal */}
            <Modal
                title="Create City"
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

                    <Form.Item label="Select a District" name="districtId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a Districts">
                            {districts && districts.map((data) => (
                                <Option key={data._id} value={data._id}>{data.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Select Area type" name="areaType" rules={[{ required: true, message: "Please select a area type" }]}>
                        <Select placeholder="Select a Area Type">
                            <Option key={1} value={"Urban"}>{"Urban"}</Option>
                            <Option key={2} value={"Rural"}>{"Rural"}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setFileList(fileList)}
                            fileList={fileList}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal>

            {/* Update Modal */}
            <Modal
                title="Update Cities"
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

            {/* Update Images Modal */}
            <Modal
                title="Add Cities Images"
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
                            onChange={({ fileList }) => setFileList(fileList)}
                            fileList={fileList}
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
                title="Division Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectCity && (
                    <div>
                        <h3>Name: {selectCity.name}</h3>
                        <p><strong>Details:</strong> {selectCity.details}</p>
                        <p><strong>Area Type :</strong> {selectCity.areaType}</p>

                        <h4>Images:</h4>
                        {selectCity.pictures?.length > 0 ? (
                            selectCity.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`Division ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete model  */}
            <Modal
                title="Delete Cities Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectCity?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectCity.pictures.map((imgUrl, index) => (
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
            {/* Create Area Type Modal */}
            <Modal
                title="Create Area Type"
                open={areaTypeModalVisible}
                onCancel={() => setAreaTypeModalVisible(false)}
                footer={null}
            >
                <Form form={updateDetailsForm} layout="vertical" onFinish={handleUpdateareaType}>
                    <Form.Item label="Select Area type" name="areaType" rules={[{ required: true, message: "Please select a area type" }]}>
                        <Select placeholder="Select a Area Type">
                            <Option key={1} value={"Urban"}>{"Urban"}</Option>
                            <Option key={2} value={"Rural"}>{"Rural"}</Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>

            </Modal>
        </>
    );
};

export default ManageCity;