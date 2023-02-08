import { DependencyContainer } from "tsyringe";

// SPT types
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

//Pull in config
import * as config from "../config.json";
const logging = config.Logging;

class Mod implements IPostDBLoadMod, IPreAkiLoadMod {
    logger: ILogger
    modName: string
    modVersion: string

    constructor() {
        this.modName = "AlterExtracts"; // Set name and version of the mod so we can log it to console later
        this.modVersion = "2.0.1";
    }

    // Code added here will load BEFORE the server has started loading

    public postDBLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        // get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();
        const locations = tables.locations;

        for (let l in locations) {
            if (l !== "base") {
                for (let exit in locations[l].base.exits) {
                    let ExtractType = locations[l].base.exits[exit].PassageRequirement
                    let extract = locations[l].base.exits[exit];

                    if (config.ExtractTypesEnabled.Scav_Coop_Extract && ExtractType === "ScavCooperation") {
                        this.alterExtract( extract, config.Chances.Scav_Coop_Extract, config.ExfiltrationTimes.Scav_Coop_Extract);

                    } else if (config.ExtractTypesEnabled.Paid_Extract && ExtractType === "TransferItem") {
                        this.alterExtract(extract, config.Chances.Paid_Extract, config.ExfiltrationTimes.Paid_Extract);

                    } else if ((config.ExtractTypesEnabled.Backpack_Extract) && ExtractType === "Empty" && locations[l].base.exits[exit].RequiredSlot === "Backpack") {
                        this.alterExtract( extract, config.Chances.Backpack_Extract, config.ExfiltrationTimes.Backpack_Extract);

                    } else if ((config.ExtractTypesEnabled.Alpine_Extract) && ExtractType === "Reference" && locations[l].base.exits[exit].Id === "Alpinist") {
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

module.exports = { mod: new Mod() }

