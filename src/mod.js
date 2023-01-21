"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Pull in config
const config = __importStar(require("../config.json"));
const logging = config.Logging;
class Mod {
    constructor() {
        this.modName = "AlterExtracts"; // Set name and version of the mod so we can log it to console later
        this.modVersion = "2.0";
    }
    // Code added here will load BEFORE the server has started loading
    postDBLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        // get database from server
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const locations = tables.locations;
        for (let l in locations) {
            if (l !== "base") {
                for (let exit in locations[l].base.exits) {
                    let ExtractType = locations[l].base.exits[exit].PassageRequirement;
                    let extract = locations[l].base.exits[exit];
                    if (config.ExtractTypesEnabled.Scav_Coop_Extract && ExtractType === "ScavCooperation") {
                        this.alterExtract(extract, config.Chances.Scav_Coop_Extract, config.ExfiltrationTimes.Scav_Coop_Extract);
                    }
                    else if (config.ExtractTypesEnabled.Paid_Extract && ExtractType === "TransferItem") {
                        this.alterExtract(extract, config.Chances.Paid_Extract, config.ExfiltrationTimes.Paid_Extract);
                    }
                    else if ((config.ExtractTypesEnabled.Backpack_Extract) && ExtractType === "Empty" && locations[l].base.exits[exit].RequiredSlot === "Backpack") {
                        this.alterExtract(extract, config.Chances.Backpack_Extract, config.ExfiltrationTimes.Backpack_Extract);
                    }
                    else if ((config.ExtractTypesEnabled.Alpine_Extract) && ExtractType === "Reference" && locations[l].base.exits[exit].Id === "Alpinist") {
                        this.alterExtract(extract, config.Chances.Alpine_Extract, config.ExfiltrationTimes.Alpine_Extract);
                    }
                }
            }
        }
    }
    alterExtract(extract, chance, exfilTime) {
        extract.Chance = chance;
        extract.PlayersCount = "0";
        extract.ExfiltrationTime = exfilTime;
        extract.PassageRequirement = "None";
        extract.ExfiltrationType = "Individual";
        extract.Id = "";
        extract.RequirementTip = "";
        extract.Count = "0";
        if (logging) {
            this.logger.log(`[${this.modName} : ${this.modVersion}] : Altered Extract : ${extract.Name}, Chance: ${extract.Chance}, Time: ${extract.ExfiltrationTime}`, "green");
        }
    }
}
module.exports = { mod: new Mod() };
