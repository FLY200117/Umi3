import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import Cloud from 'leancloud-storage';

// 将本地资源对象转换成为base64编码
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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

  return isJpgOrPng && isLt2M;
};

const ImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if(props.value){
      setImageUrl(props.value)
    }
  },[])

  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }

  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // 图片自定义上传函数
  const customUpload = (info) => {
    console.log(info)
    setLoading(true);
    getBase64(info.file,(base64) => {
      console.log(base64)

      const file = new Cloud.File('cakeImg',{base64})
      file.save().then(res => {
        let {url} = res.attributes
        console.log(res)
        props.onChange(url)
        setLoading(false)
        setImageUrl(url)
      })

    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={customUpload}
      beforeUpload={beforeUpload}
      // onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
