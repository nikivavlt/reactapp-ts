declare namespace Types.Estate {
	type EstateType = 'HOUSE' | 'APART';
	type HouseClass = 'HOUSE_VILLA' | 'HOUSE_MIDDLE' | 'HOUSE_TRAILER' | 'HOUSE_ECO';
	type ApartClass = 'APART_STUDIO' | 'APART_COMFORT' | 'APART_PREMIUM' | 'APART_PENTHOUSE';

	type GarageType = 'NONE' | 'ECO' | 'MIDDLE' | 'PREMIUM';

	interface IEstateData extends Types.RealEstateAgency.IEstate {
		parkingSlots: (IParkingSlot | null)[];
		rommateSlots: (IRommateSlot | null)[];
		doors: boolean;
	}

	interface IParkingSlot {
		vehicleUUID: string;
		vehicleName: string;
	}
	interface IRommateSlot {
		characterUUID: string;
		characterNickname: string;
	}
}
