import {get} from "@/utils/http"

const Api = {
    documentTitle:"/document/data"
} as const

function getDocumentTitle(){
    return get(Api.documentTitle);
}

export {getDocumentTitle}