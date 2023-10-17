import { Button, Col, Form, Row, Select, Typography, message } from "antd";
import { KurirOptions } from "./cekOngkirForm.constants";
import { useMutation, useQuery } from "react-query";
import {
  getCityList,
  getCost,
  getProvinceList,
} from "../../../services/ongkir";
import { useState } from "react";
import type { SelectProps } from "antd";
import CustomTable from "../../Global/CustomTable";
import { Columns } from "./cekOngkirForm.interfaces";
const { Title } = Typography;

export default function CekOngkirForm() {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<SelectProps["options"]>([]);
  const [startCities, setStartCities] = useState<SelectProps["options"]>([]);
  const [destCities, setDestCities] = useState<SelectProps["options"]>([]);
  const [costs, setCosts] = useState<Columns[]>([]);

  const inputValues = Form.useWatch([], form);

  const Cost = useMutation(getCost, {
    onSuccess: (
      data: {
        service: string;
        cost: {
          value: number;
          etd: string;
          note: string;
        }[];
      }[]
    ) => {
      console.log(data);
      const formattedData: Columns[] = data?.map((item) => ({
        key: item.service,
        name: item.service,
        service: item.cost[0].etd,
        ongkir: item.cost[0].value,
      }));
      setCosts(formattedData);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  const onFinish = (values: {
    startState: number;
    startCity: number;
    destinationState: number;
    destinationCity: number;
    courier: string;
  }) => {
    const payload = {
      origin: values.startCity,
      destination: values.destinationCity,
      weight: 1000,
      courier: values.courier,
    };
    Cost.mutate(payload);
  };

  const { isLoading } = useQuery("getProvinces", getProvinceList, {
    onSuccess: (data: { province_id: string; province: string }[]) => {
      const formattedData: SelectProps["options"] = data.map((province) => ({
        label: province.province,
        value: province.province_id,
      }));
      setProvinces(formattedData);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  const { isLoading: isLoadingCities } = useQuery({
    queryKey: ["getCities", inputValues?.startState],
    queryFn: () => getCityList(inputValues?.startState),
    enabled: !!inputValues?.startState,
    onSuccess: (data: { city_id: string; city_name: string }[]) => {
      const formattedData: SelectProps["options"] = data.map((city) => ({
        label: city.city_name,
        value: city.city_id,
      }));
      setStartCities(formattedData);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  const { isLoading: isDestCityLoading } = useQuery({
    queryKey: ["getCities", inputValues?.destinationState],
    queryFn: () => getCityList(inputValues?.destinationState),
    enabled: !!inputValues?.destinationState,
    onSuccess: (data: { city_id: string; city_name: string }[]) => {
      const formattedData: SelectProps["options"] = data.map((city) => ({
        label: city.city_name,
        value: city.city_id,
      }));
      setDestCities(formattedData);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <Title level={2} className="!mb-8">
          Cek Ongkir
        </Title>
      </div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={false}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="startState"
              label="Provinsi asal"
              rules={[
                {
                  required: true,
                  message: "Provinsi asal harus diisi",
                },
              ]}
              required
            >
              <Select
                placeholder="Pilih Provinsi Asal"
                loading={isLoading}
                options={provinces}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startCity"
              label="Kota asal"
              rules={[
                {
                  required: true,
                  message: "Kota asal harus diisi",
                },
              ]}
            >
              <Select
                placeholder="Pilih Kota Asal"
                options={startCities}
                loading={isLoadingCities}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="destinationState"
              label="Provinsi tujuan"
              rules={[
                {
                  required: true,
                  message: "Provinsi tujuan harus diisi",
                },
              ]}
            >
              <Select
                placeholder="Pilih Provinsi Tujuan"
                loading={isLoading}
                options={provinces}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="destinationCity"
              label="Kota tujuan"
              rules={[
                {
                  required: true,
                  message: "Kota tujuan harus diisi",
                },
              ]}
            >
              <Select
                placeholder="Pilih Kota Tujuan"
                options={destCities}
                loading={isDestCityLoading}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="courier"
              label="Pilih Kurir"
              rules={[
                {
                  required: true,
                  message: "Kurir harus diisi",
                },
              ]}
            >
              <Select placeholder="Pilih Kurir" options={KurirOptions} />
            </Form.Item>
          </Col>
          <Button
            type="primary"
            block
            className="bg-primary"
            htmlType="submit"
            loading={Cost.isLoading}
          >
            Cek Ongkir
          </Button>
        </Row>
      </Form>
      {costs.length > 0 && (
        <CustomTable
          className="mt-8"
          bordered
          isLoading={Cost.isLoading}
          pagination={false}
          columns={[
            {
              title: "Kurir",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Service",
              dataIndex: "service",
              key: "service",
            },
            {
              title: "Ongkir",
              dataIndex: "ongkir",
              key: "ongkir",
            },
          ]}
          dataSource={costs || []}
        />
      )}
    </>
  );
}
