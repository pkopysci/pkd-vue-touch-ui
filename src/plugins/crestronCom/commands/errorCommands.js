import { errorReportingHook, sendGet } from "../api/apiHooks";

export function getErrors()
{
    sendGet("ERRLIST",'',errorReportingHook);
}