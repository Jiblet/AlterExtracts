class AlterExtracts
{
    constructor()
    {
        this.mod = "AlterExtracts";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }
    load()
    {
        const locations = DatabaseServer.tables.locations;

        for (let l in locations)
        {
            if (l !== "base")
            {
                for (let exit in locations[l].base.exits)
                {
                    if (locations[l].base.exits[exit].PassageRequirement === "ScavCooperation" || locations[l].base.exits[exit].PassageRequirement === "TransferItem")
                    Logger.info(`${this.mod} : Altering extract: ${exit} : ${locations[l].base.exits[exit].Name}`);
                    {
                        locations[l].base.exits[exit].Chance = "66";
                        locations[l].base.exits[exit].PlayersCount = "0";
                        locations[l].base.exits[exit].ExfiltrationTime = "8";
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
module.exports.Mod = AlterExtracts;