import {put,all, takeEvery, select, call} from "redux-saga/effects"
let data = {
    markers: [
        {
            name: "Точка 1",
            lat: 55.87883391988633,
            long: 37.68294060905703
        }, {
            name: "Точка 2",
            lat: 55.72061454465857,
            long: 37.523308888149316
        }, {
            name: "Точка 3",
            lat: 55.71642376857964,
            long: 37.61394375202502
        }, {
            name: "Точка 4",
            lat: 55.754293912466366,
            long: 37.63660305378283
        }, {
            name: "Точка 5",
            lat: 55.78521660038577,
            long: 37.7114920710402
        }, {
            name: "Точка 6",
            lat: 55.930023140730256,
            long: 37.54508668999311
        }],
    orders: [
        {
            key: 1,
            name: "Алексей",
            describe: "Перевоз шкафа",
            time: "15:00",
            start: "Точка 2",
            end: "Точка 3",
        },
        {key: 2, name: "Дмитрий", describe: "Перевоз бумаг", time: "08:50", start: "Точка 4", end: "Точка 2"},
        {key: 3, name: "Кирилл", describe: "Перевоз кровати", time: "19:10", start: "Точка 6", end: "Точка 1"},
        {key: 4, name: "Константин", describe: "Перевоз кресла", time: "11:30", start: "Точка 4", end: "Точка 6"},
        {key: 5, name: "Олег", describe: "Перевоз батареи", time: "01:00", start: "Точка 3", end: "Точка 1"},
        {key: 6, name: "Артур", describe: "Перевоз рояля", time: "12:40", start: "Точка 5", end: "Точка 4"},
    ],
    path: null,
    selectedRow:null
}
export let mainReducer = (state = data, action) => {
    switch (action.type) {
        case "path": {
            return {...state, path: action.path}
        }
        case "changeSelectedRow":{
            return {...state,selectedRow: action.row}
        }
        case "changeOrderPoint": {
            let copyState = JSON.parse(JSON.stringify(state))
            copyState.orders[action.number - 1][action.point] = action.value
            return {...copyState}
        }
        default:
            return state
    }
}
export let clickOnRowAC = (data) => ({
    type: "clickOnRow",
    data
})
export let changeOrderPointAC = (row,number, point, value) => ({
    type: "orderPoint",
    row,
    number, point, value

})
let getCoords = (markers, row) => {
    let findFun = (coord) => {
        let marker = markers.find((e) => {
            return coord === e.name
        })

        return [marker.lat, marker.long]
    }
    return [findFun(row.start), findFun(row.end)]
}

function* clickOnRow(data) {
    let markers = yield select((state) => {
        return state.mainReducer.markers
    })
    let coords = yield call(getCoords, markers, data.data[0])
    yield put({type: "path", path: coords})
    yield put({type: "changeSelectedRow", row: data.data[0].key})
}
function* orderPoint(data){
    let markers = yield select((state) => {
        return state.mainReducer.markers
    })
    let rowData=JSON.parse(JSON.stringify(data.row))
    rowData[data.point]=data.value
    let coords = yield call(getCoords, markers,rowData)
    yield put({type: "changeOrderPoint", number:data.number, point:data.point, value:data.value})
    let selectedRow= yield select((state) => {
        return state.mainReducer.selectedRow
    })
    if(selectedRow===data.row.key){

        yield put({type: "path", path: coords})
    }
  }
export function* mainSaga() {
    all([
        yield takeEvery('clickOnRow', clickOnRow),
        yield takeEvery('orderPoint', orderPoint)
    ])

}