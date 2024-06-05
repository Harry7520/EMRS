import { CButton, CCol, CInput, CLabel, CRow, CSelect, CImg } from '@coreui/react'
import React from 'react';
import NPagination from '../../common/pagination/NPagination';

function EmployeeListForm(props) {
  let { userName, userNameChange, email, emailChange, genderData, selectGender, selectGenderChange, japanData, selectJapan, selectJapanChange, engData, selectEng, selectEngChange,
    searchClick, resetClick, employeeList, total,
    currentPage, lastPage, pagination,
    editClick, delClick } = props;
  return (
    <div className='mt-4'>
      <CRow alignHorizontal='center' className="mb-3">
        <CCol lg="2">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CInput type="text" value={userName} onChange={userNameChange} placeholder="search name" />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
        <CCol lg="2">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CInput type="email" value={email} onChange={emailChange} placeholder="search email" />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
        <CCol lg="2">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                value={selectGender}
                onChange={selectGenderChange}
              >
                <option value="">All</option>
                {genderData.map((data, index) => {
                  return (
                    <option
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  )
                }
                )}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg="2">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                value={selectEng}
                onChange={selectEngChange}
              >
                <option value="">All</option>
                {engData.map((data, index) => {
                  return (
                    <option
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  )
                }
                )}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg="2">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                value={selectJapan}
                onChange={selectJapanChange}
              >
                <option value="">All</option>
                {japanData.map((data, index) => {
                  return (
                    <option
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  )
                }
                )}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg="2">
          <CButton className="form-btn" style={{ color: "black",fontWeight:"bold", background:"linear-gradient(135deg, #e0e045, #69d456)", }} onClick={searchClick}>
            Search
          </CButton>
        </CCol>
      </CRow>
      <CRow alignHorizontal="center" className="mt-5">
        <CButton className="form-btn" style={{ color: "white", background:"linear-gradient(120deg,#2980b9,#8e44ad)", }} onClick={resetClick}>
          Reset
        </CButton>
      </CRow>
      <CRow className='mt-5'>
        <CCol>
          {employeeList.length > 0 && (
            <>
              <div className='overflow'>
                <table className='emp-list-table table-striped'>
                  <thead style={{ background: "linear-gradient(to bottom, #18212a, #495563)" }}>
                    <tr>
                      <th className="text-center pt-4" width={50} >No</th>
                      <th className='text-center pt-4' width={180}>UserName</th>
                      <th className='text-center pt-4' width={250}>Email</th>
                      <th className='text-center pt-4' width={200}>Date Of Birth</th>
                      <th className='text-center pt-4' width={150}>Gender</th>
                      <th className='text-center pt-4' width={230}>English Skill</th>
                      <th className='text-center pt-4' width={150}>Japanese Skill</th>
                      <th className='text-center pt-4' width={80} colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((data, index) => {
                      const countIndex = (currentPage - 1) * 10 + index + 1;
                      return (
                        <tr key={index}>
                          <td width={50} className="text-center">{countIndex}</td>
                          <td className="text-center">{data.name}</td>
                          <td className="text-center"> {data.email}</td>
                          <td className='text-center' >{data.date_of_birth}</td>
                          <td className='text-center'>{data.gender}</td>
                          <td className="text-center">{data.english_skill}</td>
                          <td className="text-center">{data.japanese_skill}</td>
                          <td style={{ border: "1px solid", textAlign: "center" }}>
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
                                onClick={() => { editClick(data.id); }}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  cursor: "pointer",
                                }}
                              ></CImg>
                            </div>
                          </td>

                          <td style={{ border: "1px solid", textAlign: "center" }}>
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
      <br></br>
      {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
    </div>
  )
}

export default EmployeeListForm
