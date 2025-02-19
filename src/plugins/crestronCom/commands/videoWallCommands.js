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
    console.log("TODO: sendVideoWallCellRouteRequest()")
}