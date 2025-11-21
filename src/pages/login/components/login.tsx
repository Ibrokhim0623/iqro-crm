import { Form, Input, Button, Typography } from "antd";
import { useLogin } from "../hooks";
import loginBg from "@images/login1.jpg";

const { Title } = Typography;

const Login = () => {
  const { login, loading, error } = useLogin();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    login(values.email, values.password);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute w-full h-full top-0 left-0 z-1">
        <img className="w-full h-full object-cover" src={loginBg} />
      </div>
      <div className="relative z-2 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <Title level={3} className="text-center mb-6 text-gray-700!">
          Login to CRM
        </Title>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <Form.Item
            label={<span className="font-medium">Email</span>}
            name="email"
            rules={[{ required: true, message: "Email kiriting" }]}
          >
            <Input
              type="email"
              size="large"
              className="rounded-lg!"
              placeholder="your@email.com"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">Password</span>}
            name="password"
            rules={[{ required: true, message: "Parol kiriting" }]}
          >
            <Input.Password
              size="large"
              className="rounded-lg!"
              placeholder="••••••••"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="w-full h-11! rounded-lg! bg-blue-600 hover:bg-blue-700!"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
