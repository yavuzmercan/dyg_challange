import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function Filter(props) {

//Define Variable
const [orderType, setOrderType] = useState('');

//Get Order Type
useEffect(() => {
	setOrderType(localStorage.getItem('orderType'));
});

return (
    <select value={orderType}
	onChange={props.filterChange} 
	className={`form-control ${styles.links__filter}`}>
		<option value="0">Order by</option>
		<option value="asc">Less Voted (A &gt; Z)</option>
		<option value="desc">Most Voted (Z &gt; A)</option>
	</select>
  )
}