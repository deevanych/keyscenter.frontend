export interface IModel {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

export abstract class Model implements IModel {
	readonly id: number;
	readonly createdAt: Date;
	readonly updatedAt: Date;

	protected constructor(id: number, createdAt: Date, updatedAt: Date) {
		this.id = id
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
