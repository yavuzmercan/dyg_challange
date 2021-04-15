import styles from './index.module.scss'

export default function ComfirmModal(props) {
return (
    <div>
        <div className={styles.overlay}></div>
        <div className={styles.comfirm}>
        <div className={styles.comfirm__header}>Remove Link 
            <span onClick={props.modalCloseClick()} className={styles.comfirm__close}>
                <span className="icon-plus"></span>
            </span>
        </div>
        <div className={styles.comfirm__body}>
            <p>Do you want to remove:</p>
            <h2>{props.title}</h2>
        </div>
        <div className={styles.comfirm__footer}>
            <button onClick={props.modalOkAction()}>OK</button>
            <button onClick={props.modalCloseClick()}>CANCEL</button>
        </div>
    </div>
    </div>
    
  )
}