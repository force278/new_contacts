import { useState } from 'react';
import Modal from '../modal/Modal';
import styles from './ContactInfo.module.css'


function ContactInfo ({idState, changeAvatar, deleteAvatar, editUser, groups, avatarState, setAvatarState={setAvatarState}, nameState, setNameState, numberState, setNumberState, groupState, setGroupState, deleteUser, addUser, editGroupState, setEditGroupState, addGroup, deleteGroup}) {
    const [modalState, setModalState] = useState({active:false, img:null})
    

    return (
        
            <div className={styles.BoxStyle}>
                <div className={styles.AvatarAndInfoBoxStyle}>
                    <div className={styles.PhotoBoxStyle}>
                        <h3>Фото профиля</h3>
                        <div className={styles.AvatarStyle}>
                            {avatarState ? 
                                <img className={styles.ImgStyle} src={avatarState} alt='a'></img>
                            :
                                <img className={styles.ImgStyle} src='https://oir.mobi/uploads/posts/2022-08/1661338484_7-oir-mobi-p-pustoi-fon-vkontakte-9.png' alt='a'></img>
                            }
                            {idState ? 
                                <div className={styles.AvatarEditButtonStyle} onClick={()=> {setModalState({active:!modalState.active, img:modalState.img})}}>✎</div>
                            :
                                <div className={styles.AvatarEditButtonStyle} onClick={()=> {setModalState({active:!modalState.active, img:modalState.img})}}>✎</div>
                            }
                        </div>
                    </div>
                    <div className={styles.InfoBoxStyle}>
                        <h3>Имя</h3>
                        <input className={styles.InputNameStyle} maxLength={20} onChange={(e) => {setNameState(e.target.value)}} value={nameState}></input>
                        <h3>Номер</h3>
                        <input className={styles.InputNumberStyle} maxLength={11} onChange={(e) => {setNumberState(e.target.value)}} value={numberState}></input>
                    </div>
                </div>
                <div className={styles.GroupBoxStyle}>
                    <h3>Группа</h3>
                    <div>
                        <select value={groupState ? groups[groupState].group : 'Нет группы'} className={styles.SelectStyle} onChange={(e) => {  
                            let group = e.target.value
                            for (let i = 0; i < groups.length; i++){      
                                if (groups[i].group === group)
                                    group = groups[i].id
                            }
                            setGroupState(group)}}>
                            { groups.length !== 0 ? groups.map((item, index)=>{
                                return (
                                    <option key={index}>{item.group}</option>
                                )
                                }) 
                                : null

                            }
                        </select>
                    </div>
                </div>
                {idState ? 
                    <div>
                        <button className={styles.SaveEditButtonStyle} onClick={()=>{editUser()}}>Сохранить изменения</button>
                        <button className={styles.DeleteButtonStyle} onClick={deleteUser}>Удалить контакт</button>
                    </div>
                :
                    <div>
                        <button className={styles.SaveEditButtonStyle} onClick={addUser} >Добавить контакт</button>
                    </div>
                }
                
                <Modal avatarState={avatarState} changeAvatar={changeAvatar} deleteAvatar={deleteAvatar} modalState={modalState} setModalState={setModalState} onClick={()=> {setModalState({active:false, img:modalState.img})}} />
            </div>
            
    )

}

export default ContactInfo;