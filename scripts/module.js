"use strict";

import { registerDiagonalRuler } from "./diagonal-ruler.js";

export const MODULE_ID = "diagonal-ruler";

Hooks.once("libWrapper.Ready", async function() {
  registerDiagonalRuler();
});
