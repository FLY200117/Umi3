import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IEditorConfig } from '@wangeditor/editor'
import Cloud from 'leancloud-storage';

// 将本地资源对象转换成为base64编码
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

function MyEditor(props) {
    // console.log('富文本',props)
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello&nbsp;<strong>world</strong>.</p>\n<p><br></p>')
    //     }, 1500)
    // }, [])

    const toolbarConfig = { }
    const editorConfig = {
      MENU_CONF: {},
      placeholder: '请输入内容...'
    }

    editorConfig.onBlur = (editor) => {
      const newHTML = editor.getHtml()
      props.onChange(newHTML)
    }

    editorConfig.MENU_CONF['uploadImage'] = {
      async customUpload(file,insertFn) {
        // console.log(file)
        getBase64(file,(base64) => {
          const file = new Cloud.File('cakeImg',{base64})
          file.save().then(res => {
            let {url} = res.attributes
            insertFn(url)
          })
        })
      }
    }



    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </>
    )
}

export default MyEditor
