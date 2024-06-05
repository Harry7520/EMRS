import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
 import {ApiRequest} from '../../common/ApiRequest';
import EmployeeListForm from './EmployeeListForm';
import { useHistory } from 'react-router-dom';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { emailChk,nullChk } from '../../common/CommonValidation';

const EmployeeListIndex = () => {
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // for loading condition
  const [employeeList, setEmployeeList] = useState([]); // for user list table data
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [genderData, setGenderData] = useState([
    { id: "0", name: "Male" },
    { id: "1", name: "Female" },
    { id: "2", name: "Other" },
  ]);
  const [japanData, setJapanData] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ])
  const [engData, setEngData] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },
  ])
  const [selectEng, setSelectEng] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail]= useState("");
  const [total, setTotal] = useState(""); // total rows
 let history =useHistory();
 
  
  useEffect(() => {

    let flag = localStorage.getItem(`LoginProcess`)
    if (flag == "true") {
      console.log("Login process success")
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
        await search();
      setLoading(false);
    })();

  }, []);

  const search = async (page = 1)=> {
    let err = [];
    if (nullChk(email)){
    if (!emailChk(email)) {
      err.push("Please fill email format");
    }
  }
    if (err.length > 0) {
      setSuccess([]);
      setError(err);
      setLoading(false);
    } else {
      setError([])
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        email: email,
        gender: selectGender,
        japanese_skill: selectJapan,
        english_skill: selectEng,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
          setEmployeeList(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotal(response.data.data.total);
          setError([]);
        
      } else {
        setError([response.data.message]);
        setEmployeeList([]);
      }
    }
  }

  }


  const tempSearch = async (page = 1)=> {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: "",
        email: "",
        gender: "",
        japanese_skill: "",
        english_skill: "",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
    } else {
      if (response.data.status === "OK") {
          setEmployeeList(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotal(response.data.data.total);
        
      } else {
        setEmployeeList([]);
      }
    }

  }

  const searchClick = () => {
     search();
  }

  const resetClick = () => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setSelectGender("");
    tempSearch();
    setError([]);
  }

  // pagination function
  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  }
                   //7
  const editClick = (id) => {
    const confirmed = window.confirm("Are you sure?Want to edit!");
    if (confirmed) {
      history.push('/employee-management/employee-register');
      localStorage.setItem("Update",id);
    }
  }

  const delClick = async(deleteId) => {
    const confirmed = window.confirm("Are you sure?Want to delete!");
    if (confirmed) {
    setLoading(true);
    let obj = {
      method: "delete",
      url: `employee/delete/${deleteId}` ,
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        let page = currentPage;
        setSuccess([response.data.message]);
        if (employeeList.length - 1 == 0) {
          page = currentPage - 1;
        }
        search(page);
        setError([]);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setError([response.data.message]);
        setSuccess([]);
      }
    }
  }
  }

  const userNameChange = (e) => {
    setUserName(e.target.value);
  }
  const emailChange = (e) =>{
    setEmail(e.target.value);
  }
  const selectGenderChange = (e) => {
    setSelectGender(e.target.value);
  }
  const selectEngChange = (e) => {
    setSelectEng(e.target.value);
  }
  const selectJapanChange = (e) => {
    setSelectJapan(e.target.value);
  }

  return (
    <>
    <CRow>
      <CCol xs="12">
        <CCard>
        <CCardHeader style={{background:"linear-gradient(120deg,#2980b9,#8e44ad)",color:"white",display:"flex",justifyContent:"space-between"}}>
              <h3 className='m-0' >Employee List</h3>
              <h5 className='mt-2 font-weight-bold'>Total : {total} row(s)</h5>
            </CCardHeader>
          <CCardBody>
          <SuccessError success={success} error={error} />
            <EmployeeListForm
            employeeList = {employeeList}
            total = {total}
            currentPage = {currentPage}
            lastPage = {lastPage}
              userName = {userName}
              userNameChange={userNameChange}
              email = {email}
              emailChange = {emailChange}
              genderData={genderData}
              selectGenderChange={selectGenderChange}
              selectGender={selectGender}
              engData = {engData}
              selectEngChange = {selectEngChange}
              selectEng = {selectEng}
              japanData = {japanData}
              selectJapanChange = {selectJapanChange}
              selectJapan = {selectJapan}
            pagination ={pagination}
            searchClick ={searchClick}
            resetClick = {resetClick}
            editClick = {editClick}
            delClick = {delClick}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <Loading start={loading} />
    </>
  )
}

export default EmployeeListIndex
