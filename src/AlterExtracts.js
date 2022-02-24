"use strict";
const config = require("../config.json");
const mod = require("../package.json");

const modName = mod.name;
const version = mod.version;
const logging = config.Settings.Logging;

class AlterExtracts {
    constructor() {
        this.mod = "AlterExtracts";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }
    load() {
        const locations = DatabaseServer.tables.locations;

        if (config.Settings.ScavCoopEnabled) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        if (locations[l].base.exits[exit].PassageRequirement === "ScavCooperation") {
                            if (logging) {
                                Logger.log(`[${modName} : ${version}] : Altering SCAV COOP Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${config.Settings.Chance}, Time: ${config.Settings.ExfiltrationTime}`, "green");
                            }
                            locations[l].base.exits[exit].Chance = config.Settings.Chance;
                            locations[l].base.exits[exit].PlayersCount = "0";
                            locations[l].base.exits[exit].ExfiltrationTime = config.Settings.ExfiltrationTime;
                            locations[l].base.exits[exit].PassageRequirement = "None";
                            locations[l].base.exits[exit].ExfiltrationType = "Individual";
                            locations[l].base.exits[exit].Id = "";
                            locations[l].base.exits[exit].RequirementTip = "";
                            locations[l].base.exits[exit].Count = "0";
                        }
                    }
                }
            }
        }

        if (config.Settings.PaidEnabled) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        if (locations[l].base.exits[exit].PassageRequirement === "TransferItem") {
                            if (logging) {
                                Logger.log(`[${modName} : ${version}] : Altering PAID Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${config.Settings.Chance}, Time: ${config.Settings.ExfiltrationTime}`, "green");
                            }
                            locations[l].base.exits[exit].Chance = config.Settings.Chance;
                            locations[l].base.exits[exit].PlayersCount = "0";
                            locations[l].base.exits[exit].ExfiltrationTime = config.Settings.ExfiltrationTime;
                            locations[l].base.exits[exit].PassageRequirement = "None";
                            locations[l].base.exits[exit].ExfiltrationType = "Individual";
                            locations[l].base.exits[exit].Id = "";
                            locations[l].base.exits[exit].RequirementTip = "";
                            locations[l].base.exits[exit].Count = "0";
                        }
                    }
                }
            }
        }
    }
}
module.exports.Mod = AlterExtracts;


/**
 * Add:
 * 1. Config debug logging
 * 2. Config extract time
 * 3. Config config enable coop / enable paid
 * 4. Config chance
 */