import styles from './ContactSearch.module.css';


function ContactSearch ({groups, search, searchGroupState, setSearchGroupState, searchInputState, setSearchInputState}) {
    

    return (
        <div className={styles.BoxStyle}>
            <input className={styles.InputStyle} maxLength={20} placeholder='🔎Поиск' onChange={(e)=>{
                setSearchInputState(e.target.value)
                search(e.target.value, searchGroupState)
                }}/>
            <div className={styles.GroupBoxStyle}>
                <select className={styles.SelectStyle} value={searchGroupState} onChange={(e)=>{
                    let group = e.target.value
                    for (let i = 0; i < groups.length; i++){      
                        if (groups[i].group === group)
                            group = groups[i].id
                    }
                    setSearchGroupState(group)
                    search(searchInputState, group)
                }}>
                    {
                        
                        groups.length !== 0 ? groups.map((item, index)=>{
                        return (
                            <option key={index} value={index}>{item.group}</option>
                        )
                        }) 
                        : null
                    }
                </select>
            </div>
        </div>
    )

}

export default ContactSearch;