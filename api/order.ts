import { $API } from "~/api/instance";
import IPaymentResponse = OrderAPI.IPaymentResponse;

export namespace OrderAPI {
	export interface IPaymentResponse {
		data: {
			id: string,
			attributes: {
				status: "pending",
				amount: {
					value: string,
					currency: string
				},
				description: string,
				recipient:
					{
						account_id: string,
						gateway_id: string
					},
				payment_method:
					{
						type: string,
						id: string,
						saved: boolean
					},
				created_at: string,
				confirmation:
					{
						type: string,
						return_url: string,
						confirmation_url: string
					},
				test: boolean,
				paid: boolean,
				refundable: boolean,
				metadata: {
					order: string
				}
			}
		},
		meta: {}
	}


	export const create = async (cartId: string, email: string): Promise< IPaymentResponse > => {
		return await $API('/orders', {}, 'POST', {
			data: {
				cartId,
				email
			}
		})
	}
}
