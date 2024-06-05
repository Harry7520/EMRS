import React, { lazy, useEffect, useState, PureComponent } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, PieChart, Pie, Sector, Cell,

} from 'recharts';
import {ApiRequest} from '../common/ApiRequest';
import Loading from "../common/Loading";


const Dashboard = () => {

  const history = useHistory();
  const [error, setError] = useState([]);
  const [employeeTotal, setEmployeeTotal] = useState("");
  const [adminTotal, setAdminTotal] = useState(""); 
  const [maleTotal, setMaleTotal] = useState(""); 
  const [femaleTotal, setFemaleTotal] = useState(""); 
  const [otherTotal, setOtherTotal] = useState(""); 
  const [elementaryTotal, setElementaryTotal] = useState(""); 
  const [intermediateTotal, setIntermediateTotal] = useState(""); 
  const [advancedTotal, setAdvancedTotal] = useState(""); 
  const [proficientTotal, setProficientTotal] = useState(""); 
  const [nOneTotal, setNOneTotal] = useState(""); 
  const [nTwoTotal, setNTwoTotal] = useState(""); 
  const [nThreeTotal, setNThreeTotal] = useState(""); 
  const [nFourTotal, setNFourTotal] = useState(""); 
  const [nFiveTotal, setNFiveTotal] = useState(""); 
  const [loading, setLoading] = useState(false);

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
        await search1();
        await search2();
        await search3();
        await search4();
        await search5();
        await search6();
        await search7();
        await search8();
        await search9();
        await search10();
        await search11();
        await search12();
        await search13();
        setLoading(false);
    })();

  }, []);

  const data = [
    {
      name: 'Elementary',
      count: elementaryTotal<1? 0:elementaryTotal,
    },
    {
      name: 'Intermediate',
      count: intermediateTotal<1? 0:intermediateTotal,
    },
    {
      name: 'Advanced',
      count: advancedTotal<1? 0:advancedTotal,
    },
    {
      name: 'Proficient',
      count: proficientTotal<1? 0:proficientTotal,
    },
  ];

  const data1 = [
    {
      name: 'N1',
      count: nOneTotal<1? 0:nOneTotal,
    },
    {
      name: 'N2',
      count: nTwoTotal<1? 0:nTwoTotal,
    },
    {
      name: 'N3',
      count: nThreeTotal<1? 0:nThreeTotal,
    },
    {
      name: 'N4',
      count: nFourTotal<1? 0:nFourTotal,
    },
    {
      name: 'N5',
      count: nFiveTotal<1? 0:nFiveTotal,
    },
  ];

  const data2 = [
    { name: 'Male', value: maleTotal },
    { name: 'Female', value: femaleTotal },
    { name: 'Other', value: otherTotal },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const search = async () => {

    let search = {
      method: "get",
      url: `admin/get`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setAdminTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search1 = async () => {

    let search = {
      method: "get",
      url: `employee/get`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setEmployeeTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search2 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        gender: "Male",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setMaleTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search3 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        gender: "Female",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setFemaleTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search4 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        gender: "Other",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setOtherTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search5 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        japanese_skill: "N1",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setNOneTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search6 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        japanese_skill: "N2",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setNTwoTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search7 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        japanese_skill: "N3",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setNThreeTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search8 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        japanese_skill: "N4",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setNFourTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search9 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        japanese_skill: "N5",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setNFiveTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search10 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        english_skill: "Elementary",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setElementaryTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search11 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        english_skill: "Intermediate",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setIntermediateTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search12 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        english_skill: "Advanced",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setAdvancedTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }

  const search13 = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        english_skill: "Proficient",
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setError(response.message);//error
    } else {
      //data output
      if (response.data.status === "OK") {
        setProficientTotal(response.data.data.total);
        //
      } else {
        setError([response.data.message]);
      }
    }

  }


  return (
    <>
      <CRow>
        <CCol xs="12">
          <CRow>
            <CCol lg="6">
              <CRow>
                <CCol>
                <CCard style={{ borderRadius: "0.5rem",background:"linear-gradient(120deg,#2980b9,#8e44ad)",color:"white" }}>
                <CCardHeader style={{ borderTopRadius: "0.5rem", textAlign: "center",backgroundColor:"#2962ff",color:"white",}}>
                  <h2>Admin</h2>
                </CCardHeader>
                <CCardBody style={{ display: "flex", justifyContent: "space-between", paddingLeft: "5rem", paddingRight: "5rem", }}>
                  <h3>Total</h3>
                  <h3>{adminTotal<1? 0:adminTotal}</h3>
                </CCardBody>
              </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                <CCard style={{ borderRadius: "0.5rem",background:"linear-gradient(120deg,#2980b9,#8e44ad)",color:"white" }}>
                <CCardHeader style={{ borderTopRadius: "0.5rem", textAlign: "center",backgroundColor: "darkslateblue",color:"white",}}>
                  <h2>Employee</h2>
                </CCardHeader>
                <CCardBody style={{ display: "flex", justifyContent: "space-between", paddingLeft: "5rem", paddingRight: "5rem", }}>
                  <h3>Total</h3>
                  <h3>{employeeTotal<1? 0:employeeTotal}</h3>
                </CCardBody>
              </CCard>
                </CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CCard style={{ borderRadius: "0.5rem" }}>
                <CCardHeader style={{ borderTopRadius: "0.5rem", textAlign: "center", backgroundColor:"#2e7d32",color:"white"}}>
                  <h2>Gender Chart</h2>
                </CCardHeader>
                <CCardBody>
                  <ResponsiveContainer width="100%" height={210}>
                    <PieChart>
                    <Tooltip />
                      <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="6">
              <CCard style={{ borderRadius: "0.5rem" }}>
                <CCardHeader style={{ borderTopRadius: "0.5rem", textAlign: "center", backgroundColor:"#d50000",color:"white",}}>
                  <h2>Japanese Skill Chart</h2>
                </CCardHeader>
                <CCardBody>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data1}>
                      <YAxis />
                      <XAxis dataKey="name" />
                      <CartesianGrid strokeDasharray="5 5" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol lg="6">
              <CCard style={{ borderRadius: "0.5rem" }}>
                <CCardHeader style={{ borderTopRadius: "0.5rem", textAlign: "center", backgroundColor:"#ff6d00",color:"white",}}>
                  <h2>English Skill Chart</h2>
                </CCardHeader>
                <CCardBody>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data}>
                      <YAxis />
                      <XAxis dataKey="name" />
                      <CartesianGrid strokeDasharray="5 5" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <Loading start={loading} />
    </>
  )
}

export default Dashboard
