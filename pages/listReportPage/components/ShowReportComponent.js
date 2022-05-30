import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function ShowReport({ filterReports, reportStatus, reportType, incidentObject }) {
    return (
        <View
            style={{ position: 'relative', flex: 1 }}
        >
            {
                filterReports.length > 0 ?
                    <FlatList
                        data={filterReports}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {

                            // get status name report
                            let statusName = reportStatus.filter(status => status.code == item.status)
                            // get type name report
                            let typeName = reportType.filter(type => type.code == item.reportType)
                            // get incident object name report
                            let incidentName = incidentObject.filter(incident => incident.code == item.incidentObject)
                            // get datetime report
                            let date = new Date(item.reportTime * 1000)

                            return (
                                <View
                                    key={item.id}
                                    style={styles.reportContainer}
                                >
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            {/* text report No */}
                                            <Text style={styles.reportTextNo} >
                                                {item.reportNo}
                                            </Text>

                                            {/* text status name report */}
                                            <Text
                                                style={
                                                    statusName[0].code == 0 ? { color: 'green' }
                                                        : statusName[0].code == 1 ? { color: '#c99d16' }
                                                            : statusName[0].code == 2 ? { color: '#c96416' }
                                                                : statusName[0].code == 3 ? { color: '#16c9a2' }
                                                                    : statusName[0].code == 4 ? { color: '#c91616' }
                                                                        : statusName[0].code == 5 ? { color: '#1616c9' } : ''
                                                }
                                            >
                                                {statusName[0].name}
                                            </Text>

                                        </View>

                                        {/* text date time report */}
                                        <View>
                                            <Text>
                                                {
                                                    date.getDate() + "/" + (date.getMonth() + 1) +
                                                    "/" + date.getFullYear() + " " + date.getHours() +
                                                    ":" + date.getMinutes() + ":" + date.getSeconds()
                                                }
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            {/* text type name report */}
                                            <Text
                                                style={styles.reportType}
                                            >
                                                {
                                                    typeName[0].name
                                                }
                                            </Text>

                                            {/* text incident name report */}
                                            <Text>
                                                {
                                                    incidentName[0].name
                                                }
                                            </Text>
                                        </View>

                                        <View style={{ width: '95%' }}>
                                            <Text>
                                                {item.reporterName}
                                            </Text>
                                            <Text>
                                                {item.detailDescription}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* icon dots  */}
                                    <View style={{ justifyContent: 'center' }}>
                                        <MaterialCommunityIcons name='dots-vertical' color='#086378' size={25} />
                                    </View>
                                </View>
                            )
                        }}
                    />
                    :
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 20 }}>Không Có Dữ Liệu</Text>
                    </View>
            }

            {/* icon add */}
            <View
                style={{ position: 'absolute', bottom: 20, right: 10 }}
            >
                <MaterialCommunityIcons name='plus-circle' size={50} color='#086378' />
            </View>
        </View>
    )
}

export default ShowReport

const styles = StyleSheet.create({
    reportContainer: {
        borderColor: '#c4123e', borderWidth: 1,
        borderRadius: 4, margin: 5,
        padding: 10, flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reportTextNo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    reportType: {
        borderRightWidth: 1,
        marginRight: 5,
        paddingRight: 5
    }
});