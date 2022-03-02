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
                        if (locations[l].base.exits[exit].PassageRequirement === "ScavCooperation") {
                            alterExtract(l, exit,config.Settings.Chances.Scav_Coop_Extract, config.Settings.ExfiltrationTimes.Scav_Coop_Extract);
                        }
                    }
                }
            }
        }

        if (config.Settings.ExtractTypesEnabled.Paid_Extract) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        if (locations[l].base.exits[exit].PassageRequirement === "TransferItem") {
                            alterExtract(l, exit,config.Settings.Chances.Paid_Extract, config.Settings.ExfiltrationTimes.Paid_Extract);
                        }
                    }
                }
            }
        }
        if (config.Settings.ExtractTypesEnabled.Backpack_Extract) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        if (locations[l].base.exits[exit].PassageRequirement === "Empty" && locations[l].base.exits[exit].RequiredSlot === "Backpack") {
                            alterExtract(l, exit,config.Settings.Chances.Backpack_Extract, config.Settings.ExfiltrationTimes.Backpack_Extract);
                        }
                    }
                }
            }
        }

        if (config.Settings.ExtractTypesEnabled.Alpine_Extract) {
            for (let l in locations) {
                if (l !== "base") {
                    for (let exit in locations[l].base.exits) {
                        if (locations[l].base.exits[exit].PassageRequirement === "Reference" && locations[l].base.exits[exit].Id === "Alpinist") {
                            alterExtract(l, exit,config.Settings.Chances.Alpine_Extract, config.Settings.ExfiltrationTimes.Alpine_Extract);
                        }
                    }
                }
            }
        }

        function alterExtract(l, exit, chance, exfilTime) {
            if (logging) {
                Logger.log(`[${modName} : ${version}] : Altering Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${chance}, Time: ${exfilTime}`, "green");
            }
            locations[l].base.exits[exit].Chance = chance;
            locations[l].base.exits[exit].PlayersCount = "0";
            locations[l].base.exits[exit].ExfiltrationTime = exfilTime;
            locations[l].base.exits[exit].PassageRequirement = "None";
            locations[l].base.exits[exit].ExfiltrationType = "Individual";
            locations[l].base.exits[exit].Id = "";
            locations[l].base.exits[exit].RequirementTip = "";
            locations[l].base.exits[exit].Count = "0";
        }
    }
}
module.exports.Mod = AlterExtracts;







// if (config.Settings.ScavCoopEnabled) {
//     for (let l in locations) {
//         if (l !== "base") {
//             for (let exit in locations[l].base.exits) {
//                 if (locations[l].base.exits[exit].PassageRequirement === "ScavCooperation") {
//                     if (logging) {
//                         Logger.log(`[${modName} : ${version}] : Altering Scav Co-op Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${config.Settings.Chance}, Time: ${config.Settings.ExfiltrationTime}`, "green");
//                     }
//                     locations[l].base.exits[exit].Chance = config.Settings.Chance;
//                     locations[l].base.exits[exit].PlayersCount = "0";
//                     locations[l].base.exits[exit].ExfiltrationTime = config.Settings.ExfiltrationTime;
//                     locations[l].base.exits[exit].PassageRequirement = "None";
//                     locations[l].base.exits[exit].ExfiltrationType = "Individual";
//                     locations[l].base.exits[exit].Id = "";
//                     locations[l].base.exits[exit].RequirementTip = "";
//                     locations[l].base.exits[exit].Count = "0";
//                 }
//             }
//         }
//     }
// }

// if (config.Settings.PaidEnabled) {
//     for (let l in locations) {
//         if (l !== "base") {
//             for (let exit in locations[l].base.exits) {
//                 if (locations[l].base.exits[exit].PassageRequirement === "TransferItem") {
//                     if (logging) {
//                         Logger.log(`[${modName} : ${version}] : Altering Paid Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${config.Settings.Chance}, Time: ${config.Settings.ExfiltrationTime}`, "green");
//                     }
//                     locations[l].base.exits[exit].Chance = config.Settings.Chance;
//                     locations[l].base.exits[exit].PlayersCount = "0";
//                     locations[l].base.exits[exit].ExfiltrationTime = config.Settings.ExfiltrationTime;
//                     locations[l].base.exits[exit].PassageRequirement = "None";
//                     locations[l].base.exits[exit].ExfiltrationType = "Individual";
//                     locations[l].base.exits[exit].Id = "";
//                     locations[l].base.exits[exit].RequirementTip = "";
//                     locations[l].base.exits[exit].Count = "0";
//                 }
//             }
//         }
//     }
// }
// if (config.Settings.BackpackEnabled) {
//     for (let l in locations) {
//         if (l !== "base") {
//             for (let exit in locations[l].base.exits) {
//                 if (locations[l].base.exits[exit].PassageRequirement === "Empty" && locations[l].base.exits[exit].RequiredSlot === "Backpack") {
//                     if (logging) {
//                         Logger.log(`[${modName} : ${version}] : Altering Backpack-less Extract: ${l} : ${locations[l].base.exits[exit].Name}, Chance: ${locations[l].base.exits[exit].Chance}, Time: ${locations[l].base.exits[exit].ExfiltrationTime}`, "green");
//                     }
//                     //locations[l].base.exits[exit].Chance = config.Settings.Chance; //Leave chance alone for these extracts
//                     locations[l].base.exits[exit].PlayersCount = "0";
//                     // locations[l].base.exits[exit].ExfiltrationTime = config.Settings.ExfiltrationTime;
//                     locations[l].base.exits[exit].PassageRequirement = "None";
//                     locations[l].base.exits[exit].ExfiltrationType = "Individual";
//                     locations[l].base.exits[exit].Id = "";
//                     locations[l].base.exits[exit].RequirementTip = "";
//                     locations[l].base.exits[exit].Count = "0";
//                 }
//             }
//         }
//     }
// }

// if (config.Settings.AlpineEnabled) {
//     for (let l in locations) {
//         if (l !== "base") {
//             for (let exit in locations[l].base.exits) {
//                 if (locations[l].base.exits[exit].PassageRequirement === "Reference" && locations[l].base.exits[exit].Id === "Alpinist") {
//                     alterExtract(l, exit, "Alpine", config.Settings.ExfiltrationTimes.Alpine_Extract);
//                 }
//             }
//         }
//     }
// }