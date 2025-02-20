import {
    videoWallHook,
    sendGet,
    sendPost
} from '@/plugins/crestronCom/api/apiHooks'

export function sendVideoWallConfigQuery() {
    sendGet('CONFIG', {}, videoWallHook)
}

export function sendVideoWallLayoutSelect(controlId, layoutId) {
    sendPost('LAYOUT', { ControlId: controlId, LayoutId: layoutId }, videoWallHook)
}

export function sendVideoWallCellRouteRequest(controlId, cellId, sourceId) {
    sendPost('ROUTE', { ControlId: controlId, CellId: cellId, SourceId: sourceId }, videoWallHook)
}