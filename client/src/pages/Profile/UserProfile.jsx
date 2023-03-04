import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';

import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    Upload,
    message,
    TreeSelect
} from 'antd';

import { categoryList, treeData } from "../../Category.js"
import pic1 from "../../DefaultProfile_1.jpg"
import * as UserAction from "../../actions/UserAction.js"
import ChangPassword from './ChangPassword';



const UserProfile = () => {

    const { isFetching, dispatch, user } = useContext(AuthContext);

    //============================= Major option for select bar =================================
    // const categoryOptions = [];
    // for (let category of categoryList) {
    //     categoryOptions.push({
    //         value: category,
    //         label: category,
    //     });
    // }
    // categoryOptions.sort(function (a, b) {
    //     if (a.label < b.label) { return -1; }
    //     if (a.label > b.label) { return 1; }
    //     return 0;
    // })
    //=======================================================================

    const [componentDisabled, setComponentDisabled] = useState(true);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };


    const [userInfo, setUserinfo] = useState({
        displayname: user.displayname,
        likedCategory: user.likedCategory,
        icon: user.icon,
    })

    const handleCategory = (value) => {
        setUserinfo({ ...userInfo, likedCategory: value })
    }
    const handleEdit = (e) => {
        setUserinfo({ ...userInfo, displayname: e.target.value })
    }

    const handleEditSubmit = async () => {
        // if(userInfo.icon)
        //     console.log(userInfo)
        // else{
        //     let {icon, ...finalForm} = userInfo;
        //     console.log(finalForm)
        // }
        let ifErr;
        if (userInfo.icon)
            ifErr = await UserAction.editProfile(userInfo, user._id, dispatch)
        else {
            let { icon, ...finalForm } = userInfo;
            ifErr = await UserAction.editProfile(finalForm, user._id, dispatch)
        }
        if (ifErr) {
            message.error('Something went wrong, please re-login or try later');
        }
        else {
            window.location.reload()
        }

    }


    //deal with the img file:    
    const [validImg, setValidImg] = useState(false);

    const getBase64 = (img, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isJpgOrPng && isLt2M) {
            setValidImg(true)
        } else
            setValidImg(false)

        return false;
    };

    const onRemove = () => {
        setValidImg(false)
        setUserinfo({ ...userInfo, icon: null })
    }


    const handleChange = (info) => {
        if (validImg && info.fileList.length > 0) {
            getBase64(info.file, (url) => {
                setUserinfo({ ...userInfo, icon: url })
            })
        }
    }


    return (
        <div>
            {/* show user's all profile infomation */}
            <div>
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                    style={{
                        marginBottom: 20,
                    }}
                >
                    Edit disabled
                </Checkbox>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    onValuesChange={onFormLayoutChange}
                    disabled={componentDisabled}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <img src={user.icon ? user.icon : pic1} alt="" className='profilePic' style={{ marginLeft: "30px" }} />

                    <Form.Item label="username">
                        <Input value={user.username} disabled={true} />
                    </Form.Item>
                    <Form.Item label="E-mail">
                        <Input value={user.email} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Weekly Points">
                        <Input value={user.points} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Highest Points">
                        <Input value={user.allTimePoint.highestPoints} disabled={true} />
                    </Form.Item>

                    <Form.Item label="Display Name">
                        <Input value={userInfo.displayname} onChange={handleEdit} />
                    </Form.Item>


                    {/* <Form.Item label="Liked Category">
                        <Select
                            mode="multiple"
                            defaultValue={userInfo.likedCategory}
                            options={categoryOptions}
                            allowClear
                            onChange={handleCategory}
                        >
                        </Select>
                    </Form.Item> */}


                    <Form.Item label="Liked Category">
                        <TreeSelect
                            showSearch
                            value={userInfo.likedCategory}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Please select"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={handleCategory}
                            treeData={treeData}
                        />
                    </Form.Item>



                    <Form.Item label="Upload" valuePropName="fileList">
                        <Upload
                            maxCount={1}
                            accept="image/png, image/jpeg"
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            onRemove={onRemove}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8, }}>
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={handleEditSubmit}>Update</Button>
                    </Form.Item>
                </Form>

            </div>


            <ChangPassword/>

        </div>
    )
}

export default UserProfile