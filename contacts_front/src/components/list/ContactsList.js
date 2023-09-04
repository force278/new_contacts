import styles  from './ContactsList.module.css'

function ContactsList ({children}) {
    

    return (
        <div className={styles.BoxStyle}>
            {children}
        </div>
    )

}

export default ContactsList;