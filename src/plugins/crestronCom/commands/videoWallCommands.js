import {
    videoWallHook,
    sendGet,
    sendPost
} from '@/plugins/crestronCom/api/apiHooks'

export function sendVideoWallConfigQuery() {
    sendGet('CONFIG', '', videoWallHook)
}

export function sendVideoWallLayoutSelect(layoutId) {
    sendPost('LAYOUT', { LayoutId: layoutId }, videoWallHook)
}

export function sendVideoWallCellRouteRequest(layoutId, cellId, sourceId) {
    sendPost('ROUTE', { LayoutId: layoutId, CellId: cellId, SourceId: sourceId }, videoWallHook)
}