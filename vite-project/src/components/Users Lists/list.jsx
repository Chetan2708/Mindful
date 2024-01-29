import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive';
import ListView from './List View/ListView'
import CardView from './Card View/CardView'
import { setVal } from '../../features/inputSlice';

const List = ({ handleEdit, handleDelete, handleView }) => {
  const allData = useSelector((state) => state.allUsers)
  const search = useSelector((state) => state.searchResult)
  const temp = useSelector((state) => state.temp)
  const dispatch = useDispatch()
  const [option, setOption] = useState(localStorage.getItem('filters') || 'A-Z');

  useEffect(()=>{
    setOption(localStorage.getItem('filters') || 'A-Z');
    dispatch(setVal(localStorage.getItem('filters') || 'A-Z'))
  },[temp])

  const sortedData = allData
    .filter(
      (item) =>
        search.toLowerCase() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (option === 'A-Z' || option === 'Z-A') {
        return option === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (option === 'lastModified') {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateB - dateA;
      } else if (option === 'lastInserted') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }
  
      return 0;

    });
      {console.log(sortedData)}
      const isDesktop = useMediaQuery({ minWidth: 768 });
    
      return isDesktop ? (
        <ListView handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} data={sortedData} />
      ) : (
        <CardView handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} data={sortedData} />
      );
}

export default List