import styles from './index.module.scss'
import Link from 'next/link'

export default function SubmitButton(props) {
  return (
    <Link href="/add-link">
      <a className={styles.addlink}>
        <span className="icon-plus"></span>
        SUBMIT A LINK</a>
    </Link>
  )
}