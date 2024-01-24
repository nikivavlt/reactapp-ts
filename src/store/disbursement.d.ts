declare namespace Types {
	namespace Disbursement {
		type DisbursementTypes = 'DISBURSEMENT_CAR' | 'DISBURSEMENT_ESTATE_HOUSE' | 'DISBURSEMENT_ESTATE_APART' | 'DISBURSEMENT_BUSINESS';
		interface IDisbursement {
			uuid: string;
			characterUUID: string;
			type: DisbursementTypes;
			value: number;
			dateUnix: number;
			title: string;
			desc: string;
		}
	}
}
