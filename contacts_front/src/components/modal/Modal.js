import { useRef } from 'react'
import styles from './Modal.module.css'
import axios from 'axios'

let apiUrl = 'http://localhost:8000'

function Modal({avatarState, changeAvatar, deleteAvatar, modalState, setModalState}) {
    const InputImg = useRef(null)

    return (
        <div className={modalState.active ? styles.ModalActiveStyle : styles.ModalInactiveStyle}>
            {modalState.active ?
                <div className={styles.FormStyle} >
                    <button className={styles.CloseBtnStyle} onClick={() => {setModalState({active:false, img:modalState.img})}}>X</button>
                    <input 
                    id='imageInput'
                    type='file'
                    accept='image/jpeg, image/png' ref={InputImg} className={styles.ImgInputStyle} onChange={(e) => { 
                        e.preventDefault();
                        let photo = document.querySelector('#imageInput');
                        let formData = new FormData();
                        console.log(photo.files[0])
                        formData.append('file', photo.files[0])
                        let response = null
                        axios.post(apiUrl+"/upload_avatar", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((resp)=> {
                            console.log(resp)
                            setModalState({active:false, img: resp.data.filename})
                            changeAvatar(resp.data.filename)
                        })
                        }}></input>
                    <label className={styles.EditBtnStyle} htmlFor='imageInput'>Изменить</label>
                    {avatarState ?
                        <label className={styles.DeleteBtnStyle} onClick={()=>{
                            setModalState({active:false, img:null})
                            deleteAvatar()}}>Удалить</label>
                        : null
                    }
                </div>
                : null
            }
        </div>
    )
}

export default Modal