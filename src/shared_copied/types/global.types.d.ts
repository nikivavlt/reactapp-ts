declare namespace Types.Global {
    interface IResponse<T> {
        message: string;
        ok: boolean;
        data?: T;
    }

    interface PosWithRot {
        position: { x: number; y: number; z: number };
        rotation: number;
    }
}
