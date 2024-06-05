import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React from 'react'
import SuccessError from '../common/SuccessError';

const LoginForm = (props) => {
  let { loginClick, passwordChange, password, userCodeChange, userCode, success, error, enter, zoomSize } = props;
  return (
    <>
    {zoomSize < 150 &&(
    <div
      className="min-vh-100  flex-row align-items-center login-bg"
    >
      <CRow>
        <CCol lg="4"></CCol>
        <CCol lg="4">
          <div class="harry-box" style={{ marginTop: "200px" }}>
            <CCard className="login"
            >
              <CCardBody>

                <CRow alignHorizontal='center'>
                  <CImg src='./image/emrs-logo.png' width={100} height={100}></CImg>
                  <h3 className='login-title'>Registration System</h3>
                </CRow>
                <CRow alignHorizontal='center' className="mb-3">
                  <h3 className='login-title1'>Login</h3>
                </CRow>
                <SuccessError success={success} error={error} />
                <CRow className="mt-4 align-items-center">
                  <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                  <CCol lg="8">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CImg src='./image/user.png' width={20} height={20}></CImg>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput className="login-input" placeholder='Enter User Code' type='text'
                        autoFocus value={userCode} onChange={userCodeChange} onKeyDown={enter}
                      ></CInput>
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow className="align-items-center mt-4">
                  <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                  <CCol lg="8">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CImg src='./image/password.png' width={20} height={20}></CImg>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput className="login-input" placeholder='Enter Password' type='password'
                        value={password} onChange={passwordChange} onKeyDown={enter}
                      ></CInput>
                    </CInputGroup>
                  </CCol>
                </CRow>
                <br></br>
                <br></br>
                <CRow alignHorizontal='center' className="mb-4">
                  <CButton id="login" className='form-btn login-btn'
                    onClick={loginClick}
                  >Login</CButton>
                </CRow>


              </CCardBody>
            </CCard>
          </div>

        </CCol>

        <CCol lg="4"></CCol>
      </CRow>
    </div>
    )}

    {zoomSize > 140 &&(
      <div
      className="min-vh-100  flex-row align-items-center login-bg1"
    >
      <CRow>
        <CCol lg="4"></CCol>
        <CCol lg="4">
            <CCard className="login1" style={{ marginTop: "200px" }}
            >
              <CCardBody>

                <CRow alignHorizontal='center'>
                  <CImg src='./image/emrs-logo.png' width={100} height={100}></CImg>
                  <h3 className='login-title'>Registration System</h3>
                </CRow>
                <CRow alignHorizontal='center' className="mb-3">
                  <h3 className='login-title1'>Login</h3>
                </CRow>
                <SuccessError success={success} error={error} />
                <CRow className="mt-4 align-items-center">
                  <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                  <CCol lg="8">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CImg src='./image/user.png' width={20} height={20}></CImg>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput className="login-input" placeholder='Enter User Code' type='text'
                        autoFocus value={userCode} onChange={userCodeChange} onKeyDown={enter}
                      ></CInput>
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow className="align-items-center mt-4">
                  <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                  <CCol lg="8">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CImg src='./image/password.png' width={20} height={20}></CImg>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput className="login-input" placeholder='Enter Password' type='password'
                        value={password} onChange={passwordChange} onKeyDown={enter}
                      ></CInput>
                    </CInputGroup>
                  </CCol>
                </CRow>
                <br></br>
                <br></br>
                <CRow alignHorizontal='center' className="mb-4">
                  <CButton id="login" className='form-btn login-btn'
                    onClick={loginClick}
                  >Login</CButton>
                </CRow>


              </CCardBody>
            </CCard>

        </CCol>

        <CCol lg="4"></CCol>
      </CRow>
    </div>
    )}
    </>
  )
}

export default LoginForm
