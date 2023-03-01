"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinMain = void 0;
const path = require("path");
const fs = require("fs");
const event_1 = require("bdsx/event");
const addon_1 = require("./src/addon");
const form_1 = require("bdsx/bds/form");
const message_1 = require("./src/utils/message");
let config = {
    enable: true,
    jointitle: {
        title: "&l&aJoin-X",
        subtitle: "&dWelcome {name}",
        enable: true,
    },
    joinui: {
        title: "&l&2Join-X",
        content: "Hi! &a{name}&r this is a &aJoinX&r plugin for BDSX.\n\n  &rName: &a{name}\n  &rHealth: &a{health}/{max_health}\n  &rPlatform: &a{platform}\n  &rPlayers: &a{online}/{max_online}\n  &rDimension: &a{dimension}\n  &rPos: &8[ &a{x}, {y}, {z} &8]\n\nYou can download this plugin from &ahttps://github.com/ItzCandra23/join-x",
        close: {
            text: "&l&7[ &cClose &7]",
            type: "path",
            path: "textures/blocks/barrier",
        },
        enable: true,
    },
    consoleMessage: "{name} joined to this server!",
    sendToConsole: true,
};
const configPath = path.join(__dirname, "config.json");
try {
    config = require(configPath);
}
catch (err) {
    if (err)
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}
var JoinTitleConfiguration;
(function (JoinTitleConfiguration) {
    function setTitle(title) {
        config.jointitle.title = title;
    }
    JoinTitleConfiguration.setTitle = setTitle;
    function setSubtitle(subtitle) {
        config.jointitle.subtitle = subtitle;
    }
    JoinTitleConfiguration.setSubtitle = setSubtitle;
    function setEnable(value) {
        config.jointitle.enable = value;
    }
    JoinTitleConfiguration.setEnable = setEnable;
    function getTitle() {
        return config.jointitle.title;
    }
    JoinTitleConfiguration.getTitle = getTitle;
    function getSubtitle() {
        return config.jointitle.subtitle;
    }
    JoinTitleConfiguration.getSubtitle = getSubtitle;
    function isEnable() {
        return config.jointitle.enable;
    }
    JoinTitleConfiguration.isEnable = isEnable;
    function sendTo(player) {
        const title = JoinMain.text(player, getTitle());
        const subtitle = JoinMain.text(player, getSubtitle());
        if (!isEnable())
            return;
        player.sendTitle(title, subtitle);
    }
    JoinTitleConfiguration.sendTo = sendTo;
})(JoinTitleConfiguration || (JoinTitleConfiguration = {}));
var JoinUIConfiguration;
(function (JoinUIConfiguration) {
    function setTitle(title) {
        config.joinui.title = title;
    }
    JoinUIConfiguration.setTitle = setTitle;
    function setContent(content) {
        config.joinui.content = content;
    }
    JoinUIConfiguration.setContent = setContent;
    function setClose(text, type, path) {
        config.joinui.close.text = text;
        config.joinui.close.type = type;
        config.joinui.close.path = path;
    }
    JoinUIConfiguration.setClose = setClose;
    function setEnable(value) {
        config.joinui.enable = value;
    }
    JoinUIConfiguration.setEnable = setEnable;
    function getTitle() {
        return config.joinui.title;
    }
    JoinUIConfiguration.getTitle = getTitle;
    function getContent() {
        return config.joinui.content;
    }
    JoinUIConfiguration.getContent = getContent;
    function getClose(player) {
        const text = config.joinui.close.text;
        const type = config.joinui.close.type;
        const data = config.joinui.close.path;
        return new form_1.FormButton(JoinMain.text(player, text), type, data);
    }
    JoinUIConfiguration.getClose = getClose;
    function isEnable() {
        return config.joinui.enable;
    }
    JoinUIConfiguration.isEnable = isEnable;
    function sendTo(player, jointitle = true) {
        const title = JoinMain.text(player, getTitle());
        const content = JoinMain.text(player, getContent());
        if (!isEnable())
            return;
        const form = new form_1.SimpleForm(title, content);
        form.addButton(getClose(player));
        form.sendTo(player.getNetworkIdentifier(), () => {
            if (!jointitle)
                return;
            JoinTitleConfiguration.sendTo(player);
        });
    }
    JoinUIConfiguration.sendTo = sendTo;
})(JoinUIConfiguration || (JoinUIConfiguration = {}));
var JoinMain;
(function (JoinMain) {
    function setEnable(value) {
        config.enable = value;
    }
    JoinMain.setEnable = setEnable;
    function setConsoleMessage(text) {
        config.consoleMessage = text;
    }
    JoinMain.setConsoleMessage = setConsoleMessage;
    function setSendToConsole(value) {
        config.sendToConsole = value;
    }
    JoinMain.setSendToConsole = setSendToConsole;
    function sendToConsole() {
        return config.sendToConsole;
    }
    JoinMain.sendToConsole = sendToConsole;
    function getConsoleMessage() {
        return config.consoleMessage;
    }
    JoinMain.getConsoleMessage = getConsoleMessage;
    function isEnable() {
        return config.enable;
    }
    JoinMain.isEnable = isEnable;
    function text(player, text) {
        let results = text;
        for (let [i, addon] of addon_1.JoinAddon.getAddons(player).entries()) {
            results = results.replace(new RegExp(addon[0], "g"), `${addon[1]}`);
        }
        return results;
    }
    JoinMain.text = text;
    JoinMain.JoinTitleConfig = JoinTitleConfiguration;
    JoinMain.JoinUIConfig = JoinUIConfiguration;
    function sendTo(player) {
        if (JoinMain.JoinUIConfig.isEnable())
            JoinMain.JoinUIConfig.sendTo(player);
        else
            JoinMain.JoinTitleConfig.sendTo(player);
    }
    JoinMain.sendTo = sendTo;
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
    }
    JoinMain.save = save;
})(JoinMain = exports.JoinMain || (exports.JoinMain = {}));
event_1.events.playerJoin.on((ev) => {
    const player = ev.player;
    if (JoinMain.isEnable())
        JoinMain.sendTo(player);
    if (JoinMain.sendToConsole())
        message_1.send.msg(JoinMain.text(player, JoinMain.getConsoleMessage()));
});
event_1.events.serverOpen.on(() => {
    require("./src");
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    JoinMain.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHNDQUFvQztBQUNwQyx1Q0FBd0M7QUFFeEMsd0NBQXVEO0FBQ3ZELGlEQUEyQztBQXVCM0MsSUFBSSxNQUFNLEdBQXNCO0lBQzVCLE1BQU0sRUFBRSxJQUFJO0lBQ1osU0FBUyxFQUFFO1FBQ1AsS0FBSyxFQUFFLFlBQVk7UUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ0osS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLCtUQUErVDtRQUN4VSxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLHlCQUF5QjtTQUNsQztRQUNELE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxjQUFjLEVBQUUsK0JBQStCO0lBQy9DLGFBQWEsRUFBRSxJQUFJO0NBQ3RCLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNoQztBQUFDLE9BQU0sR0FBRyxFQUFFO0lBQ1QsSUFBSSxHQUFHO1FBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ2xGO0FBRUQsSUFBVSxzQkFBc0IsQ0FnQy9CO0FBaENELFdBQVUsc0JBQXNCO0lBQzVCLFNBQWdCLFFBQVEsQ0FBQyxLQUFhO1FBQ2xDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLEtB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