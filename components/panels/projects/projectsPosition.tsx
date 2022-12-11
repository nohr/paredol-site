import { state } from "../../../common/state";

export function getPosOpt(snap, vWidth, vHeight) {
  const left1 = { x: -270 + state.dist, y: 0 };
  const left2 = { x: 270 * -2 - state.dist * -2, y: 0 };
  const right1 = { x: 270 - state.dist, y: 0 };
  const right2 = { x: 270 * 2 - state.dist * 2, y: 0 };
  const up1 = { x: 0, y: -270 - -state.dist };
  const up2 = { x: 0, y: 270 * -2 - state.dist * -2 };
  const down1 = { x: 0, y: 270 - state.dist };
  const down2 = { x: 0, y: 270 * 2 - state.dist * 2 };

  //Row
  if (
    (state.direction ? vWidth : vHeight) - 270 * 2 - state.dist + 30 <
      (state.direction ? state.optPosition.x : state.optPosition.y) &&
    state.isOpt
  ) {
    //goes over the right side
    if (state.setSwitched) {
      state.setSwitched = true;
      if (!state.proSwitched) {
        if (state.isPro) {
          console.log("1");
          return snap.direction ? left1 : up1;
        } else {
          state.setSwitched = true;
          console.log("2");
          return snap.direction ? right1 : down1;
        }
      } else {
        if (state.isPro) {
          console.log("3");
          return snap.direction ? left2 : up2;
        } else {
          state.setSwitched = true;
          console.log("4");
          return snap.direction ? left1 : up1;
        }
      }
    } else {
      state.setSwitched = true;
      if (!state.proSwitched) {
        if (state.isPro) {
          state.setSwitched = true;
          console.log("5");
          return snap.direction ? left1 : up1;
        } else {
          state.setSwitched = true;
          console.log("6");
          return snap.direction ? right1 : down1;
        }
      } else {
        if (state.isPro) {
          console.log("7");
          return snap.direction ? left2 : up2;
        } else {
          state.setSwitched = true;
          console.log("8");
          return snap.direction ? left1 : up1;
        }
      }
    }
  } else if (!state.isOpt) {
    return { x: 0, y: 0 };
  } else {
    //is normal
    if (state.setSwitched) {
      state.setSwitched = false;
      if (!state.proSwitched) {
        state.setSwitched = false;
        if (state.isPro) {
          return snap.direction ? left1 : up1;
        } else {
          return snap.direction ? left2 : up2;
        }
      } else {
        if (state.isPro) {
          return snap.direction ? right1 : down1;
        } else {
          return snap.direction ? right2 : down2;
        }
      }
    } else {
      if (!state.proSwitched) {
        if (state.isPro) {
          return snap.direction ? right2 : down2;
        } else {
          return snap.direction ? right1 : down1;
        }
      } else {
        if (state.isPro) {
          return snap.direction ? left2 : up2;
        } else {
          return snap.direction ? left1 : up1;
        }
      }
    }
  }
}
