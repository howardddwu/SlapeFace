import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

import { Button, Checkbox, Form, Input, message } from "antd";

import * as UserAPI from "../../API/UserAPI";
import "./UserProfile.css";
const ChangPassword = () => {
  const { user } = useContext(AuthContext);

  const [componentDisabled, setComponentDisabled] = useState(true);

  const onFinish = async (values) => {
    const userId = user._id;
    const ifErr = await UserAPI.changePassword(values, userId);
    console.log(ifErr);
    if (ifErr.data.success) {
      message
        .success("Password has been changed!")
        .then(() => window.location.reload());
    } else {
      message.error("Incorrect password");
    }
  };

  return (
    <div className="userinfo">
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
        className="edit-checkbox"
      >
        Edit disabled
      </Checkbox>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={componentDisabled}
        className="form"
      >
        <Form.Item
          label="Current Password"
          name="oldpassword"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
                        label="Comfirm Password"
                        name="comfirmPassword"
                        rules={[{
                                required: true,
                                message: 'Please input your password!',
                            },]}>
                        <Input.Password />
                    </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangPassword;
