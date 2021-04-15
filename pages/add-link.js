import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/modules/addlink.module.scss'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import Notification from '../components/notification'



export default function AddLink() {

  //Define Variable
  const router = useRouter();
  const [showNotification, setshowNotification] = useState(false);
  const [allData, setAllData] = useState([]);
  const [newItem, setNewItem] = useState({
    title:'',
    url:'',
    vote:0
  })


  //Form Submit
  const handleSubmit  = () => {
    if(newItem.title != '' && newItem.url != ''){
      allData.unshift(newItem);
      localStorage.setItem('data',JSON.stringify(allData));
      setshowNotification(true);
      setTimeout(() => {
        setshowNotification(false);
        router.push('/');
      },1200);
    }
  }

  //Input Value Change Handle
  const handleInputChange = (e) => {
    setNewItem({
        ...newItem,
        [e.target.name]: e.target.value
    });
  }

  //Update State for Local Storage
  useEffect(() => {
    setAllData(JSON.parse(localStorage.getItem('data')));
  }, []);


  return (
        <Container>
          <Row className={styles.addnew}>
            <Col md={{span:6, offset:3}}>
            {
              showNotification ? 
              <Notification 
              message={"added."}
              title={newItem.title.toUpperCase()}
              /> : 
              null
            }
            <Link href="/" className={styles.showlist}>
              <div><span className="icon-arrow-left"></span>Return to list</div>
              </Link>
              <h1>Add New Link</h1>
                <div className="form-group">
                  <label>Link Name:</label>
                  <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  value={newItem.title} 
                  onChange={handleInputChange} 
                  required 
                  placeholder={"e.g Alphabet"} />
                </div>

                <div className="form-group">
                  <label>Link URL:</label>
                  <input 
                  type="text" 
                  name="url" 
                  className="form-control" 
                  value={newItem.link} 
                  onChange={handleInputChange} 
                  required 
                  placeholder={"e.g http://abc.xyx"} />
                </div>

                <div className="form-group text-right">
                  <button type="submit" onClick={handleSubmit} className="btn btn-success">ADD</button>
                </div>
            </Col>
          </Row>
        </Container>

 
  )
}
