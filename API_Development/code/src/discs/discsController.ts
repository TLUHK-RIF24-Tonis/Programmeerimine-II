import { Request, Response } from "express";
import discsService from "./discsService";
import userService from "../users/userService";
import { IDiscs } from "./discsInterface";

const getAllDiscs = async (req: Request, res: Response) => {
    const discs = await discsService.getAllDiscs();

    if ( !discs ) {
        return res.status(204).json({
            success: true,
            message: `There are no discs!`,
            discs: []
        })
    }

    return res.status(200).json ({
        success: true,
        message: `All discs loaded!`,
        discs,
    });
};

const getDiscById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const foundDisc = await discsService.getDiscById(id);

    if (foundDisc) {   
        return res.status(200).json ({
        success: true,
        message: `Disc Found!`,
        foundDisc,
    })};

    if(!foundDisc) {
        return res.status (404).json ({
            success: false,
            message: `Disc not found!`
        });
    };
};

const getUserDiscs = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const userDiscs = await discsService.getUserDiscs(id);

    if (!userDiscs) {
        return res.status(200).json ({
            success: true,
            message: `This user with ID: ${id} does not own any discs!`,
            Discs: []
        });
    } else {
        return res.status(200).json ({
            success: true,
            message: 'All discs loaded',
            userDiscs
        });
    };
};

const getMyDiscs = async (req: Request, res: Response) => {
    const userId = res.locals.user.id;

    const userDiscs = await discsService.getUserDiscs(userId);

    if (!userDiscs) {
        return res.status(200).json ({
            success: true,
            message: 'You dont have any discs!',
            Discs: []
        });
    } else {
        return res.status(200).json ({
            success: true,
            message: 'All discs loaded',
            userDiscs
        });
    };
};

const userHaveDisc = (req: Request, res: Response) => {
    const { userId, discId } = req.body

    const isDisc = discsService.getDiscById(discId);
    const isUser = userService.getUserById(userId);

    if (!isDisc || !isUser) {
        return res.status(400).json ({
            success: false,
            message: 'Missing user or disc, please check if both exists!'
        })
    }

    const hasDisc = discsService.userOwnDisc(userId, discId)

    if (!hasDisc) {
        return res.status(404).json ({
            success: false,
            message: `User id: ${userId} does not own this disc.`
        })
    }
    return res.status(200).json ({
        success: true,
        message: `User id: ${userId} has this disc.`
    }) 
}

const createDisc = async ( req: Request, res: Response ) => {
    const { brand, model, type, speed, glide, turn, fade } = req.body

    if ( !brand || !model || !type ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert disc brand, model or type!'
        })
    }

    if ( speed == null || glide == null || turn == null || fade == null ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert all flight numbers ( speed, glide, turn, fade ) before adding disc!'
        })
    }

    const result = await discsService.createDisc(
        brand, model, type, speed, glide, turn, fade
    );
    
    if ( !result.success ) {
        return res.status(409).json ({
            success: false,
            message: result.message
        })
    } else {
        return res.status(201).json ({
            success: true,
            message: 'Disc created!',
            discId: result.discId,
            brand,
            model,
            type,
            speed,
            glide,
            turn,
            fade
        });
    };
};

const deleteDisc = async ( req: Request, res: Response ) => {
    const discId = Number( req.params.id );

    const deleted = await discsService.deleteDisc(discId)

    if ( !deleted ) {
        return res.status(404).json({
            success: false,
            message: `Disc with ID: ${discId} not found`
        });
    }

    return res.status(204).send();
};

const updateDisc = async ( req: Request, res: Response ) => {
    const id = Number(req.params.id);
    const { brand, model, disc_type, speed, glide, turn, fade } = req.body;

    if (
        brand === undefined &&
        model === undefined &&
        disc_type === undefined &&
        speed === undefined &&
        glide === undefined &&
        turn === undefined &&
        fade === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: `Atleast one field must be provided!`
        });
    }

    const updates: Partial<{
        brand: string;
        model: string;
        disc_type: string;
        speed: number;
        glide: number;
        turn: number;
        fade: number;
    }> = {};

    if ( brand !== undefined ) updates.brand = brand;
    if ( model !== undefined ) updates.model = model;
    if ( disc_type !== undefined ) updates.disc_type = disc_type;
      if ( speed !== undefined ) {
    const parsedSpeed = Number(speed);
    if (Number.isNaN(parsedSpeed)) {
      return res.status(400).json({
        success: false,
        message: 'Speed must be a number',
      });
    }
    updates.speed = parsedSpeed;
  }
    if ( glide !== undefined ) {
    const parsedGlide = Number(glide);
    if (Number.isNaN(parsedGlide)) {
      return res.status(400).json({
        success: false,
        message: 'Glide must be a number',
      });
    }
    updates.glide = parsedGlide;
  }
    if ( turn !== undefined ) {
    const parsedTurn = Number(turn);
    if (Number.isNaN(parsedTurn)) {
      return res.status(400).json({
        success: false,
        message: 'turn must be a number',
      });
    }
    updates.turn = parsedTurn;
  }
    if ( fade !== undefined ) {
    const parsedFade = Number(fade);
    if (Number.isNaN(parsedFade)) {
      return res.status(400).json({
        success: false,
        message: 'Fade must be a number',
      });
    }
    updates.fade = parsedFade;
  }

  const update = await discsService.updateDisc( id, updates);

  if ( !update ) {
    res.status(404).json({
        success: false,
        message: `Disc with ID: ${id} not found!`
    })
  }

  return res.status(200).json({
    success: true,
    message: `Disc updated`,
    disc: update
  });
};

export default { getAllDiscs, getDiscById, getUserDiscs, userHaveDisc, createDisc, deleteDisc, getMyDiscs, updateDisc };
