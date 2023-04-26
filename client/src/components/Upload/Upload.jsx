import React, { useState } from 'react'

import { PlusOutlined } from '@ant-design/icons';
import {
    Upload,
    message,
} from 'antd';


const UploadPic = ({ userInfo, setUserinfo }) => {


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

    const onRemove = (info) => {
        setValidImg(false)
        setUserinfo(null)
    }


    const handleChange = (info) => {
        if (validImg && info.fileList.length > 0) {
            getBase64(info.file, (url) => {
                setUserinfo(url)
            })
        }
    }



    return (
        <div>

            <Upload
                maxCount={1}
                accept="image/png, image/jpeg"
                listType="picture-card"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onRemove={onRemove}
                defaultFileList={ userInfo ? [{
                    uid: '1',
                    name: '',
                    status: 'done',
                    url: userInfo,
                }] : null
                }
            // showUploadList={validImg}
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8, }}>
                        Upload
                    </div>
                </div>
            </Upload>

        </div>
    )
}

export default UploadPic