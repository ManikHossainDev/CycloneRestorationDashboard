/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {  Form, Input, message, Modal, Switch } from "antd";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { useChangePasswordMutation } from "../../../redux/features/profile/profileApi";
const TeamsSettings = () => {
  const { user } = useSelector((state) => state?.auth);
  const token = useSelector((state) => state?.auth?.token);
  const email = user?.email;


  // console.log(user?.email)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const changePasswordToken = useSelector(
    (state) => state.auth.changePasswordToken
  );
  //change password useing old password rtk query api
  const [changePassWithOldPass, { isLoading: changePasswordLoading }] = useChangePasswordMutation();
  
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleNavigate = (value) => {
    if (value === "notification") {
      return;
    } else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };
  const handleChangePassword = async (values) => {
    console.log(values);
    const { oldPassword, newPassword } = values;
    const data = {  new_password:newPassword, };
    try {
      const res = await changePassWithOldPass(data);
      console.log(res);
      if(res?.data){

        message.success(res?.data?.message)
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("first");
    }
  };

  
  const { t } = useTranslation();

  const settingsItem = [
    {
      title: `${t("Change password")}`,
      path: "change-password",
    },
    {
      title: "Add Team Member",
      path: "AddTeamMember",
    },
  ];

  return (
    <section className="w-full py-6 pr-3">
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="w-full p-4 mb-2 text-sm rounded-lg bg-[#E5F6FD]  flex items-center justify-between cursor-pointer"
          onClick={() => handleNavigate(setting.path)}
        >
          <h2 className="font-semibold">{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch defaultChecked onChange={onChange} />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </h2>
        </div>
      ))}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex bg-primary items-center cursor-pointer text-black"
          >
            <h1 className="text-xl  font-medium  mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5 ">
            <p className="text-[14px] mb-[14px]">
              {t("Your password must be 8-10 character long.")}
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Set Your New Password"
                  name="newPassword"
                  className="w-full px-3 py-2"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Re-enter Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  className="w-full px-3 py-2"
                />
              </Form.Item>
              <p className=" text-secondary font-medium">
                <button onClick={() => setModelTitle("Forget password")}>
                  {/* <h1 className="underline text-[#48B1DB]">
                    {t("Forget Password")}
                  </h1> */}
                </button>
              </p>
              <Form.Item>
                <button
                  type="submit"
                  className="w-full px-5 py-4  mt-2 text-white bg-[#48B1DB] rounded-lg"
                >
                  {changePasswordLoading ? (
                    <h1 className="flex justify-center items-center gap-1">
                      <ImSpinner6 className="animate-spin size-5" />
                      <span>Update password</span>
                    </h1>
                  ) : (
                    ""
                  )}
                  {t("Update Password")}
                </button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default TeamsSettings;
