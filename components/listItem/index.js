import styles from './index.module.scss'

export default function Item(props) {
  return (
    <li className={styles.links__item}>
      <a 
      onClick={props.deleteItem}
      className={styles.links__remove}>
        <span className="icon-times-circle"></span>
      </a>
      <div className={styles.links__point}>
        <span>{props.item.vote}</span> POINTS 
      </div>
      <div className={styles.links__detail}>
        
        <h2>{props.item.title}</h2>
        
        <p>
          <a href={props.item.url} target="_blank">({props.item.url})</a>
        </p>
        
        <div className={styles.links__footer}>
          
          <button className={styles.btnvote} onClick={props.voteUpFunc}>
            <span className="icon-arrow-up"></span>
            Up Vote
          </button>
          
          <button className={styles.btnvote} onClick={props.voteDownFunc}>
            <span className="icon-arrow-down"></span>
            Down Vote
          </button>
        
        </div>
      </div>
    </li>
  )
}