import {$API} from "~/api/instance";

export namespace ReviewsAPI {
    export const create = async (data: { comment: string, email: string, is_positive: boolean }) => {
        return await $API(`/reviews`, {}, 'POST', {
            data
        })
    }
}
