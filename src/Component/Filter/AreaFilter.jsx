import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";

const { Option } = Select;

const AreaFilter = ({ onFilterChange }) => {
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState({
        countries: false,
        provinces: false,
        divisions: false,
        districts: false,
        cities: false,
    });

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // Fetch Countries
    useEffect(() => {
        const fetchCountries = async () => {
            setLoading((prev) => ({ ...prev, countries: true }));
            try {
                const res = await adminInterceptor.get("/admins/country");
                setCountries([res.data?.data] || []);
            } catch (error) {
                console.error("Error fetching countries", error);
            } finally {
                setLoading((prev) => ({ ...prev, countries: false }));
            }
        };
        fetchCountries();
    }, []);

    // Fetch Provinces when country is selected
    useEffect(() => {
        if (selectedCountry) {
            const fetchProvinces = async () => {
                setLoading((prev) => ({ ...prev, provinces: true }));
                try {
                    const res = await adminInterceptor.get(`/admins/provinces`);
                    setProvinces(res.data?.data || []);
                } catch (error) {
                    console.error("Error fetching provinces", error);
                } finally {
                    setLoading((prev) => ({ ...prev, provinces: false }));
                }
            };
            fetchProvinces();
        } else {
            setProvinces([]);
            setSelectedProvince(null);
            setDivisions([]);
            setSelectedDivision(null);
            setDistricts([]);
            setSelectedDistrict(null);
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedCountry]);

    // Fetch Divisions when province is selected
    useEffect(() => {
        if (selectedProvince) {
            const fetchDivisions = async () => {
                setLoading((prev) => ({ ...prev, divisions: true }));
                try {
                    const res = await adminInterceptor.get(
                        `/admins/divisions/get-by-province/${selectedProvince._id}`
                    );
                    setDivisions(res.data?.data.divisions || []);
                } catch (error) {
                    console.error("Error fetching divisions", error);
                } finally {
                    setLoading((prev) => ({ ...prev, divisions: false }));
                }
            };
            fetchDivisions();
        } else {
            setDivisions([]);
            setSelectedDivision(null);
            setDistricts([]);
            setSelectedDistrict(null);
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedProvince]);

    // Fetch Districts when division is selected
    useEffect(() => {
        if (selectedDivision) {
            const fetchDistricts = async () => {
                setLoading((prev) => ({ ...prev, districts: true }));
                try {
                    const res = await adminInterceptor.get(
                        `/admins/districts/get-by-division/${selectedDivision._id}`
                    );
                    setDistricts(res.data?.data.districts || []);
                } catch (error) {
                    console.error("Error fetching districts", error);
                } finally {
                    setLoading((prev) => ({ ...prev, districts: false }));
                }
            };
            fetchDistricts();
        } else {
            setDistricts([]);
            setSelectedDistrict(null);
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedDivision]);

    // Fetch Cities when district is selected
    useEffect(() => {
        if (selectedDistrict) {
            const fetchCities = async () => {
                setLoading((prev) => ({ ...prev, cities: true }));
                try {
                    const res = await adminInterceptor.get(
                        `/admins/cities/get-by-district/${selectedDistrict._id}`
                    );
                    setCities(res.data?.data.cities || []);
                } catch (error) {
                    console.error("Error fetching cities", error);
                } finally {
                    setLoading((prev) => ({ ...prev, cities: false }));
                }
            };
            fetchCities();
        } else {
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedDistrict]);

    // Send selected city ID to parent
    useEffect(() => {
        onFilterChange(selectedCity?._id || null);
    }, [selectedCity, onFilterChange]);

    return (
        <div className="filter-container">
            {/* Select Country */}
            <Select
                placeholder="Select Country"
                className="select-dropdown"
                onChange={(id) =>
                    setSelectedCountry(countries.find((c) => c._id === id))
                }
                value={selectedCountry?._id || undefined}
                allowClear
                showSearch
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={loading.countries ? <Spin size="small" /> : "No Data"}
            >
                {countries.map((country) => (
                    <Option key={country._id} value={country._id}>
                        {country.name}
                    </Option>
                ))}
            </Select>

            {/* Select Province */}
            <Select
                placeholder="Select Province"
                className="select-dropdown"
                onChange={(id) =>
                    setSelectedProvince(provinces.find((p) => p._id === id))
                }
                value={selectedProvince?._id || undefined}
                allowClear
                showSearch
                disabled={!selectedCountry}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={loading.provinces ? <Spin size="small" /> : "No Data"}
            >
                {provinces.map((province) => (
                    <Option key={province._id} value={province._id}>
                        {province.name}
                    </Option>
                ))}
            </Select>

            {/* Select Division */}
            <Select
                placeholder="Select Division"
                className="select-dropdown"
                onChange={(id) =>
                    setSelectedDivision(divisions.find((d) => d._id === id))
                }
                value={selectedDivision?._id || undefined}
                allowClear
                showSearch
                disabled={!selectedProvince}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={loading.divisions ? <Spin size="small" /> : "No Data"}
            >
                {divisions.map((division) => (
                    <Option key={division._id} value={division._id}>
                        {division.name}
                    </Option>
                ))}
            </Select>

            {/* Select District */}
            <Select
                placeholder="Select District"
                className="select-dropdown"
                onChange={(id) =>
                    setSelectedDistrict(districts.find((d) => d._id === id))
                }
                value={selectedDistrict?._id || undefined}
                allowClear
                showSearch
                disabled={!selectedDivision}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={loading.districts ? <Spin size="small" /> : "No Data"}
            >
                {districts.map((district) => (
                    <Option key={district._id} value={district._id}>
                        {district.name}
                    </Option>
                ))}
            </Select>

            {/* Select City */}
            <Select
                placeholder="Select City"
                className="select-dropdown"
                onChange={(id) => setSelectedCity(cities.find((c) => c._id === id))}
                value={selectedCity?._id || undefined}
                allowClear
                showSearch
                disabled={!selectedDistrict}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={loading.cities ? <Spin size="small" /> : "No Data"}
            >
                {cities.map((city) => (
                    <Option key={city._id} value={city._id}>
                        {city.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default AreaFilter;
