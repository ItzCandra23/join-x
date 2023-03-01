"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomJoinAddon = exports.JoinAddon = void 0;
const fs = require("fs");
const path = require("path");
var JoinAddon;
(function (JoinAddon) {
    function getAddonFiles() {
        let file_names = [];
        const folderPath = path.join(__dirname, "..", "addons");
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
            if (file.endsWith(".js")) {
                if (!file_names.includes(file))
                    file_names.push(file);
            }
        });
        return file_names;
    }
    JoinAddon.getAddonFiles = getAddonFiles;
    function getAddons(player) {
        const files = getAddonFiles();
        let data = [];
        files.forEach((file) => {
            const addonPath = path.join(__dirname, "..", "addons", file);
            let addon = [];
            try {
                addon = require(addonPath).getProcessedTags(player);
            }
            catch (err) { }
            addon.forEach((v) => {
                if (!data.includes(v))
                    data.push(v);
            });
        });
        return data;
    }
    JoinAddon.getAddons = getAddons;
})(JoinAddon = exports.JoinAddon || (exports.JoinAddon = {}));
class CustomJoinAddon {
    static create(name) {
        if (name.includes(".") || name.includes(" "))
            return false;
        const addonPath = path.join(__dirname, "..", "addons");
        const addons = fs.readdirSync(addonPath);
        if (addons.includes(name))
            return false;
        const script = `
        import { ServerPlayer } from "bdsx/bds/player";
        import { AddonData } from "../src/addon";

        export function getProcessedTags(player: ServerPlayer): AddonData[] {
            return [
                //Hey, u can edit in here!
                //Example: ["{Hello}", "Hii"],
            ];
        }`;
        const newAddonPath = path.join(__dirname, "..", "addons", name + ".ts");
        fs.writeFileSync(newAddonPath, script, "utf-8");
        return true;
    }
}
exports.CustomJoinAddon = CustomJoinAddon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBSTdCLElBQWlCLFNBQVMsQ0FpQ3pCO0FBakNELFdBQWlCLFNBQVM7SUFDdEIsU0FBZ0IsYUFBYTtRQUN6QixJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUM7UUFFOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFaZSx1QkFBYSxnQkFZNUIsQ0FBQTtJQUNELFNBQWdCLFNBQVMsQ0FBQyxNQUFvQjtRQUMxQyxNQUFNLEtBQUssR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLElBQUksR0FBZ0IsRUFBRSxDQUFDO1FBRTNCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdELElBQUksS0FBSyxHQUFnQixFQUFFLENBQUM7WUFFNUIsSUFBSTtnQkFDQSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZEO1lBQUMsT0FBTSxHQUFHLEVBQUUsR0FBRTtZQUVmLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFsQmUsbUJBQVMsWUFrQnhCLENBQUE7QUFDTCxDQUFDLEVBakNnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWlDekI7QUFFRCxNQUFhLGVBQWU7SUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXpELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRzs7Ozs7Ozs7O1VBU2IsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF4QkQsMENBd0JDIn0=