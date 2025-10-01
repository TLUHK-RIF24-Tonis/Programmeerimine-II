import { IDiscs } from "./discsInterface";
import { discs, userDiscs, users } from "../data";

const getUserDiscs = ( userId: number): IDiscs[] => {

    const ownedDiscIds = userDiscs.filter(ud => ud.userId === userId).map(ud => ud.discId);
    return discs.filter(disc => ownedDiscIds.includes(disc.id));
};

const userOwnDisc = ( userId: number, discId: number): boolean => {
    return userDiscs.some(ud => ud.userId === userId && ud.discId == discId);
}

const createDisc = ( brand: string, model: string,type: IDiscs["type"] , speed: number, glide: number, turn: number, fade: number ) => {
    const id = discs[discs.length - 1].id + 1;

    const allDiscs = getAllDiscs();
    const exist = allDiscs.some(d => d.brand === brand && d.model === model);

    if ( exist ) return null;

    const disc: IDiscs | null = {
        id,
        brand,
        model,
        type,
        speed,
        glide,
        turn,
        fade,
    };
    discs.push(disc);
    return disc;
};

const getDiscById = (id: number): IDiscs | undefined => {
  return discs.find(disc => disc.id === id);
};

const getAllDiscs = (): IDiscs [] => {
    return discs
};

export default { getUserDiscs, userOwnDisc, getAllDiscs, getDiscById, createDisc };
