import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import { checkPassword, checkNullOrBlank, validateName } from '../../common/CommonValidation';
import NPagination from '../../common/pagination/NPagination';

const AdminRegAndListIndex = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([])
  const [totalRow, setTotalRow] = useState(""); // for user list table rows
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [updateID, setUpdateID] = useState("");
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [total, setTotal] = useState(""); // total rows
  const [generatedPassword, setGeneratedPassword] = useState('');//generate password


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

  }, [])


  const search = async (page = 1) => {

    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);//no data output
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setAdmin(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }

  }

  const tempSearch = async (page = 1)=> {
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);//no data output
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setAdmin(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }

  }

  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const reset = () => {
    setUserName("");
    setPassword("");
    setGeneratedPassword("");
  }

  const saveClick = async () => {
    setLoading(true);
    setUpdateStatus(false);
    let err = [];

    if (!checkNullOrBlank(userName)) {
      err.push("Please fill username")
    }
    else if (!validateName(userName)) {
      err.push("Please change name")
    }

    if (!checkNullOrBlank(password)) {
      err.push("Please fill Password")
    }
    else if (!checkPassword(password)) {
      err.push("Please fill strong password");
    }

    if (err.length > 0) {
      setSuccess([]);
      setError(err);
      setLoading(false);
    } else {
      const confirmed = window.confirm("Are you sure?Want to save!");
      if (confirmed) {
        setError([]);

        let saveData = {

          method: "post",
          url: `admin/save`,
          params: {
            name: userName,
            password: password,
          },
        };
        let response = await ApiRequest(saveData);
        console.log(response.flag);
        if (response.flag === false) {
          setError(["Please fill valid username & password"]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          if (response.data.status == "OK") {

            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setSuccess([response.data.message]);
            reset();
            search();
            setError([]);

          } else {
            setError([response.data.message]);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }
        setLoading(false);
      }else{
        reset();
        setError([]);
      }
    }
  }

  const editClick = async (id) => {
    const confirmed = window.confirm("Are you sure?Want to edit!");
    if (confirmed) {
      setLoading(true);
      setUpdateStatus(true);
      setUpdateID(id);
      let saveData = {
        method: "get",
        url: `admin/edit/${id}`,
      };
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setUserName(response.data.data.name);
          setPassword(response.data.data.password);
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
      setLoading(false);
    }
  }

  const delClick = async (deleteId) => {
    const confirmed = window.confirm("Are you sure?Want to delete!");
    if (confirmed) {
      setLoading(true);
      let obj = {
        method: "delete",
        url: `admin/delete/${deleteId}` ,
      };
      let response = await ApiRequest(obj)
      setLoading(false);
      if (response.flag === false) {
        setSuccess([]);
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status === "OK") {
          let page = currentPage;
          setSuccess([response.data.message]);
          if (admin.length - 1 == 0) {
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


  const updateClick = async () => {
    setLoading(true);
    let err = [];

    if (!checkNullOrBlank(userName)) {
      err.push("Please fill username")
    }
    else if (!validateName(userName)) {
      err.push("Please change name")
    }

    if (!checkNullOrBlank(password)) {
      err.push("Please fill Password")
    }
    else if (!checkPassword(password)) {
      err.push("Please fill strong password");
    }

    if (err.length > 0) {
      setSuccess([]);
      setError(err);
      setLoading(false);
    } else {
      const confirmed = window.confirm("Are you sure?Want to update!");
      if (confirmed) {
        setUpdateStatus(false);
        setError([]);

        let saveData = {
          method: "post",
          url: `admin/update/${updateID}`,
          params: {
            name: userName,
            password: password,
          },
        };
        let response = await ApiRequest(saveData);
        if (response.flag === false) {
          setError(response.message);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          if (response.data.status == "OK") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setSuccess([response.data.message]);
            reset();
            search();
            setError([]);
          } else {
            setError([response.data.message]);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }
        setLoading(false);
      }else{
        reset();
        setError([]);
        setUpdateStatus(false);
      }
    }
  }
  //password generater

  const generatePassword = () => {
    const length = 30; // You can adjust the length of the generated password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const saveOnKeyDown=(e)=>{
    if (e.key==='Enter'){
      saveClick();
      e.preventDefault();
    }
  }

  const updateOnKeyDown=(e)=>{
    if (e.key==='Enter'){
      updateClick();
      e.preventDefault();
    }
  }

  // pagination function
  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  }
  
  

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          {updateStatus == false && (
            <CCard style={{ borderRadius: "1rem", backgroundColor: "skyblue", }}>
              <CCardHeader style={{ backgroundColor: "darkslateblue" }}>
                <h4 style={{ color: "white", }} className='m-0'>Admin Registeration</h4>
              </CCardHeader>
              <CCardBody>

                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p className='mt-2'>UserName</p>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="text" value={userName} onChange={userNameChange} onKeyDown={saveOnKeyDown}/>
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>


                  </CCol>


                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p className='mt-2'>Password</p>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="password" value={password} onChange={passwordChange} onKeyDown={saveOnKeyDown}/>
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>

                  </CCol>

                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p>Generate Password</p>
                      </CCol>
                      <CCol lg="7"></CCol>
                      <CCol lg="1"></CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="6"></CCol>
                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <CButton className="form-btn" style={{ backgroundColor: "#A8BEEF", color: "black", }} onClick={generatePassword}>Generate</CButton>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="text" value={generatedPassword} readOnly />
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="6"></CCol>
                </CRow>

                <CRow style={{ justifyContent: "center" }} className="mt-4">
                    <CButton className="form-btn" style={{ backgroundColor: "#3DD07D", color: "black", }} onClick={saveClick}>
                      Save
                    </CButton>
                </CRow>
              </CCardBody>
            </CCard>
          )}
          {updateStatus == true && (
            <CCard style={{ borderRadius: "1rem", backgroundColor: "#B9C7E4", }}>
              <CCardHeader style={{ backgroundColor: "green" }}>
                <h4 style={{ color: "white", }} className='m-0'>Edit Your Admin's Datas</h4>
              </CCardHeader>
              <CCardBody>

                <CRow style={{ marginTop: "10px" }}>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p className='mt-2'>UserName</p>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="text" value={userName} onChange={userNameChange} onKeyDown={updateOnKeyDown}/>
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>


                  </CCol>


                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p className='mt-2'>Password</p>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="password" value={password} onChange={passwordChange} onKeyDown={updateOnKeyDown} />
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>

                  </CCol>

                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <p>Generate Password</p>
                      </CCol>
                      <CCol lg="7"></CCol>
                      <CCol lg="1"></CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="6"></CCol>
                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="1"></CCol>
                      <CCol lg="3">
                        <CButton className="form-btn" style={{ backgroundColor: "#A8BEEF", color: "black", }} onClick={generatePassword}>Generate</CButton>
                      </CCol>
                      <CCol lg="7">
                        <CInput type="text" value={generatedPassword} readOnly />
                      </CCol>
                      <CCol lg="1"></CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="6"></CCol>
                </CRow>

                <CRow style={{ justifyContent: "center" }} className="mt-4">
                  <CButton className="form-btn" style={{ backgroundColor: "#1597CE", color: "black", }} onClick={updateClick}>
                    Update
                  </CButton>
                </CRow>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>


      <CRow className="mt-3">
        <CCol xs="12">
          <CCard >
            <CCardHeader style={{background:"linear-gradient(120deg,#2980b9,#8e44ad)",color:"white",display:"flex",justifyContent:"space-between"}}>
              <h3 className='m-0' >Admin List</h3>
              <h5 className='mt-2 font-weight-bold'>Total : {total} row(s)</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  {admin.length > 0 && (
                    <>
                      <div className='overflow'>
                        <table className='emp-list-table table-striped'>
                          <thead style={{background:"linear-gradient(to bottom, #18212a, #495563)"}}>
                            <tr>
                              <th className="text-center pt-4" width={50} >No</th>
                              <th className='text-center pt-4' width={400}>Name</th>
                              <th className='text-center pt-4' width={400}>UserCode</th>
                              <th className='text-center pt-4' width={80} colSpan={2}>Action</th>

                            </tr>
                          </thead>
                          <tbody>
                            {admin.map((data, index) => {
                              const countIndex = (currentPage - 1) * 10 + index + 1;
                              return (
                                <tr key={index}>
                                  <td width={50} className="text-center">{countIndex}</td>
                                  <td width={50} className="text-center">{data.name}</td>
                                  <td width={50} className="text-center">{data.user_code}</td>
                                  <td width={200} className='text-center'>
                                  <div className="user-before">
                                <CImg
                                  src="/image/Edit-Component-inactive.svg"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                                <CImg
                                  className="user-after"
                                  src="/image/Edit-Component-active.svg"
                                  onClick={() => { editClick(data.id);}}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                                  </td>
                                  <td width={200} className='text-center'>
                                  <div className="user-before">
                                <CImg
                                  src="/image/Delete-Component-inactive.svg"
                                  onClick={() => delClick(data.id)}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                                <CImg
                                  className="user-after"
                                  src="/image/Delete-Component-active.svg"
                                  onClick={() => delClick(data.id)}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default AdminRegAndListIndex