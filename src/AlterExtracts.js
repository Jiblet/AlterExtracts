"use strict";
const config = require("../config.json");
const mod = require("../package.json");

const modName = mod.name;
const version = mod.version;
const logging = config.Logging;
const locations = DatabaseServer.tables.locations;

class AlterExtracts {
    constructor() {
        this.mod = "AlterExtracts";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }
    load() {
        for (let l in locations) {
            if (l !== "base") {
                for (let exit in locations[l].base.exits) {
                    let ExtractType = locations[l].base.exits[exit].PassageRequirement

                    if (config.ExtractTypesEnabled.Scav_Coop_Extract && ExtractType === "ScavCooperation") {
                        alterExtract(l, exit, config.Chances.Scav_Coop_Extract, config.ExfiltrationTimes.Scav_Coop_Extract);

                    } else if (config.ExtractTypesEnabled.Paid_Extract && ExtractType === "TransferItem") {
                        alterExtract(l, exit, config.Chances.Paid_Extract, config.ExfiltrationTimes.Paid_Extract);

                    } else if ((config.ExtractTypesEnabled.Backpack_Extract) && ExtractType === "Empty" && locations[l].base.exits[exit].RequiredSlot === "Backpack") {
                        alterExtract(l, exit, config.Chances.Backpack_Extract, config.ExfiltrationTimes.Backpack_Extract);

                    } else if ((config.ExtractTypesEnabled.Alpine_Extract) && ExtractType === "Reference" && locations[l].base.exits[exit].Id === "Alpinist") {
                        alterExtract(l, exit, config.Chances.Alpine_Extract, config.ExfiltrationTimes.Alpine_Extract);
                    }
                }
            }
        }

        function alterExtract(l, exit, chance, exfilTime) {
            locations[l].base.exits[exit].Chance = chance;
            locations[l].base.exits[exit].PlayersCount = "0";
            locations[l].base.exits[exit].ExfiltrationTime = exfilTime;
            locations[l].base.exits[exit].PassageRequirement = "None";
            locations[l].base.exits[exit].ExfiltrationType = "Individual";
            locations[l].base.exits[exit].Id = "";
            locations[l].base.exits[exit].RequirementTip = "";
            locations[l].base.exits[exit].Count = "0";
            if (logging) {
                Logger.log(`[${modName} : ${version}] : Altered Extract : ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${locations[l].base.exits[exit].Chance}, Time: ${locations[l].base.exits[exit].ExfiltrationTime}`, "green");
            }
        }
    }
}

module.exports.Mod = AlterExtracts;