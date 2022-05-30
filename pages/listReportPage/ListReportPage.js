import React from 'react'
import { StyleSheet, } from 'react-native'
import Axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux'

import { getUserLogin } from '../../asyncStorage/userLogin'

import { createFilterTime } from '../../redux/filterReport/filterReportSlice'
import ShowReportComponent from './components/ShowReportComponent'
import FilterReportComponent from './components/FilterReportComponent'


function ListReportPage({ navigation }) {

    const [authorization, setAuthorization] = React.useState('')

    // get data in redux
    const filterTime = useSelector((state) => state.filterReportRedux.filterTime)
    const filters = useSelector((state) => state.filterReportRedux.filters)
    const dispatch = useDispatch()

    const [reports, setReports] = React.useState([])
    const [filterReports, setFilterReports] = React.useState([])
    const [incidentObject, setIncidentObject] = React.useState([])
    const [departments, setDepartments] = React.useState([])
    const [reportStatus, setReportStatus] = React.useState([])
    const [reportType, setReportType] = React.useState([])

    const [showDatePicker, setShowDatePicker] = React.useState(false)

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = (output) => {
        const { startDate, startDateString, endDate, endDateString } = output
        dispatch(createFilterTime([startDate.getTime(), endDate.getTime(), startDateString, endDateString]))
        setShowDatePicker(false)
    }

    const getAllReports = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getAllReports',
            {
                page: 1
            },
            {
                headers: {
                    'Authorization': authorization
                }
            })
            .then((res) => {
                if (res.status) {
                    setReports(res.data.data.data)
                    setFilterReports(res.data.data.data)
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    const getCommon = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getCommon',
            {
                groups: 'incidentObject, reportStatus, reportType'
            },
            {
                headers: {
                    'Authorization': authorization
                }
            })
            .then((res) => {
                if (res.status) {
                    setIncidentObject(res.data.data.incidentObject);
                    setReportStatus(res.data.data.reportStatus);
                    setReportType(res.data.data.reportType);
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    const getAllDepartments = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getAllDepartments', {},
            {
                headers: {
                    'Authorization': authorization
                }
            })
            .then((res) => {
                if (res.status) {
                    setDepartments(res.data.data.data);
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    // filter time report
    const handlerFilterTime = () => {
        // filtered by time
        if (filterTime.length > 0) {
            let filterResult = []
            filterResult = reports.filter((report) => {
                // timeStamp => dateTime
                let reportTime = new Date(report.reportTime * 1000)
                let filterTimeStart = new Date(filterTime[0])
                let filterTimeEnd = new Date(filterTime[1])

                // get day month year in dateTime
                let reportDate = new Date(reportTime.getFullYear(), reportTime.getMonth(), reportTime.getDate())
                let filterDateStart = new Date(filterTimeStart.getFullYear(), filterTimeStart.getMonth(), filterTimeStart.getDate())
                let filterDateEnd = new Date(filterTimeEnd.getFullYear(), filterTimeEnd.getMonth(), filterTimeEnd.getDate())

                if (reportDate >= filterDateStart && reportDate <= filterDateEnd) {
                    return report
                }
            })

            setFilterReports(filterResult)

        } else {
            // not filtered by time => re-render all report
            setFilterReports(reports)
        }
    }

    //get asyncstorage user login
    React.useEffect(() => {
        getUserLogin().then((res) => setAuthorization(res.token_type + ' ' + res.access_token))
    }, [])

    // get database (all report and commmon code)
    React.useEffect(() => {
        getCommon()
        getAllDepartments()
        getAllReports()
    }, [authorization])

    // when filter time report
    React.useEffect(() => {
        handlerFilterTime()
    }, [filterTime, reports])

    // when filters report (filter status report)
    React.useEffect(() => {
        if (
            Object.keys(filters.status).length != 0 ||
            Object.keys(filters.type).length != 0 ||
            Object.keys(filters.incident).length != 0 ||
            Object.keys(filters.department).length != 0 ||
            filters.searchKey != ''
        ) {

            let multiFilters = {
                page: 1
            }

            Object.keys(filters.status).length != 0 ? multiFilters.status = filters.status.id : ''
            Object.keys(filters.type).length != 0 ? multiFilters.reportType = filters.type.id : ''
            Object.keys(filters.incident).length != 0 ? multiFilters.incidentObject = filters.incident.id : ''
            Object.keys(filters.department).length != 0 ? multiFilters.departmentId = filters.department.id : ''
            filters.searchKey != '' ? multiFilters.searchKey = filters.searchKey : ''

            Axios.post('https://qlsc.maysoft.io/server/api/getAllReports',
                multiFilters,
                {
                    headers: {
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY'
                    }
                })
                .then((res) => {
                    setReports(res.data.data.data)
                })
                .catch((err) => {
                    console.log('err', err);
                })

        } else {
            getAllReports()
        }
    }, [filters])

    return (
        <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right', 'bottom']}
        >
            {/* view filters */}
            <FilterReportComponent
                navigation={navigation}
                filterTime={filterTime}
                openDatePicker={openDatePicker}
                showDatePicker={showDatePicker}
                onCancel={onCancel}
                onConfirm={onConfirm}
                reportStatus={reportStatus}
                reportType={reportType}
                incidentObject={incidentObject}
                departments={departments}
                filters={filters}
            />

            {/* view show report */}
            <ShowReportComponent
                filterReports={filterReports}
                reportStatus={reportStatus}
                reportType={reportType}
                incidentObject={incidentObject}
            />

        </SafeAreaView>
    )
}

export default ListReportPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});