import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import adminInterceptor from "../../Api/adminInterceptor";
import usePermission from "../../Hooks/usePermission";
import { useNavigate, useSearchParams } from "react-router-dom";
import CityFilter from "../../Component/Filter/CityFilter";
const { TextArea } = Input;
const { Option } = Select;

const ManageCity = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [areaTypeModalVisible, setAreaTypeModalVisible] = useState(false);
    const [city, setCity] = useState([]);
    const [allCities, setAllCities] = useState([]); // Stores full data
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const[selectedareaType,setSelectedareaType]=useState(null);
    const [selectCity, setselectCity] = useState(null);
    const [districts, setDistricts] = useState('');
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const [form] = Form.useForm();
    const getAdmin = JSON.parse(localStorage.getItem("admin"));
    let canRead = usePermission("read-operations")
    let canCreate = usePermission("create-operations")
    let canUpdate = usePermission("update-operations")
    let canDelete = usePermission("delete-operations")

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get currentPage and pageSize from URL or default to 1 and 10
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("size")) || 10;
    useEffect(() => {
        getDistricts();
        getAllCities();
    }, [currentPage, pageSize, selectedDistrictId]);



    useEffect(() => {
        let filteredCities = allCities;

        if (selectedDistrictId) {
            filteredCities = filteredCities.filter(
                (city) => city.districtId === selectedDistrictId
            );
        }

        if (selectedareaType && selectedareaType !== "All") {
            filteredCities = filteredCities.filter(
                (city) => city.areaType === selectedareaType
            );
        }

        setCity(filteredCities);
    }, [selectedDistrictId, selectedareaType, allCities]);
    

    const getAllCities = async () => {
        setTableLoading(true);
        setCity([]);

        try {
            const response = await adminInterceptor.get(
                `/admins/cities${selectedDistrictId ? `/get-by-district/${selectedDistrictId}` : ""}?skip=${selectedDistrictId ? 0 : (currentPage - 1) * pageSize}&limit=${selectedDistrictId ? 0 : pageSize}`
            );

            console.log("Response in cities:", response?.data.data.cities);

            const citiesData = response.data?.data?.cities?.map((data, index) => ({
                key: index + 1 + (currentPage - 1) * pageSize,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                areaType: data.areaType,
                districtId: data.district?._id || null,
                districtName: data.district?.name || null,
            }));

            setAllCities(citiesData); // Store full data for filtering
            setCity(citiesData); // Show in UI
            setTotalItems(response.data?.data.totalItems || 1000);
        } catch (error) {
            message.error("Failed to fetch cities!");
        } finally {
            setTableLoading(false);
        }
    };


    const getDistricts = async () => {
        try {
            const response = await adminInterceptor.get(`/admins/districts?limit=0`);
            // console.log(response.data?.data);
            setDistricts(response.data.data?.districts);
        } catch (error) {
            message.error("Failed to fetch District!");
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
            const response = await adminInterceptor.post(`/admins/cities/create`, formData);

            if (response.status === 201) {
                message.success("Cties added successfully!");
                setCreateModalVisible(false);
                getAllCities();
                setFileList([])
                createForm.resetFields();
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
            const response = await adminInterceptor.put(
                `/admins/cities/update-details/${selectCity.id}`,
                { name: values.name, details: values.details },

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
            const response = await adminInterceptor.put(
                `/admins/cities/add-pictures/${selectCity.id}`,
                formData,

            );

            if (response.data) {
                message.success("Cities images updated successfully!");
                setUpdateImagesModalVisible(false);
                getAllCities();
                setFileList([])
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
            const response = await adminInterceptor.put(
                `/admins/cities/delete-pictures/${selectCity.id}`,
                { picturesToDelete: [item] },

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
        {
            title: "Name", dataIndex: "name", key: "name",
            render: (_, record) => (
                <>
                    <span>{canRead ? record.name : "_"}</span>
                </>
            )
        },
        {
            title: "Area Type", dataIndex: "areaType", name: "areaType",
            render: (_, record) => (
                <>
                    <span>{canRead ? record.areaType : "_"}</span>
                </>
            )
        },
        { title: "District Name", dataIndex: "districtName", key: "districtName" },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setselectCity(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectCity(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectCity(record); setAreaTypeModalVisible(true); updateDetailsForm.setFieldsValue(record); }}>Update Area type</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setselectCity(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setselectCity(record); setDeleteImagesModalVisible(true); }}>
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
            const response = await adminInterceptor.put(`/admins/cities/update-area-type/${selectCity.id}`, { areaType: values.areaType });
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
                <Button disabled={!canCreate} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create City</Button>
                <br /><br />
                <CityFilter onareTypeChange={(value)=> setSelectedareaType(value)} onFilterChange={(districtId) => setSelectedDistrictId(districtId)} />
                    {/* <Select
                    className="select-dropdown"
                        placeholder="Select Area Type"
                        onChange={(value) => {
                            const filteredCities = allCities.filter(city => city.areaType === value);
                            setCity(filteredCities);
                        }}
                        style={{ width: 200, marginBottom: 20 }}
                    >
                        <Option value="Urban">Urban</Option>
                        <Option value="Rural">Rural</Option>
                    </Select> */}


                <Table locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={city} scroll={{ "x": "100%" }} pagination={false} style={{ marginTop: 20 }} />
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        if (page < currentPage || city.length === pageSize) {
                            navigate(`?page=${page}&size=${size}`);
                        } else {
                            message.warning("No more data to display.");
                        }
                    }}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50", "100", totalItems.toString()]}
                    className="responsive-pagination"
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    hideOnSinglePage={true}
                    showLessItems={true}
                    responsive // ✅ Automatically adjusts layout for smaller screens
                    simple={window.innerWidth < 768} // ✅ Shows compact pagination on small screens
                />

            </div>

            { /* Create city Modal */}
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
                title="city Details"
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
                                <Image key={index} width={200} src={pic} alt={`city ${index}`} />
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
                style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}
            >
                {selectCity?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectCity.pictures.map((imgUrl, index) => (
                            <div key={index} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "10px",
                                background: "#f9f9f9"
                            }}>
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