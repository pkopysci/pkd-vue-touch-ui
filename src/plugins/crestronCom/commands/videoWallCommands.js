import {
    videoWallHook,
    sendGet,
    sendPost
} from '@/plugins/crestronCom/api/apiHooks'

export function sendVideoWallConfigQuery() {
    sendGet('CONFIG', {}, videoWallHook)
}

export function sendVideoWallLayoutSelect(controlId, canvasId, layoutId) {
    sendPost('LAYOUT', { ControlId: controlId, CanvasId: canvasId, LayoutId: layoutId }, videoWallHook)
}

export function sendVideoWallCellRouteRequest(controlId, canvasId, cellId, sourceId) {
    sendPost('ROUTE', { CtId: controlId, CaId: canvasId, CeId: cellId, ScId: sourceId }, videoWallHook)
}