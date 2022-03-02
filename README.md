# Altered Extracts

This mod can change all extracts that usually require you to either:
1. have a friendly Scav with you (impossible in Single Player),
2. require payment,
3. need you to drop your backpack, or
4. need you to have a red rebel and paracord

Into normal extracts that require none of those things.

The probability of the extract being active, and the time taken to extract from are configurable in the config file.

## Warnings
* Some types of extracts are not affected by default. You'll need to turn them on in the config.json.
* May interfere with, or be interfered with by, other mods that modify extracts. Rename to zzzz-AlterExtracts if you need to.

## Config
As of v1.3.0, this mod now operates on 4 types of extract:
* "Scav_Coop_Extract" - Scav Co-op extracts, like Woods' factory gate
* "Paid_Extract":     - Paid extracts, like the dorms vehicle extract on Customs
* "Backpack_Extract"  - Extracts that need you to remove your backpack, like Interchange's hole in fence
* "Alpine_Extract"    - Extracts that need a Red Rebel and paracord, like Reserve's cliff descent

```
{
	"Settings": {
		"Logging": true,                - Turns logging ot the console on and off.
		"ExtractTypesEnabled": {        - Enables the changing of each extract type as per the examples above.
			"Scav_Coop_Extract": true,    
			"Paid_Extract": true,           
			"Backpack_Extract": false,  - Note that this is turned off by default as I don't like it, but you do you!    
			"Alpine_Extract": false     - Note that this is turned off by default as I don't like it, but you do you!  
		},
		"ExfiltrationTimes": {          - Set the time taken to exit each extract type.
			"Scav_Coop_Extract": 10,
			"Paid_Extract": 20,
			"Backpack_Extract": 10,
			"Alpine_Extract": 8
		},
		"Chances": {                    - Set the probability of each extract type being open.
			"Scav_Coop_Extract": 66,
			"Paid_Extract": 66,
			"Backpack_Extract": 100,
			"Alpine_Extract": 100
		}
	}
}
```