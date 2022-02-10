import * as React from 'react';
import Link from 'next/link';
import { Layout } from 'components/layout';	// Local components
import { Images } from 'interfaces';				// Interfaces
import { Button, Form, Input } from 'antd';	// Antd


const Login = () => {
	const [form] = Form.useForm();
	const custom_btn_color = '#E2A9FD';

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout className="flex flex-row">

			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img src={Images.login_collage} className="w-full h-full object-cover"/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2">
				{/* text */}
				<div className="text-modified pb-6">
					<h3 className="text-base text-gray-800">Welcome back</h3>
					<h1 className="text-3xl text-gray-900 font-bold">Login to your account</h1>
				</div>

				{/* Form */}
				<Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
					{/* Email */}
					<Form.Item
						name="email"
						label="Email" 
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					{/* Password */}
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please input your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified"/>
					</Form.Item>
					<Form.Item className="w-full pb-3">
						<Button htmlType="submit" className="btn-modified" style={{background:custom_btn_color}}>
							Login now
						</Button>
					</Form.Item>
				</Form>

				{/* Forgot password */}
				<Link href={'/auth/forgot_password'}>
					<a className="text-sm text-blue-800 text-modified">
						Forgot your password?
					</a>
				</Link>

				{/* Register */}
				<p className="text-base text-modified pt-40">
					Don&apos;t have an account?
					{' '}
					<Link href={'/auth/register'}>
						<a className="font-medium text-blue-800">
							Join Free Today!
						</a>
					</Link>
				</p>
			</div>

		</Layout>
	);
};

export default Login;
