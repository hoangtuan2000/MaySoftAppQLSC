import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteFilterTime } from '../../../redux/filterReport/filterReportSlice'
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-neat-date-picker'


function FilterReport(
    {
        navigation, filterTime, openDatePicker,
        showDatePicker, onCancel, onConfirm,
        reportStatus, reportType, incidentObject,
        departments, filters, totalReportPages
    }
) {

    const dispatch = useDispatch()

    return (
        <View
            style={styles.wapper}
        >
            {/* view filter calendar */}
            <View style={{ marginRight: 5, justifyContent: 'center', width: '70%', }}>
                {/* filter date */}
                <View
                    style={styles.inputFilterTime}
                >
                    <Text>
                        {
                            filterTime.length > 0 ?
                                <>
                                    {/* icon => click delete filter time report */}
                                    <Icon
                                        onPress={() => dispatch(deleteFilterTime())}
                                        name='close'
                                        color='#086378'
                                        size={25}
                                    />

                                    {/* show dates filter */}
                                    <Text>
                                        {
                                            filterTime[2] + ' -> ' + filterTime[3]
                                        }
                                    </Text>
                                </>
                                : ''
                        }
                    </Text>

                    {/* icon => click show calendar */}
                    <Icon onPress={openDatePicker} name='calendar' color='#086378' size={25} />
                </View>

                {/* calendar library */}
                <DatePicker
                    isVisible={showDatePicker}
                    mode={'range'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                />
            </View>

            {/* icon filter => navigation filters page */}
            <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('ListReportScreen',
                            {
                                screen: 'FiltersReportPage', params: {
                                    reportStatus: reportStatus,
                                    reportType: reportType,
                                    incidentObject: incidentObject,
                                    departments: departments,
                                    totalReportPages: totalReportPages
                                }
                            })
                    }
                    style={{
                        position: 'relative',
                    }}
                >
                    <Icon name="filter" size={30} color="#086378" />
                    {/* icon badge of icon filters  */}
                    {
                        Object.keys(filters.status).length != 0 ||
                            Object.keys(filters.type).length != 0 ||
                            Object.keys(filters.incident).length != 0 ||
                            Object.keys(filters.department).length != 0 ||
                            filters.searchKey != ''
                            ?
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    fontSize: 18,
                                    color: 'white',
                                    backgroundColor: 'red',
                                    borderRadius: 20,
                                    padding: 1,
                                    paddingRight: 4,
                                    paddingLeft: 3
                                }}
                            >
                                <Icon
                                    name="info"
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        padding: 0,
                                        margin: 0
                                    }}
                                />
                            </View>
                            : <></>
                    }
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default FilterReport


const styles = StyleSheet.create({
    wapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        direction: 'inherit',
        flexWrap: 'nowrap',
        paddingBottom: 5,
        borderBottomWidth: 0.8,
        borderBottomColor: 'blue',
        padding: 5
    },
    inputFilterTime: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        justifyContent: 'space-between',
        borderColor: '#086378'
    }
});