import {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import SubmitButton from '../components/submitbutton';
import Items from '../components/listItem';
import Filter from '../components/filter';
import ComfirmModal from '../components/comfirmModal';
import Notification from '../components/notification';
import styles from '../styles/modules/home.module.scss';
import Pagination from '../components/pagination';

export default function Home() {

    //Define Variable
    const [storedData, setStoredData] = useState([
        {
            "id" :1,
            "title": "İlk Kayıt",
            "url": "http://www.google.com",
            "vote": 0,
        }, {
            "id" :2,
            "title": "İkinci Kayıt",
            "url": "http://www.google.com",
            "vote": 0,
        }
    ]);
    const [showDeleteConfirm, setShowDeleteComfirm] = useState(false);
    const [deletedItemTitle, setDeletedItemTitle] = useState('');
    const [deletedItemIndex, setDeletedItemIndex] = useState();
    const [showNotification, setshowNotification] = useState(false);
    const [localStoreData, setLocalStoreData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5)

    //Up Vote Button
    const handleVoteUp = (id) => {
      const data = localStoreData;
      
      for(var i = 0; i < data.length; i++){
        if(data[i].id == id){
          data[i].vote += 1;
        }
      }
      
      updateStateData(data);
    }

    //Down Vote Button
    const handleVoteDown = (id) => {
      const data = localStoreData;


      for(var i = 0; i < data.length; i++){
        if(data[i].id == id){
          if(data[i].vote > 0){
            data[i].vote -= 1;
            updateStateData(data);
          }
        }
      }
        
    }

    //Update Data
    const updateStateData = (data) => {
      localStorage.setItem('data', JSON.stringify(data));
      setLocalStoreData(JSON.parse(localStorage.getItem("data")));
      sortingData(localStorage.getItem("orderType"))
    }

    //Click Hover Delete Button
    const handleDeleteItem = (id) => {
      const data = localStoreData;

      setShowDeleteComfirm(true);

      for(var i = 0; i < data.length; i++){
        if(data[i].id == id){
          setDeletedItemTitle(data[i].title);
          setDeletedItemIndex(data[i].id);   
        }
      }
    }

    //Delete Comfirm Modal Cancel Button
    const handleCloseModal = () => {
      setShowDeleteComfirm(false);
      setDeletedItemTitle('');
        setDeletedItemIndex('');
    }

    //Delete Comfirm Modal Ok Button
    const handleOkbuttonModal = () => {
      const data = localStoreData;

      for(var i = 0; i < data.length; i++){
        if(data[i].id == deletedItemIndex){
          data.splice(i, 1);
        }
      }
      
      
      updateStateData(data);

      setshowNotification(true);
      setShowDeleteComfirm(false);
      setTimeout(() => {
        setshowNotification(false);
        setDeletedItemTitle('');
        setDeletedItemIndex('');
      },1200);
    }

    //Sorting Data
    const sortingData = (filterType) => {
      let sortData = [...localStoreData];
      sortData.sort((a, b) => {
        if (a.vote < b.vote) {
          return -1;
        }
        if (a.vote > b.vote) {
          return 1;
        }
        return 0;
      });

      if (filterType == 'desc') {
        sortData = sortData.reverse();
      }
      setLocalStoreData(sortData);
      localStorage.setItem('data', JSON.stringify(sortData));
    }


    // Filter Change Handle
    const handleFilterChange = (e) => {
      localStorage.setItem('orderType', e.target.value);
      sortingData(e.target.value);
    }

    //Get LocalStorage Data
    useEffect(() => {

      let lsData = JSON.parse(localStorage.getItem("data"));
      if(!lsData){
        localStorage.setItem("data", JSON.stringify(storedData))
      }

      setLocalStoreData(JSON.parse(localStorage.getItem("data")));
      //localStorage.setItem('orderType',0);    
    },[]);


    //Define Pagination Variable
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData= localStoreData.slice(indexOfFirstData, indexOfLastData);
    const totalPagesNum = Math.ceil(localStoreData.length /dataPerPage);

    return (
        <Container>
            {
            showDeleteConfirm ? 
              <ComfirmModal 
                modalOkAction={() => handleOkbuttonModal}
                modalCloseClick={() => handleCloseModal} 
                title={deletedItemTitle.toUpperCase()}/> 
                : null
            }
            <Row>
                <Col md={{span: 6,offset: 3}}>
                  {
                    showNotification ? 
                    <Notification 
                    message={"deleted."}
                    title={deletedItemTitle.toUpperCase()}
                    /> : 
                    null
                  }
                    <SubmitButton/>
                    <div className={styles.links}>
                        <Filter filterChange={handleFilterChange} />
                        <ul className={styles.links__container}>
                           {
                          currentData.map((item,index) => ( <Items 
                                  key={index} 
                                  deleteItem={() => handleDeleteItem(item.id)}
                                  voteUpFunc={() => handleVoteUp(item.id)} 
                                  voteDownFunc={() => handleVoteDown(item.id)} 
                                  item={item}/>
                            ))
                          } 
                               
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
            <Col md={{span: 6,offset: 3}}>
              <Pagination 
                pages = {totalPagesNum} 
                setCurrentPage  = {setCurrentPage}
                currentData = {currentData} 
                sortedEmployees = {localStoreData}
                />
              </Col>
            </Row>
        </Container>
    )
}
