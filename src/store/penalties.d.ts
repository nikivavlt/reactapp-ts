declare namespace Types {
	namespace Penalties {
		// cc - criminal code / ac - administrative code
		type PenaltyType = 'PENALTY_TRAFFIC_RULES' | 'PENALTY_CC' | 'PENALTY_AC' | 'PENALTY_OTHER';

		interface IPenalty {
			id: number;
			type: PenaltyType;
			dateUnix: number;
			issuedNickname: string;
			issuedCID: string;
			value: number;
			characterUUID: string;
			isPaid: boolean;
		}
	}
}
