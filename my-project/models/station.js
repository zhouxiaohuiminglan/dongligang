const {qurey} = require('./db')

exports.findStationList = () => qurey('select * from station')
exports.addStation = (data) =>qurey(`insert into station (id, name, city,fast,slow,now,status,fault,person,tel) VALUES (?,?,?,?,?,?,?,?,?,?)`,[data.id, data.name, data.city, data.fast, data.slow, data.now,data.status, data.fault, data.person, data.tel])
exports.updateStation = (id,name,city,fast,slow,person,tel) => qurey(`update station set name=?,city=?,fast=?,slow=?,person=?,tel=? where (id=?)`,[name,city,fast,slow,person,tel,id])
exports.deleteStation = (id) => qurey('delete from station where id=?',[id])
exports.findChargingpileList = (station_id)=>qurey('select * from chargingpile where station_id=?',[station_id])
exports.findRecordList = (chargingPice_id)=>qurey('select * from record where chargingPice_id=?',[chargingPice_id])

/**
 * `SELECT 
    JSON_OBJECT(
        'id', s.station_id,
        'name', s.name,
        'list', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', c.chargingPice_id,
                    'voltage', c.voltage,
                    'current', c.current,
                    'power', c.power,
                    'tem', c.tem,
                    'status', c.status,
                    'percent',c.percent,
                    'record', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'time',r.time,
                                'msg', r.msg
                            )
                        )
                        FROM record r
                        WHERE r.chargingPice_id = c.chargingPice_id
                    )
                )
            )
            FROM chargingpile c
            WHERE c.station_id = s.station_id
        )
)
FROM 
    station s`
 * 
 * 
 */
