import { useEffect } from 'react'
import styles from './index.module.scss'

export default function Filter(props) {

//Define Variable
let orderType = '';

//Get Order Type
useEffect(() => {
	orderType = localStorage.getItem('orderType');
}, []);

return (
    <select 
	defaultValue={orderType}
	onChange={props.filterChange} 
	className={`form-control ${styles.links__filter}`}>
		<option value="0">Order by</option>
		<option value="asc">Less Voted (A &gt; Z)</option>
		<option value="desc">Most Voted (Z &gt; A)</option>
	</select>
  )
}