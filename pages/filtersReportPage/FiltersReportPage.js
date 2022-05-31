import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux'
import {
    createFilterStatus, createFilterType, createFilterIncident,
    createFilterDepartment, createFilterSearchKey, deleteAllFilters, createFilterPage
} from '../../redux/filterReport/filterReportSlice'
import SelectBox from 'react-native-multi-selectbox'

function FiltersReportPage({ route, navigation }) {

    const dispatch = useDispatch()
    const filterPage = useSelector((state) => state.filterReportRedux.filters.page)
    const filterStatus = useSelector((state) => state.filterReportRedux.filters.status)
    const filterType = useSelector((state) => state.filterReportRedux.filters.type)
    const filterIncident = useSelector((state) => state.filterReportRedux.filters.incident)
    const filterDepartment = useSelector((state) => state.filterReportRedux.filters.department)
    const filterSearchKey = useSelector((state) => state.filterReportRedux.filters.searchKey)

    const { reportStatus, reportType, incidentObject, departments, totalReportPages } = route.params

    const [selectPage, setSelectPage] = React.useState(filterPage)
    const [selectStatus, setSelectStatus] = React.useState(filterStatus)
    const [selectType, setSelectType] = React.useState(filterType)
    const [selectIncident, setSelectIncident] = React.useState(filterIncident)
    const [selectDepartment, setSelectDepartment] = React.useState(filterDepartment)
    const [searchKey, setSearchKey] = React.useState(filterSearchKey)

    let optionsReportStatus = []
    let optionsReportType = []
    let optionsReportIncident = []
    let optionsReportDepartment = []

    // format object for SelectBox Status
    reportStatus.map((status) => {
        let obj = {}
        obj.id = status.code
        obj.item = status.name
        optionsReportStatus.push(obj)
    })

    // format object for SelectBox Type
    reportType.map((type) => {
        let obj = {}
        obj.id = type.code
        obj.item = type.name
        optionsReportType.push(obj)
    })

    // format object for SelectBox Incident
    incidentObject.map((incident) => {
        let obj = {}
        obj.id = incident.code
        obj.item = incident.name
        optionsReportIncident.push(obj)
    })

    // format object for SelectBox Department
    departments.map((department) => {
        let obj = {}
        obj.id = department.id
        obj.item = department.departmentName
        optionsReportDepartment.push(obj)
    })

    const handlerFilters = () => {
        Object.keys(selectStatus).length > 0 ? dispatch(createFilterStatus(selectStatus)) : dispatch(createFilterStatus(''))
        Object.keys(selectType).length > 0 ? dispatch(createFilterType(selectType)) : dispatch(createFilterType(''))
        Object.keys(selectIncident).length > 0 ? dispatch(createFilterIncident(selectIncident)) : dispatch(createFilterIncident(''))
        Object.keys(selectDepartment).length > 0 ? dispatch(createFilterDepartment(selectDepartment)) : dispatch(createFilterDepartment(''))
        searchKey != '' ? dispatch(createFilterSearchKey(searchKey)) : dispatch(createFilterSearchKey(''))
        dispatch(createFilterPage(selectPage))
        navigation.goBack()
    }

    const handlerDeleteFilters = () => {
        setSelectPage({id: 1, item: 'Trang 1'})
        setSelectStatus({})
        setSelectType({})
        setSelectIncident({})
        setSelectDepartment({})
        setSearchKey('')
        dispatch(deleteAllFilters())
    }

    return (
        <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right', 'bottom']}
        >
            <View style={{ alignItems: 'center', padding: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Bộ Lọc Báo Cáo</Text>

                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <Text style={{ fontSize: 15, marginBottom: 5 }}>Tìm kiếm bằng từ khóa</Text>
                    <TextInput
                        style={styles.input}
                        value={searchKey}
                        placeholder="Nhập từ khóa tìm kiếm"
                        onChangeText={(value) => setSearchKey(value)}
                    />
                </View>

                {/* select filter report page */}
                <SelectBox
                    label="Chọn trang"
                    options={totalReportPages}
                    value={selectPage}
                    onChange={(val) => setSelectPage(val)}
                    hideInputFilter
                    labelStyle={{
                        fontSize: 15
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                />

                {/* select filter report status */}
                <SelectBox
                    label="Chọn trạng thái"
                    options={optionsReportStatus}
                    value={selectStatus}
                    onChange={(val) => setSelectStatus(val)}
                    hideInputFilter
                    labelStyle={{
                        fontSize: 15
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                />

                {/* select filter report type */}
                <SelectBox
                    label="Chọn loại"
                    options={optionsReportType}
                    value={selectType}
                    onChange={(val) => setSelectType(val)}
                    hideInputFilter
                    labelStyle={{
                        fontSize: 15
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                />

                {/* select filter report incident */}
                <SelectBox
                    label="Chọn sự cố"
                    options={optionsReportIncident}
                    value={selectIncident}
                    onChange={(val) => setSelectIncident(val)}
                    hideInputFilter
                    labelStyle={{
                        fontSize: 15
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                />

                {/* select filter report department */}
                <SelectBox
                    label="Chọn phòng ban"
                    options={optionsReportDepartment}
                    value={selectDepartment}
                    onChange={(val) => setSelectDepartment(val)}
                    hideInputFilter
                    labelStyle={{
                        fontSize: 15
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                />
            </View>

            {/* buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                {/* button goback */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "gray" }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Trở Về</Text>
                </TouchableOpacity>

                {/* button delete all filters */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "red" }]}
                    onPress={handlerDeleteFilters}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Xóa Hết</Text>
                </TouchableOpacity>

                {/* button apply filters */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#16b6f5" }]}
                    onPress={handlerFilters}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Lọc</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default FiltersReportPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    button: {
        alignItems: "center",
        padding: 8,
        borderRadius: 10
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        width: '95%',
        borderRadius: 8
    },
});