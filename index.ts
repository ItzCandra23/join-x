import * as path from "path";
import * as fs from "fs";
import { events } from "bdsx/event";
import { JoinAddon } from "./src/addon";
import { ServerPlayer } from "bdsx/bds/player";
import { FormButton, SimpleForm } from "bdsx/bds/form";
import { send } from "./src/utils/message";

interface JoinConfiguration {
    jointitle: {
        title: string;
        subtitle: string;
        enable: boolean;
    };
    joinui: {
        title: string;
        content: string;
        close: {
            text: string;
            type?: "url"|"path",
            path?: string;
        };
        enable: boolean;
    };
    consoleMessage: string;
    sendToConsole: boolean;
    enable: boolean;
}

let config: JoinConfiguration = {
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
} catch(err) {
    if (err) fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}

namespace JoinTitleConfiguration {
    export function setTitle(title: string): void {
        config.jointitle.title=title;
    }

    export function setSubtitle(subtitle: string): void {
        config.jointitle.subtitle=subtitle;
    }

    export function setEnable(value: boolean): void {
        config.jointitle.enable=value;
    }

    export function getTitle(): string {
        return config.jointitle.title;
    }

    export function getSubtitle(): string {
        return config.jointitle.subtitle;
    }

    export function isEnable(): boolean {
        return config.jointitle.enable;
    }

    export function sendTo(player: ServerPlayer): void {
        const title = JoinMain.text(player, getTitle());
        const subtitle = JoinMain.text(player, getSubtitle());

        if (!isEnable()) return;
        player.sendTitle(title, subtitle);
    }
}

namespace JoinUIConfiguration {
    export function setTitle(title: string): void {
        config.joinui.title=title;
    }

    export function setContent(content: string): void {
        config.joinui.content=content;
    }

    export function setClose(text: string, type?: "url"|"path", path?: string): void {
        config.joinui.close.text=text;
        config.joinui.close.type=type;
        config.joinui.close.path=path;
    }

    export function setEnable(value: boolean): void {
        config.joinui.enable=value;
    }

    export function getTitle(): string {
        return config.joinui.title;
    }

    export function getContent(): string {
        return config.joinui.content;
    }

    export function getClose(player: ServerPlayer): FormButton {
        const text = config.joinui.close.text;
        const type = config.joinui.close.type;
        const data = config.joinui.close.path;
        return new FormButton(JoinMain.text(player, text), type, data);
    }

    export function isEnable(): boolean {
        return config.joinui.enable;
    }

    export function sendTo(player: ServerPlayer, jointitle: boolean = true): void {
        const title = JoinMain.text(player, getTitle());
        const content = JoinMain.text(player, getContent());

        if (!isEnable()) return;
        const form = new SimpleForm(title, content);
        form.addButton(getClose(player));

        form.sendTo(player.getNetworkIdentifier(), () => {
            if (!jointitle) return;
            JoinTitleConfiguration.sendTo(player);
        });
    }
}

export namespace JoinMain {

    export function setEnable(value: boolean): void {
        config.enable=value;
    }

    export function setConsoleMessage(text: string): void {
        config.consoleMessage=text;
    }

    export function setSendToConsole(value: boolean): void {
        config.sendToConsole=value;
    }

    export function sendToConsole(): boolean {
        return config.sendToConsole;
    }

    export function getConsoleMessage(): string {
        return config.consoleMessage;
    }

    export function isEnable(): boolean {
        return config.enable;
    }

    export function text(player: ServerPlayer, text: string): string {
        let results: string = text;

        for (let [i, addon] of JoinAddon.getAddons(player).entries()) {
            results=results.replace(new RegExp(addon[0], "g"), `${addon[1]}`);
        }

        return results;
    }

    export const JoinTitleConfig = JoinTitleConfiguration;
    export const JoinUIConfig = JoinUIConfiguration;

    export function sendTo(player: ServerPlayer): void {
        if (JoinUIConfig.isEnable()) JoinUIConfig.sendTo(player);
        else JoinTitleConfig.sendTo(player);
    }

    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
    }
}

events.playerJoin.on((ev) => {
    const player = ev.player;
    if (JoinMain.isEnable()) JoinMain.sendTo(player);
    if (JoinMain.sendToConsole()) send.msg(JoinMain.text(player, JoinMain.getConsoleMessage()));
});

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});

events.serverClose.on(() => {
    JoinMain.save(true);
});