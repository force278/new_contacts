import ContactInfo from "./info/ContactInfo";
import ContactSearch from "./search/ContactSearch";
import ContactsList from "./list/ContactsList";
import ListItem from "./list/ListItem";
import styles from "./Contacts.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

/*
let groups = [
    {id:0, group: 'Нет группы'},
    {id:1, group: 'Семья'},
    {id:2, group: 'Друзья'},
    {id:3, group: 'Коллеги'}
]

let users = [
    {id: 1, avatar: null, name:'Силантий Васильев', number:79003347311, group:0},
    {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5YKUvHsuVXAHV_IA5k7DP7SCLTBcSKle9w&usqp=CAU', name:'Райан Гослинг', number:1637892648, group:1},
    {id: 3, avatar: 'https://images.thevoicemag.ru/upload/img_cache/746/746eea5c3d740003888233a64069e9cf_cropped_666x666.jpg', name:'Киану Ривз', number:1224892648, group:2},
    {id: 4, avatar: 'https://n1s2.hsmedia.ru/00/f3/6e/00f36ee1392b1ff831e35d6bad012db5/536x553_0xac120003_6748852251611132255.jpg', name:'Ана де Армас', number:79003347311, group:3},
    {id: 5, avatar: null, name:'Леонардо Ди Каприо', number:79003347311, group:1},
    {id: 6, avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Margulan_Seisembayev.jpg', name:'Маргулан Сейсембаев', number:79003347311, group:2},
    {id: 7, avatar: null, name:'Автосервис', number:79003347311, group:0},
    {id: 8, avatar: null, name:'HR ISERV', number:79003347311, group:0},
    {id: 9, avatar: null, name:'Теле2 Баланс', number:79003347311, group:0},
    {id: 10, avatar: null, name:'Турагенство🏝️', number:79003347311, group:0},
]
*/


let apiUrl = 'http://localhost:8000'

let groups = [] 



let users = []



function Contacts () {
    const [usersList, setUsersList] = useState(users)
    const [idState, setIdState] = useState(null)
    const [avatarState, setAvatarState] = useState('')
    const [nameState, setNameState] = useState('')
    const [numberState, setNumberState] = useState('')
    const [groupState, setGroupState] = useState(null)
    const [searchGroupState, setSearchGroupState] = useState(0)
    const [searchInputState, setSearchInputState] = useState('')
    const [activeItemState, setActiveItemState] = useState(null)
    const [groupListState, setGroupsList] = useState(groups)
    const [editGroupState, setEditGroupState] = useState(0)

    useEffect(()=>{
        axios.get(apiUrl + '/get_groups', {withCredentials: false})
        .then(response => {
            groups = response.data
            
            setGroupsList(groups)
        })
        axios.get(apiUrl + '/get_users', {withCredentials: false})
        .then(response => {
            users = response.data
            setUsersList(users) 
        })
    }, [])


    function changeUser(id) {
        console.log(users)
        for (let i = 0; i < users.length; i++){
            if(users[i].id === id) {
                setIdState(users[i].id)
                setAvatarState(users[i].avatar)
                setNameState(users[i].name)
                setNumberState(users[i].number)
                setGroupState(users[i].group)
                break
            }
        }
        
    }

    function changeAvatar(img) {
        if (idState){ // Если выбран какой либо пользователь
            for (let i = 0; i < users.length; i++){ // Ищем нужного пользователя
                if(users[i].id === idState) { // Если нашли
                    users[i].avatar = img
                    setAvatarState(img)                
                    break
                }
            }
        } else { // Если пользователь не выбран
            setAvatarState(img)
        }
        
    }

    function deleteAvatar() {
        if (idState){
            for (let i = 0; i < users.length; i++){
                if(users[i].id === idState) {
                    users[i].avatar = ''
                    setAvatarState('')                
                    break
                }
            }
        }
        else {
            setAvatarState('')
        }
        
    }
    
    function editUser() {  
        if (nameState !== '' && numberState !== '') {
            for (let i = 0; i < users.length; i++){
                if(users[i].id === idState) {
                    let List = [...users]
                    List[i].name = nameState
                    List[i].number = numberState
                    List[i].group = groupState
                    users = List
                    setSearchInputState('')
                    setSearchGroupState(0)
                    setUsersList(List)     
                    break
                }
            }
        }
        
    }

    function deleteUser() {
        if (idState){
            for (let i = 0; i < users.length; i++){
                if(users[i].id === idState) {
                    users.splice(i, 1)
                    let List = [...users]
                    setIdState(null)
                    setNameState('')
                    setAvatarState('')
                    setNumberState('')
                    setGroupState(0)
                    setActiveItemState(null)
                    setSearchInputState('')
                    setSearchGroupState(0)
                    setUsersList(List)                
                    break
                }
            }
        }
        
        

    }

    function addUser() {
        if (idState === null && nameState !== '' && numberState !== '') {
            axios.post(apiUrl+'/create_user', {avatar:avatarState, name:nameState, number:numberState, group:groupState})
            users.push({id:users[users.length-1].id+1, avatar:avatarState, name:nameState, number:numberState, group:groupState})
            let List = [...users]
            setSearchInputState('')
            setSearchGroupState(0)
            setUsersList(List)
        }
    }

    function search(name, group) {
        let List = []
        if (group == 0){
            for(let i=0; i < users.length; i++){
                if (users[i].name.toLowerCase().includes(name.toLowerCase())){
                    List.push(users[i])
                }
            }
        } else {
            for(let i= 0; i < users.length; i++){
                if (users[i].name.toLowerCase().includes(name.toLowerCase()) && group == users[i].group){
                    List.push(users[i])
                }
            }
        }
        setIdState(null)
        setAvatarState('')
        setNameState('')
        setNumberState('')
        setGroupState(0)
        setUsersList(List)

    }

    return (
        <div>
            <div className={styles.HeaderTextStyle}>Контакты</div>
            <div className={styles.BoxStyle}>
                <ContactSearch groups={groupListState} search={search} searchGroupState={searchGroupState} setSearchGroupState={setSearchGroupState} searchInputState={searchInputState} setSearchInputState={setSearchInputState}/>
                <div className={styles.ContactsBoxStyle}>
                    <ContactsList>
                    {
                        usersList.length !== 0 ? usersList.map((item, index)=>{
                            let focus = false
                            if (activeItemState === index){
                                focus = true 
                            }
                            return(
                                <ListItem key={index} id={item.id} index={index} focus={focus} changeUser={changeUser} avatar={item.avatar} name={item.name} setActiveItemState={setActiveItemState} />
                            )
                            
                        }) : <h4 className={styles.EmptyTextStyle}>Тут пока пусто🥺</h4>
                    }   
                    </ContactsList>
                    <ContactInfo idState={idState} changeAvatar={changeAvatar} deleteAvatar={deleteAvatar} editUser={editUser} groups={groups} avatarState={avatarState} setAvatarState={setAvatarState} nameState={nameState} setNameState={setNameState} numberState={numberState} setNumberState={setNumberState} groupState={groupState} setGroupState={setGroupState} deleteUser={deleteUser} addUser={addUser} editGroupState={editGroupState} setEditGroupState={setEditGroupState}/>
                </div>
            </div>
        </div>
    )

}

export default Contacts;