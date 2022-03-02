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

        if (config.Settings.ExtractTypesEnabled.Scav_Coop_Extract) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        let ExtractType = locations[l].base.exits[exit].PassageRequirement

                        if (config.Settings.ExtractTypesEnabled.Scav_Coop_Extract &&
                            ExtractType === "ScavCooperation") {
                            alterExtract(l, exit, config.Settings.Chances.Scav_Coop_Extract, config.Settings.ExfiltrationTimes.Scav_Coop_Extract);

                        } else if (config.Settings.ExtractTypesEnabled.Paid_Extract &&
                            ExtractType === "TransferItem") {
                            alterExtract(l, exit, config.Settings.Chances.Paid_Extract, config.Settings.ExfiltrationTimes.Paid_Extract);

                        } else if ((config.Settings.ExtractTypesEnabled.Backpack_Extract) &&
                            ExtractType === "Empty" &&
                            locations[l].base.exits[exit].RequiredSlot === "Backpack") {
                            alterExtract(l, exit, config.Settings.Chances.Backpack_Extract, config.Settings.ExfiltrationTimes.Backpack_Extract);

                        } else if ((config.Settings.ExtractTypesEnabled.Alpine_Extract) &&
                            ExtractType === "Reference" &&
                            locations[l].base.exits[exit].Id === "Alpinist") {
                            alterExtract(l, exit, config.Settings.Chances.Alpine_Extract, config.Settings.ExfiltrationTimes.Alpine_Extract);
                        }
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